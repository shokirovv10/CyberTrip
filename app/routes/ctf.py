from flask import Blueprint, render_template, session, redirect, url_for, request, flash
from .. import db
from ..models import Challenge, Solve, User, Lab, LabSession
bp=Blueprint("ctf",__name__)

@bp.route("/")
def index():
    cat=request.args.get("cat","all")
    q=Challenge.query.filter_by(published=True)
    if cat!="all": q=q.filter_by(category=cat)
    challenges=q.order_by(Challenge.points.asc()).all()
    return render_template("ctf.html",challenges=challenges,category=cat)

@bp.route("/<slug>")
def detail(slug):
    c=Challenge.query.filter_by(slug=slug,published=True).first_or_404()
    solved=False
    if session.get("user_id"):
        solved=Solve.query.filter_by(user_id=session["user_id"],challenge_id=c.id,correct=True).first() is not None
    lab=Lab.query.filter_by(challenge_id=c.id,published=True).first()
    return render_template("ctf_detail.html",challenge=c,solved=solved,lab=lab)

@bp.route("/<slug>/lab")
def lab_page(slug):
    """Open a dedicated CTF laboratory page; never expose the flag on the challenge page."""
    c=Challenge.query.filter_by(slug=slug,published=True).first_or_404()
    lab=Lab.query.filter_by(challenge_id=c.id,published=True).first()
    if not lab:
        flash("Bu challenge uchun Virtual Lab hali yaratilmagan.", "error")
        return redirect(url_for("ctf.detail", slug=slug))
    state={"actions":[],"flag_unlocked":False,"completed":False}
    if session.get("user_id"):
        from .labs import ensure_session, state_obj
        # Clicking a challenge from the CTF list starts a genuinely fresh lab.
        if request.args.get("new") == "1":
            for old in LabSession.query.filter_by(lab_id=lab.id, user_id=session["user_id"], status="running").all():
                old.status="replaced"
            db.session.commit()
        ls=ensure_session(lab)
        state=state_obj(ls)
    from .labs import scenario_for
    scenario=scenario_for(lab.category)
    return render_template("ctf_lab.html", challenge=c, lab=lab, state=state, scenario=scenario)


@bp.route("/<slug>/target")
def lab_target(slug):
    """Dedicated synthetic target interface for the challenge lab; no real external target is contacted."""
    if not session.get("user_id"):
        return redirect(url_for("auth.login"))
    c = Challenge.query.filter_by(slug=slug, published=True).first_or_404()
    lab = Lab.query.filter_by(challenge_id=c.id, published=True).first()
    if not lab:
        flash("Bu challenge uchun Virtual Lab mavjud emas.", "error")
        return redirect(url_for("ctf.detail", slug=slug))
    category = (c.category or "Web").lower()
    template = "lab_targets/web.html" if category == "web" else "lab_targets/generic.html"
    return render_template(template, challenge=c, lab=lab)

@bp.route("/<slug>/submit",methods=["POST"])
def submit(slug):
    uid=session.get("user_id")
    if not uid: return redirect(url_for("auth.login"))
    c=Challenge.query.filter_by(slug=slug,published=True).first_or_404()
    flag=request.form.get("flag","").strip()
    lab=Lab.query.filter_by(challenge_id=c.id,published=True).first()
    if lab:
        ls=LabSession.query.filter_by(lab_id=lab.id,user_id=uid,status="completed").order_by(LabSession.started_at.desc()).first()
        if not ls:
            flash("Avval Virtual Lab evidence chainini yakunlang.","error")
            return redirect(url_for("ctf.detail",slug=slug))
    existing=Solve.query.filter_by(user_id=uid,challenge_id=c.id).first()
    if existing and existing.correct:
        flash("Bu laboratoriya allaqachon bajarilgan.","success")
        return redirect(url_for("ctf.detail",slug=slug))
    ok=(flag==c.flag)
    if existing:
        existing.submitted_flag=flag; existing.correct=ok
    else:
        db.session.add(Solve(user_id=uid,challenge_id=c.id,submitted_flag=flag,correct=ok))
    if ok:
        u=User.query.get(uid); u.xp += c.points; c.solves += 1
        flash(f"To‘g‘ri! +{c.points} XP","success")
    else:
        flash("Flag noto‘g‘ri. Trening muhitidagi ma’lumotlarni qayta tekshiring.","error")
    db.session.commit()
    return redirect(url_for("ctf.detail",slug=slug))

@bp.route("/leaderboard")
def leaderboard():
    users=User.query.order_by(User.xp.desc()).limit(100).all()
    return render_template("leaderboard.html", users=users)


@bp.route("/<slug>/hint", methods=["POST"])
def buy_hint(slug):
    uid = session.get("user_id")
    if not uid:
        return redirect(url_for("auth.login"))
    challenge = Challenge.query.filter_by(slug=slug, published=True).first_or_404()
    user = User.query.get(uid)
    if session.get(f"hint_{challenge.id}"):
        flash("Bu hint allaqachon ochilgan.", "success")
        return redirect(url_for("ctf.detail", slug=slug))
    if user.xp < 50:
        flash("Hint olish uchun kamida 50 XP kerak.", "error")
        return redirect(url_for("ctf.detail", slug=slug))
    user.xp -= 50
    session[f"hint_{challenge.id}"] = True
    db.session.commit()
    flash("-50 XP: hint ochildi.", "success")
    return redirect(url_for("ctf.detail", slug=slug))
