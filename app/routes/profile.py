from flask import Blueprint, render_template, session, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash
from .. import db
from ..models import User, CourseProgress, Solve, level_for_xp
bp=Blueprint("profile",__name__)

def me():
    return User.query.get(session.get("user_id"))

@bp.route("/")
def index():
    u=me()
    if not u: return redirect(url_for("auth.login"))
    return render_template("profile.html",user=u,level=level_for_xp(u.xp),
        completed=CourseProgress.query.filter_by(user_id=u.id).count(),
        solves=Solve.query.filter_by(user_id=u.id,correct=True).count())

@bp.route("/edit",methods=["GET","POST"])
def edit():
    u=me()
    if not u: return redirect(url_for("auth.login"))
    if request.method=="POST":
        u.full_name=request.form.get("full_name","").strip()
        u.location=request.form.get("location","").strip()
        u.bio=request.form.get("bio","").strip()
        u.language=request.form.get("language","uz")
        db.session.commit(); session["lang"]=u.language
        flash("Profil yangilandi.","success")
        return redirect(url_for("profile.index"))
    return render_template("profile_edit.html",user=u)

@bp.route("/onboarding",methods=["GET","POST"])
def onboarding():
    u=me()
    if not u: return redirect(url_for("auth.login"))
    if request.method=="POST":
        u.language=request.form.get("language","uz")
        db.session.commit(); session["lang"]=u.language
        return redirect(url_for("profile.index"))
    return render_template("onboarding.html",user=u)
