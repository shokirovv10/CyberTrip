import os
from werkzeug.security import generate_password_hash
from sqlalchemy import or_
from .. import db
from ..models import User

def ensure_admin_bootstrap():
    if os.getenv("ADMIN_BOOTSTRAP_ENABLED", "false").strip().lower() not in {"1", "true", "yes", "on"}:
        return False
    username = os.getenv("ADMIN_USERNAME", "").strip()
    email = os.getenv("ADMIN_EMAIL", "").strip().lower()
    password = os.getenv("ADMIN_PASSWORD", "")
    if not username or not email or not password:
        raise RuntimeError("ADMIN_BOOTSTRAP_ENABLED is true, but ADMIN_USERNAME/ADMIN_EMAIL/ADMIN_PASSWORD is missing")
    user = User.query.filter(or_(User.username == username, User.email == email)).first()
    if user is None:
        user = User(username=username, email=email, password_hash=generate_password_hash(password),
                    role="super_admin", full_name="CYBERTRIP Administrator", language="uz")
        db.session.add(user)
        db.session.commit()
        return True
    changed = False
    if user.role != "super_admin":
        user.role = "super_admin"; changed = True
    if user.blocked:
        user.blocked = False; changed = True
    if changed:
        db.session.commit()
    return False
