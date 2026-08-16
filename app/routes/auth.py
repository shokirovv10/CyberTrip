from flask import Blueprint, render_template, request, redirect, url_for, session, flash, send_file
from io import BytesIO
from werkzeug.security import generate_password_hash, check_password_hash
import pyotp
import qrcode
from .. import db
from ..models import User

bp = Blueprint("auth", __name__)


@bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")
        try:
            u = User.query.filter_by(username=username).first()
        except Exception:
            db.session.rollback()
            flash("Kirish xizmati vaqtincha qayta ishga tushirilmoqda. Sahifani yangilang.", "error")
            return render_template("auth.html", mode="login"), 503
        if not u or not check_password_hash(u.password_hash, password):
            flash("Kirish ma'lumotlari noto‘g‘ri. Username va parolni tekshiring.", "error")
        elif u.blocked:
            flash("Ushbu hisob bloklangan. Qo‘llab-quvvatlash xizmatiga murojaat qiling.", "error")
        else:
            if u.two_factor_enabled:
                session["pre_2fa_user"] = u.id
                return redirect(url_for("auth.verify_2fa"))
            session["user_id"] = u.id
            session["lang"] = u.language or "uz"
            return redirect(url_for("main.home"))
    return render_template("auth.html", mode="login")


@bp.route("/2fa", methods=["GET", "POST"])
def verify_2fa():
    uid = session.get("pre_2fa_user")
    if not uid:
        return redirect(url_for("auth.login"))
    u = User.query.get_or_404(uid)
    if request.method == "POST":
        code = request.form.get("code", "").strip()
        if u.two_factor_secret and pyotp.TOTP(u.two_factor_secret).verify(code):
            session.pop("pre_2fa_user", None)
            session["user_id"] = u.id
            session["lang"] = u.language or "uz"
            return redirect(url_for("main.home"))
        flash("2FA kodi noto‘g‘ri.", "error")
    return render_template("auth_2fa.html")


@bp.route("/2fa/enable", methods=["GET", "POST"])
def enable_2fa():
    u = User.query.get(session.get("user_id"))
    if not u:
        return redirect(url_for("auth.login"))
    if request.method == "POST":
        code = request.form.get("code", "").strip()
        if u.two_factor_secret and pyotp.TOTP(u.two_factor_secret).verify(code):
            u.two_factor_enabled = True
            db.session.commit()
            flash("2FA yoqildi.", "success")
            return redirect(url_for("profile.index"))
        flash("Kod noto‘g‘ri.", "error")
    if not u.two_factor_secret:
        u.two_factor_secret = pyotp.random_base32()
        db.session.commit()
    return render_template(
        "twofa.html",
        user=u,
        secret=u.two_factor_secret,
        otp_uri=pyotp.TOTP(u.two_factor_secret).provisioning_uri(
            name=u.email, issuer_name="CYBERTRIP"
        ),
    )



@bp.route("/2fa/qr")
def twofa_qr():
    u = User.query.get(session.get("user_id")) if session.get("user_id") else None
    if not u or not u.two_factor_secret:
        return ("", 404)
    uri = pyotp.TOTP(u.two_factor_secret).provisioning_uri(name=u.email, issuer_name="CYBERTRIP")
    image = qrcode.make(uri)
    bio = BytesIO(); image.save(bio, format="PNG"); bio.seek(0)
    return send_file(bio, mimetype="image/png", max_age=0)

@bp.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")
        confirm = request.form.get("confirm", "")
        accepted = request.form.get("accept_rules") == "on"

        if not accepted:
            flash("Ro‘yxatdan o‘tish uchun CYBERTRIP qoidalarini o‘qib, qabul qilishingiz kerak.", "error")
        elif len(username) < 3 or len(password) < 8:
            flash("Username kamida 3 ta, parol esa kamida 8 ta belgidan iborat bo‘lishi kerak.", "error")
        elif password != confirm:
            flash("Parollar bir xil emas.", "error")
        elif User.query.filter((User.username == username) | (User.email == email)).first():
            flash("Username yoki email allaqachon band.", "error")
        else:
            u = User(
                username=username,
                email=email,
                password_hash=generate_password_hash(password),
            )
            try:
                db.session.add(u)
                db.session.commit()
            except Exception:
                db.session.rollback()
                flash("Hisob yaratishda ma'lumotlar bazasi xatosi yuz berdi. Boshqa username yoki email bilan qayta urinib ko‘ring.", "error")
                return render_template("auth.html", mode="register"), 500
            session["user_id"] = u.id
            session["lang"] = session.get("lang", "uz")
            return redirect(url_for("profile.onboarding"))
    return render_template("auth.html", mode="register")


@bp.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("main.home"))
