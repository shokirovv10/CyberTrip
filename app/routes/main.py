from flask import Blueprint, render_template, request, redirect, session, url_for
from ..models import Course, Challenge, User, Lesson, level_for_xp, Solve, CourseProgress
bp = Blueprint("main", __name__)

@bp.route("/")
def home():
    courses = Course.query.filter_by(published=True).limit(6).all()
    challenges = Challenge.query.filter_by(published=True).order_by(Challenge.points.desc()).limit(8).all()
    top = User.query.order_by(User.xp.desc()).limit(5).all()
    u = User.query.get(session.get("user_id")) if session.get("user_id") else None
    course_progress = {}
    if u:
        for c in courses:
            total = len(c.lessons)
            done = CourseProgress.query.filter_by(user_id=u.id).join(Lesson, CourseProgress.lesson_id == Lesson.id).filter(Lesson.course_id == c.id).count() if total else 0
            course_progress[c.id] = round((done / total) * 100) if total else 0
    else:
        course_progress = {c.id: 0 for c in courses}
    return render_template("home.html", courses=courses, challenges=challenges, top=top, course_progress=course_progress, current_user=u)

@bp.route("/dashboard")
def dashboard():
    uid = session.get("user_id")
    if not uid:
        return redirect(url_for("auth.login"))
    u = User.query.get(uid)
    if not u:
        session.pop("user_id", None)
        return redirect(url_for("auth.login"))
    completed = CourseProgress.query.filter_by(user_id=u.id).count()
    solves = Solve.query.filter_by(user_id=u.id, correct=True).count()
    return render_template("dashboard.html", user=u, level=level_for_xp(u.xp), completed=completed, solves=solves)

@bp.route("/lang/<code>")
def set_lang(code):
    code = (code or "").lower().strip()
    if code in {"uz", "ru", "en"}:
        session.permanent = True
        session["lang"] = code
    next_url = request.args.get("next", "").strip()
    if next_url.startswith("/") and not next_url.startswith("//"):
        return redirect(next_url)
    ref = request.referrer or "/"
    return redirect(ref if ref.startswith("/") or ref.startswith(request.host_url) else "/")

@bp.errorhandler(404)
def not_found(_):
    return render_template("404.html"), 404
