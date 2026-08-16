from csv import writer
from io import StringIO
import re
from flask import Blueprint, render_template, session, request, redirect, url_for, flash, Response
from werkzeug.security import generate_password_hash
from .. import db
from ..models import User, Course, Lesson, Challenge, AuditLog, Lab, LabSession, QuizQuestion, UserQuizResult, SiteSetting, level_for_xp
bp=Blueprint("admin",__name__)
ROLES=("user","moderator","instructor","challenge_author","admin","super_admin")

def guard():
    u=User.query.get(session.get("user_id"))
    return u if u and u.role in ("admin","super_admin") and not u.blocked else None

def parse_amount(raw, default=0):
    raw=(raw or "").strip()
    if not raw: return default
    sign=-1 if raw.startswith("-") else 1
    raw=raw.lstrip("+-").strip()
    raw=re.sub(r"[\s,\.]", "", raw)
    if not raw.isdigit(): raise ValueError("XP miqdori faqat son bo‘lishi kerak.")
    return sign*int(raw)

def write_audit(actor, action, target="", detail=""):
    text=target if not detail else f"{target} | {detail}"
    db.session.add(AuditLog(actor_id=actor.id,action=action,target=text))

@bp.route("/")
def index():
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    users=User.query.all(); challenges=Challenge.query.all()
    return render_template("admin/index.html",counts={"users":len(users),"courses":Course.query.count(),"lessons":Lesson.query.count(),"challenges":len(challenges),"labs":Lab.query.count(),"quizzes":QuizQuestion.query.count(),"solves":sum(x.solves for x in challenges),"audit":AuditLog.query.count()},level_for_xp=level_for_xp,recent_users=User.query.order_by(User.created_at.desc()).limit(6).all())

@bp.route("/users")
def users():
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    q=request.args.get("q","").strip(); role=request.args.get("role","").strip(); query=User.query
    if q: query=query.filter((User.username.ilike(f"%{q}%"))|(User.email.ilike(f"%{q}%"))|(User.full_name.ilike(f"%{q}%")))
    if role in ROLES: query=query.filter_by(role=role)
    return render_template("admin/users.html",users=query.order_by(User.xp.desc()).all(),roles=ROLES,level_for_xp=level_for_xp)

@bp.route("/users/export.csv")
def export_users():
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    buf=StringIO(); out=writer(buf); out.writerow(["id","username","email","role","xp","level","blocked","created_at"])
    for x in User.query.order_by(User.id).all(): out.writerow([x.id,x.username,x.email,x.role,x.xp,level_for_xp(x.xp),x.blocked,x.created_at.isoformat()])
    return Response(buf.getvalue(),mimetype="text/csv",headers={"Content-Disposition":"attachment; filename=cybertrip-users.csv"})

@bp.route("/users/<int:user_id>/xp",methods=["POST"])
def give_xp(user_id):
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    target=User.query.get_or_404(user_id)
    try: amount=parse_amount(request.form.get("amount"),0)
    except ValueError as exc: flash(str(exc),"error"); return redirect(url_for("admin.users"))
    amount=max(-1000000,min(1000000,amount)); old=target.xp; target.xp=max(0,target.xp+amount)
    write_audit(u,"give_xp",target.username,f"{old} -> {target.xp} ({amount:+d})"); db.session.commit(); flash(f"{target.username}: {old} XP → {target.xp} XP","success")
    return redirect(url_for("admin.users"))

@bp.route("/users/<int:user_id>/set-xp",methods=["POST"])
def set_xp(user_id):
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    target=User.query.get_or_404(user_id)
    try: amount=max(0,min(1000000,parse_amount(request.form.get("amount"),0)))
    except ValueError as exc: flash(str(exc),"error"); return redirect(url_for("admin.users"))
    old=target.xp; target.xp=amount; write_audit(u,"set_xp",target.username,f"{old} -> {amount}"); db.session.commit(); return redirect(url_for("admin.users"))

@bp.route("/users/<int:user_id>/role",methods=["POST"])
def change_role(user_id):
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    target=User.query.get_or_404(user_id); role=request.form.get("role")
    if role not in ROLES or (role=="super_admin" and u.role!="super_admin"): flash("Rolni o‘zgartirishga ruxsat yo‘q.","error"); return redirect(url_for("admin.users"))
    old=target.role; target.role=role; write_audit(u,"change_role",target.username,f"{old} -> {role}"); db.session.commit(); return redirect(url_for("admin.users"))

@bp.route("/users/<int:user_id>/block",methods=["POST"])
def block_user(user_id):
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    target=User.query.get_or_404(user_id)
    if target.id==u.id: flash("O‘zingizni bloklay olmaysiz.","error"); return redirect(url_for("admin.users"))
    target.blocked=not target.blocked; write_audit(u,"toggle_block",target.username,"blocked" if target.blocked else "unblocked"); db.session.commit(); return redirect(url_for("admin.users"))

@bp.route("/users/<int:user_id>/password",methods=["POST"])
def change_password(user_id):
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    target=User.query.get_or_404(user_id); password=request.form.get("password","")
    if len(password)<8: flash("Parol kamida 8 belgidan iborat bo‘lsin.","error"); return redirect(url_for("admin.users"))
    target.password_hash=generate_password_hash(password); write_audit(u,"change_password",target.username); db.session.commit(); return redirect(url_for("admin.users"))

@bp.route("/users/<int:user_id>/delete",methods=["POST"])
def delete_user(user_id):
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    target=User.query.get_or_404(user_id)
    if target.id==u.id: flash("O‘zingizni o‘chira olmaysiz.","error"); return redirect(url_for("admin.users"))
    username=target.username; write_audit(u,"delete_user",username); db.session.delete(target); db.session.commit(); return redirect(url_for("admin.users"))

@bp.route("/users/<int:user_id>")
def user_detail(user_id):
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    target=User.query.get_or_404(user_id); return render_template("admin/user_detail.html",user=target,level=level_for_xp(target.xp),roles=ROLES)

@bp.route("/courses")
def courses():
    u=guard();
    if not u: return redirect(url_for("auth.login"))
    return render_template("admin/courses.html",courses=Course.query.order_by(Course.id.desc()).all())

@bp.route("/challenges")
def challenges():
    u=guard();
    if not u: return redirect(url_for("auth.login"))
    return render_template("admin/challenges.html",challenges=Challenge.query.order_by(Challenge.id.desc()).all())

@bp.route("/audit")
def audit():
    u=guard();
    if not u: return redirect(url_for("auth.login"))
    return render_template("admin/audit.html",logs=AuditLog.query.order_by(AuditLog.created_at.desc()).limit(300).all())

@bp.route("/analytics")
def analytics():
    u=guard();
    if not u: return redirect(url_for("auth.login"))
    users=User.query.all(); challenges=Challenge.query.all(); categories={}
    for c in challenges: categories[c.category]=categories.get(c.category,0)+c.solves
    return render_template("admin/analytics.html",users=users,challenges=challenges,categories=categories,active_users=sum(1 for x in users if not x.blocked))

@bp.route("/settings", methods=["GET", "POST"])
def settings():
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    setting = SiteSetting.query.filter_by(key="maintenance_mode").first()
    if setting is None:
        setting = SiteSetting(key="maintenance_mode", value="0")
        db.session.add(setting)
        db.session.commit()
    if request.method == "POST":
        if u.role != "super_admin":
            flash("Texnik ishlarni faqat Super Admin boshqara oladi.", "error")
            return redirect(url_for("admin.settings"))
        setting.value = "1" if request.form.get("maintenance_mode") == "1" else "0"
        write_audit(u, "maintenance_mode", "site", "enabled" if setting.value == "1" else "disabled")
        db.session.commit()
        flash("Texnik ishlar rejimi yangilandi.", "success")
        return redirect(url_for("admin.settings"))
    maintenance = setting.value == "1"
    return render_template("admin/settings.html", user=u, maintenance=maintenance)


@bp.route("/content")
def content():
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    return render_template("admin/professional.html", section="content",
                           title="Kontent markazi",
                           desc="Kurslar, darslar, quizlar va CTF kontentini boshqarish.",
                           cards=[
                               ("Kurslar", Course.query.count(), url_for("admin.courses"), "Kurs katalogi va nashr holati"),
                               ("Darslar", Lesson.query.count(), url_for("admin.courses"), "Struktura, tartib va XP"),
                               ("CTF", Challenge.query.count(), url_for("admin.challenges"), "Challenge katalogi"),
                           ])

@bp.route("/events")
def events():
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    return render_template("admin/professional.html", section="events",
                           title="Event va musobaqalar", desc="CTF eventlari uchun markaziy boshqaruv.",
                           cards=[("Yaqin eventlar", 0, "#", "Countdown, qoidalar va scoreboard"),
                                  ("Ishtirokchilar", 0, "#", "Ro‘yxatdan o‘tish va natijalar"),
                                  ("Mukofotlar", 0, "#", "XP, badge va sertifikatlar")])

@bp.route("/moderation")
def moderation():
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    return render_template("admin/professional.html", section="moderation",
                           title="Moderatsiya markazi", desc="Community, writeup va reportlar uchun markaz.",
                           cards=[("Reportlar", 0, "#", "Foydalanuvchi reportlarini ko‘rib chiqing"),
                                  ("Writeup tekshiruvi", 0, "#", "Publish va moderation"),
                                  ("Community", User.query.count(), "#", "Foydalanuvchi faolligi")])

@bp.route("/security")
def security():
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    return render_template("admin/professional.html", section="security",
                           title="Security Center", desc="Platforma xavfsizligi va nazoratlar.",
                           cards=[("Audit log", AuditLog.query.count(), url_for("admin.audit"), "Muhim admin amallar"),
                                  ("Blocked users", User.query.filter_by(blocked=True).count(), url_for("admin.users"), "Bloklangan hisoblar"),
                                  ("RBAC", 6, url_for("admin.users"), "Rollar va backend permissionlar")])

@bp.route("/notifications")
def notifications():
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    return render_template("admin/professional.html", section="notifications",
                           title="Bildirishnomalar", desc="Platforma ichidagi notification markazi.",
                           cards=[("Broadcast", 0, "#", "Announcement yuborish"),
                                  ("Event reminder", 0, "#", "Event boshlanishidan oldin"),
                                  ("System", 0, "#", "Platforma xabarlari")])

@bp.route("/backups")
def backups():
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    return render_template("admin/professional.html", section="backups",
                           title="Backup & maintenance", desc="Database va platforma xizmatlarini nazorat qiling.",
                           cards=[("SQLite database", "LOCAL", "#", "Local database holati"),
                                  ("Maintenance", "READY", "#", "Texnik xizmat holati"),
                                  ("Health", "OK", url_for("admin.settings"), "Platform health")])

@bp.route("/system")
def system():
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    return render_template("admin/professional.html", section="system",
                           title="System settings", desc="Platform konfiguratsiyasi va feature nazorati.",
                           cards=[("Languages", "UZ/RU/EN", url_for("admin.settings"), "3 til"),
                                  ("Brand", "CyberTrip", url_for("admin.settings"), "Brend va UI"),
                                  ("CTF sandbox", "SAFE", url_for("admin.challenges"), "Izolyatsiya qilingan trening")])


@bp.route("/labs")
def labs():
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    labs=Lab.query.order_by(Lab.id.desc()).all()
    running=LabSession.query.filter_by(status="running").count()
    return render_template("admin/labs.html",labs=labs,running=running,sessions=LabSession.query.order_by(LabSession.started_at.desc()).limit(100).all())

@bp.route("/quizzes")
def quizzes():
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    return render_template("admin/quizzes.html",questions=QuizQuestion.query.order_by(QuizQuestion.lesson_id,QuizQuestion.id).all(),attempts=UserQuizResult.query.order_by(UserQuizResult.created_at.desc()).limit(100).all())

@bp.route("/ai-tutor")
def ai_tutor():
    u=guard()
    if not u: return redirect(url_for("auth.login"))
    return render_template("admin/professional.html",section="ai_tutor",title="AI Tutor",desc="Learn, Detect, Practice, Fix va Review oqimini boshqaring.",cards=[("Modes",5,url_for("admin.ai_tutor"),"5 bosqichli mentor"),("Lessons",Lesson.query.count(),url_for("admin.courses"),"Tutor contextlari"),("Labs",Lab.query.count(),url_for("admin.labs"),"Amaliy muhitlar")])
