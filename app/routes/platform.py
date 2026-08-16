from datetime import date
from flask import Blueprint, render_template, session, redirect, url_for, request, flash
from .. import db
from ..models import User, Course, Challenge, Solve, CourseProgress, level_for_xp, Team, TeamMember, Notification, Achievement, UserAchievement
from ..services.ai_tutor import answer as ai_answer

bp=Blueprint("platform", __name__)

MOTIVATIONS=[
    "Bugun 20 daqiqa o‘rganing — ertaga osonroq bo‘ladi.",
    "Har bir flag — yangi ko‘nikma.",
    "Avval tushuning, keyin amalda sinang.",
    "Kichik qadamlar katta cyber skillga aylanadi.",
    "Bugungi dars — ertangi tajriba.",
    "Xatodan qo‘rqmang: uni tahlil qiling.",
    "Bir challenge yeching. Bir skill oching.",
    "Doimiylik — kuchli cybersecurity mutaxassisining quroli.",
    "Bugun kechagidan bir qadam oldinda bo‘ling.",
    "Bilimni faqat o‘qimang — amalda qo‘llang.",
]

@bp.app_context_processor
def daily_motivation():
    return {"daily_motivation": MOTIVATIONS[date.today().toordinal() % len(MOTIVATIONS)]}

@bp.route("/about")
def about():
    return render_template("legal/about.html")

@bp.route("/rules")
def rules(): return render_template("legal/rules.html")

@bp.route("/privacy")
def privacy(): return render_template("legal/privacy.html")

@bp.route("/terms")
def terms(): return render_template("legal/terms.html")

@bp.route("/cookie-policy")
def cookie_policy(): return render_template("legal/cookies.html")

@bp.route("/community-guidelines")
def community_guidelines(): return render_template("legal/community.html")

@bp.route("/lab-safety")
def lab_safety(): return render_template("legal/lab_safety.html")

@bp.route("/skills")
def skills():
    u=User.query.get(session.get("user_id")) if session.get("user_id") else None
    xp=u.xp if u else 0
    branches=[
        ("Networking", min(100, int(xp/15)), "IP, TCP/IP, DNS, ports, routing"),
        ("Linux", min(100, int(xp/18)), "Terminal, permissions, processes"),
        ("Web Security", min(100, int(xp/12)), "HTTP, sessions, access control"),
        ("Crypto", min(100, int(xp/20)), "Encoding, hashing, keys"),
        ("Forensics", min(100, int(xp/22)), "Logs, metadata, PCAP"),
        ("OSINT", min(100, int(xp/24)), "Search, verification, public sources"),
        ("Reverse", min(100, int(xp/28)), "Static/dynamic concepts"),
        ("Blue Team", min(100, int(xp/20)), "Detection, monitoring, incident response"),
    ]
    return render_template("skills.html", branches=branches, user=u, level_for_xp=level_for_xp)

@bp.route("/achievements")
def achievements():
    u=User.query.get(session.get("user_id")) if session.get("user_id") else None
    solved=Solve.query.filter_by(user_id=u.id,correct=True).count() if u else 0
    lessons=CourseProgress.query.filter_by(user_id=u.id).count() if u else 0
    items=[
        ("Birinchi qadam","1 ta darsni tugating","⚡",lessons>=1),
        ("First Blood","Birinchi CTF flagni toping","🎯",solved>=1),
        ("Web Hunter","10 ta challenge yeching","🌐",solved>=10),
        ("Cyber Scholar","10 ta darsni tugating","📚",lessons>=10),
        ("500 XP","500 XP ga yeting","✦",(u.xp if u else 0)>=500),
        ("1000 XP","1000 XP ga yeting","◆",(u.xp if u else 0)>=1000),
        ("CTF Veteran","25 ta challenge yeching","🏆",solved>=25),
        ("Cyber Master","Level 20 ga chiqing","♢",level_for_xp(u.xp)>=20 if u else False),
    ]
    return render_template("achievements.html",items=items)

@bp.route("/u/<username>")
def public_profile(username):
    u=User.query.filter_by(username=username).first_or_404()
    solved=Solve.query.filter_by(user_id=u.id,correct=True).count()
    lessons=CourseProgress.query.filter_by(user_id=u.id).count()
    return render_template("public_profile.html",user=u,solved=solved,lessons=lessons,level=level_for_xp(u.xp))

@bp.route("/resume")
def resume():
    u=User.query.get(session.get("user_id")) if session.get("user_id") else None
    if not u: return redirect(url_for("auth.login"))
    solved=Solve.query.filter_by(user_id=u.id,correct=True).count()
    lessons=CourseProgress.query.filter_by(user_id=u.id).count()
    return render_template("resume.html",user=u,solved=solved,lessons=lessons,level=level_for_xp(u.xp))

@bp.route("/tutor", methods=["GET", "POST"])
def tutor():
    topic = ""
    mode = "learn"
    answer = None
    provider = "local"
    if request.method == "POST":
        topic = request.form.get("topic", "").strip()
        mode = request.form.get("mode", "learn").strip().lower()
        if mode not in {"learn", "detect", "practice", "fix", "review"}:
            mode = "learn"
        if not topic:
            flash("Savol yoki mavzuni kiriting.", "error")
        else:
            result = ai_answer(topic, mode)
            answer = result["text"]
            provider = result["provider"]
    return render_template("tutor.html", answer=answer, topic=topic, mode=mode, provider=provider)

@bp.route("/team/create", methods=["POST"])
def team_create():
    # Backward-compatible endpoint used by older templates.
    return team_new()

@bp.route("/team")
def team():
    u=User.query.get(session.get("user_id")) if session.get("user_id") else None
    if not u: return redirect(url_for("auth.login"))
    # Show a team where the user is owner OR member.
    owned=Team.query.filter_by(owner_id=u.id).first()
    membership=TeamMember.query.filter_by(user_id=u.id).first()
    t=owned or (Team.query.get(membership.team_id) if membership else None)
    members=TeamMember.query.filter_by(team_id=t.id).all() if t else []
    return render_template("team.html",team=t,members=members,user=u)

@bp.route("/notifications")
def notifications():
    u=User.query.get(session.get("user_id")) if session.get("user_id") else None
    if not u: return redirect(url_for("auth.login"))
    items=Notification.query.filter_by(user_id=u.id).order_by(Notification.created_at.desc()).limit(50).all()
    for n in items: n.is_read=True
    from .. import db
    db.session.commit()
    return render_template("notifications.html",items=items)

@bp.route("/team/join", methods=["POST"])
def team_join():
    u=User.query.get(session.get("user_id")) if session.get("user_id") else None
    if not u: return redirect(url_for("auth.login"))
    code=request.form.get("invite_code","").strip()
    t=Team.query.filter_by(invite_code=code).first()
    if not t: flash("Invite code topilmadi.","error"); return redirect(url_for("platform.team"))
    if not TeamMember.query.filter_by(team_id=t.id,user_id=u.id).first():
        db.session.add(TeamMember(team_id=t.id,user_id=u.id)); db.session.commit()
    flash("Jamoaga qo‘shildingiz.","success"); return redirect(url_for("platform.team"))

@bp.route("/team/new", methods=["POST"])
def team_new():
    u=User.query.get(session.get("user_id")) if session.get("user_id") else None
    if not u: return redirect(url_for("auth.login"))
    name=request.form.get("team_name","").strip()
    if not name:
        flash("Jamoa nomini kiriting.", "error")
        return redirect(url_for("platform.team"))
    import secrets
    # A user can own one team in this lightweight local build.
    existing=Team.query.filter_by(owner_id=u.id).first()
    if existing:
        flash("Siz allaqachon jamoa yaritgansiz.", "error")
        return redirect(url_for("platform.team"))
    if Team.query.filter_by(name=name[:100]).first():
        flash("Bu jamoa nomi allaqachon band. Boshqa nom tanlang.", "error")
        return redirect(url_for("platform.team"))
    try:
        t=Team(name=name[:100],owner_id=u.id,invite_code=secrets.token_hex(4).upper())
        db.session.add(t); db.session.flush()
        db.session.add(TeamMember(team_id=t.id,user_id=u.id,role="owner"))
        db.session.commit()
    except Exception:
        db.session.rollback()
        flash("Jamoa yaratishda xatolik yuz berdi. Ma'lumotlar bazasi o‘zgarmadi.", "error")
        return redirect(url_for("platform.team"))
    flash(f"Jamoa yaratildi. Invite code: {t.invite_code}","success")
    return redirect(url_for("platform.team"))
