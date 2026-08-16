import os
import re
import html as html_lib
from markupsafe import Markup
from flask import Flask, session, g, render_template, jsonify, request
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect, text

db = SQLAlchemy()

def render_lesson_markup(text):
    """Small safe Markdown-like renderer for lesson/resource content without adding a heavy dependency."""
    text = text or ""
    code_blocks = []
    def stash_code(m):
        lang = (m.group(1) or "text").strip()
        code = html_lib.escape(m.group(2).strip("\n"))
        token = f"@@CODEBLOCK{len(code_blocks)}@@"
        code_blocks.append((lang, code))
        return token
    text = re.sub(r"```([\w+-]*)\n?(.*?)```", stash_code, text, flags=re.S)
    safe = html_lib.escape(text)
    lines = safe.splitlines()
    out=[]; in_ul=False
    for line in lines:
        if line.startswith("- "):
            if not in_ul: out.append("<ul>"); in_ul=True
            out.append(f"<li>{line[2:]}</li>")
            continue
        if in_ul: out.append("</ul>"); in_ul=False
        if not line.strip():
            continue
        if line.startswith("### "): out.append(f"<h3>{line[4:]}</h3>")
        elif line.startswith("## "): out.append(f"<h2>{line[3:]}</h2>")
        elif line.startswith("# "): out.append(f"<h1>{line[2:]}</h1>")
        elif re.match(r"^\d+\. ", line): out.append(f"<p class=\"step-line\"><b>{line.split('.')[0]}.</b> {line.split('.',1)[1].strip()}</p>")
        else:
            line=re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", line)
            line=re.sub(r"`([^`]+)`", r"<code>\1</code>", line)
            out.append(f"<p>{line}</p>")
    if in_ul: out.append("</ul>")
    rendered="".join(out)
    for i,(lang,code) in enumerate(code_blocks):
        block=f'<div class="code-block"><span class="code-label">{html_lib.escape(lang or "text")} / TRAINING</span><pre>{code}</pre></div>'
        rendered=rendered.replace(f"@@CODEBLOCK{i}@@", block)
    return Markup(rendered)


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1)
    os.makedirs(app.instance_path, exist_ok=True)
    app.config["SECRET_KEY"] = os.environ.get("CYBERTRIP_SECRET", "dev-only-change-this-secret")
    database_url = os.environ.get("DATABASE_URL", "").strip()
    is_production = os.environ.get("CYBERTRIP_ENV", "development").lower() == "production"
    if database_url:
        if database_url.startswith("postgres://"):
            database_url = database_url.replace("postgres://", "postgresql+psycopg://", 1)
        elif database_url.startswith("postgresql://"):
            database_url = database_url.replace("postgresql://", "postgresql+psycopg://", 1)
    elif is_production:
        raise RuntimeError("DATABASE_URL is required in production")
    else:
        database_url = "sqlite:///" + os.path.join(app.instance_path, "cybertrip.db")
    app.config["SQLALCHEMY_DATABASE_URI"] = database_url
    app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_pre_ping": True, "pool_recycle": 1800}
    app.config["SESSION_COOKIE_SECURE"] = os.environ.get("SESSION_COOKIE_SECURE", "0") == "1"
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = os.environ.get("SESSION_COOKIE_SAMESITE", "Lax")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)

    app.jinja_env.filters["lesson_html"] = render_lesson_markup

    from .i18n import translations
    @app.before_request
    def load_language():
        g.lang = session.get("lang", "uz")
        if g.lang not in translations:
            g.lang = "uz"

    @app.before_request
    def enforce_maintenance_mode():
        from .models import SiteSetting, User
        setting = SiteSetting.query.filter_by(key="maintenance_mode").first()
        enabled = bool(setting and setting.value == "1")
        if not enabled:
            return None
        path = request.path or "/"
        # Never intercept static assets while maintenance mode is enabled.
        # Otherwise CSS/JS requests would receive the HTML maintenance page (503),
        # making the maintenance screen look unstyled.
        if path.startswith("/admin") or path.startswith("/health") or path.startswith("/static/"):
            return None
        u = User.query.get(session.get("user_id")) if session.get("user_id") else None
        if u and u.role in ("admin", "super_admin"):
            return None
        return render_template("maintenance.html"), 503

    @app.get("/health")
    def health():
        try:
            db.session.execute(text("SELECT 1"))
            return jsonify({"status": "ok", "database": "ok"}), 200
        except Exception:
            db.session.rollback()
            return jsonify({"status": "degraded", "database": "unavailable"}), 503

    @app.errorhandler(404)
    def not_found(error):
        return render_template("404.html"), 404

    @app.errorhandler(500)
    def internal_error(error):
        app.logger.exception("CYBERTRIP internal error", exc_info=error)
        db.session.rollback()
        return render_template("500.html"), 500

    @app.context_processor
    def inject_globals():
        from .i18n import t
        from .models import User
        u=User.query.get(session.get("user_id")) if session.get("user_id") else None
        return {"_": lambda key: t(key, g.lang), "lang": g.lang,
                "current_user": u,
                "current_user_is_admin": lambda: bool(u and u.role in ("admin","super_admin"))}

    from .routes.main import bp as main_bp
    from .routes.auth import bp as auth_bp
    from .routes.learning import bp as learning_bp
    from .routes.ctf import bp as ctf_bp
    from .routes.profile import bp as profile_bp
    from .routes.admin import bp as admin_bp
    from .routes.platform import bp as platform_bp
    from .routes.labs import bp as labs_bp
    from .routes.chat import bp as chat_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(learning_bp, url_prefix="/learn")
    app.register_blueprint(ctf_bp, url_prefix="/ctf")
    app.register_blueprint(profile_bp, url_prefix="/profile")
    app.register_blueprint(admin_bp, url_prefix="/admin")
    app.register_blueprint(platform_bp)
    app.register_blueprint(labs_bp)
    app.register_blueprint(chat_bp)

    from .models import seed, ensure_learning_content
    from .services.admin_bootstrap import ensure_admin_bootstrap
    with app.app_context():
        # Gunicorn starts multiple workers. A PostgreSQL advisory lock prevents
        # concurrent schema creation/content seeding from colliding at startup.
        lock_conn = None
        try:
            if db.engine.url.get_backend_name() == "postgresql":
                lock_conn = db.engine.connect()
                lock_conn.execute(text("SELECT pg_advisory_lock(472819331)"))

            db.create_all()
            inspector = inspect(db.engine)
            if "user" in inspector.get_table_names():
                cols = {c["name"] for c in inspector.get_columns("user")}
                migrations = {
                    "role": "ALTER TABLE user ADD COLUMN role VARCHAR(30) DEFAULT 'user'",
                    "language": "ALTER TABLE user ADD COLUMN language VARCHAR(5) DEFAULT 'uz'",
                    "full_name": "ALTER TABLE user ADD COLUMN full_name VARCHAR(160) DEFAULT ''",
                    "location": "ALTER TABLE user ADD COLUMN location VARCHAR(160) DEFAULT ''",
                    "bio": "ALTER TABLE user ADD COLUMN bio TEXT DEFAULT ''",
                    "xp": "ALTER TABLE user ADD COLUMN xp INTEGER DEFAULT 0",
                    "streak": "ALTER TABLE user ADD COLUMN streak INTEGER DEFAULT 0",
                    "blocked": "ALTER TABLE user ADD COLUMN blocked BOOLEAN DEFAULT 0",
                    "two_factor_enabled": "ALTER TABLE user ADD COLUMN two_factor_enabled BOOLEAN DEFAULT 0",
                    "two_factor_secret": "ALTER TABLE user ADD COLUMN two_factor_secret VARCHAR(64) DEFAULT ''",
                    "created_at": "ALTER TABLE user ADD COLUMN created_at DATETIME",
                }
                for name, ddl in migrations.items():
                    if name not in cols:
                        try:
                            with db.engine.begin() as conn:
                                conn.execute(text(ddl))
                        except Exception:
                            db.session.rollback()
            seed()
            ensure_admin_bootstrap()
            ensure_learning_content()
            from .models import SiteSetting
            if not SiteSetting.query.filter_by(key="maintenance_mode").first():
                db.session.add(SiteSetting(key="maintenance_mode", value="0"))
                db.session.commit()
        finally:
            if lock_conn is not None:
                try:
                    lock_conn.execute(text("SELECT pg_advisory_unlock(472819331)"))
                finally:
                    lock_conn.close()

    return app
