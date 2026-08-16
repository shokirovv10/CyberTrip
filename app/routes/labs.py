import json, secrets
from datetime import datetime, timedelta
from flask import Blueprint, render_template, session, redirect, url_for, request, flash
from .. import db
from ..models import Lab, LabSession, LabEvent, User, Lesson, Challenge, CourseProgress, Solve

bp = Blueprint("labs", __name__, url_prefix="/labs")

SCENARIOS = {
    "Web Security": {
        "scenario":"web",
        "actions":["inspect","headers","cookies","verify"],
        "objective":"Targetdagi request/response dalillarini kuzatib, zaiflik yoki noto‘g‘ri konfiguratsiyani aniqlang.",
        "detection":"Input nuqtalari, response headerlari, cookie atributlari va auth oqimini solishtiring.",
        "fix":"Parameterized queries, output encoding, secure cookie flags, authorization checks va security headers kabi himoyalarni qo‘llang.",
        "outputs":{
          "inspect":"[TARGET] training-web.local | method=GET | status=200 | inputs=3 | auth=enabled",
          "headers":"[HEADERS] Server: CYBERTRIP-LAB | X-Frame-Options: missing | CSP: missing | HSTS: missing",
          "cookies":"[COOKIES] session=training-session | HttpOnly=yes | Secure=no | SameSite=Lax",
          "verify":"[VERIFY] Evidence chain complete. Training flag is now available in the lab evidence vault."
        }
    },
    "Networking": {"scenario":"network","actions":["inspect","ports","dns","verify"],"objective":"Training hostning xizmatlari, DNS va port/protokol bog‘lanishini tahlil qiling.","detection":"Port, service, DNS query va response juftliklarini taqqoslang.","fix":"Keraksiz xizmatlarni o‘chirish, firewall policy, segmentation va monitoringni qo‘llang.","outputs":{"inspect":"[HOST] 10.10.10.25 | ttl=63 | training-only target","ports":"[PORTS] 22/ssh open | 80/http open | 443/https open | 8080/training open","dns":"[DNS] training.cybertrip.local -> 10.10.10.25 | TXT=training-evidence","verify":"[VERIFY] Network evidence chain complete. Check evidence vault."}},
    "Linux": {"scenario":"linux","actions":["inspect","permissions","processes","verify"],"objective":"Fayl permissionlari va process jadvalidagi anomaliyani xavfsiz training muhitida aniqlang.","detection":"Owner/group/other bitlari, PID, parent PID va process nomlarini taqqoslang.","fix":"Least privilege, minimal permissions, service isolation va process monitoringni qo‘llang.","outputs":{"inspect":"[FS] /training/app/config.ini | owner=student | group=training | mode=664","permissions":"[PERM] config.ini is group-writable; expected mode=640","processes":"[PS] 101 nginx | 155 python-training | 177 unknown-helper (parent=155)","verify":"[VERIFY] Linux evidence chain complete. Check evidence vault."}},
    "Crypto": {"scenario":"crypto","actions":["inspect","identify","decode","verify"],"objective":"Artefaktning encoding yoki cryptographic formatini aniqlab, training ma’lumotini tahlil qiling.","detection":"Belgilar to‘plami, uzunlik, padding va format markerlarini kuzating.","fix":"Sensitive data uchun encryption, password hashing uchun modern password hashing va key management ishlating.","outputs":{"inspect":"[ARTIFACT] value=Y3liZXJ0cmlwX3RyYWluaW5n | charset=Base64","identify":"[FORMAT] Looks like Base64 encoding, not encryption.","decode":"[DECODE] training artifact decoded successfully.","verify":"[VERIFY] Crypto evidence chain complete. Check evidence vault."}},
    "Forensics": {"scenario":"forensics","actions":["inspect","timeline","metadata","verify"],"objective":"Training artefaktlaridan timeline, metadata va anomaliyalarni ajrating.","detection":"Timestamp, author, hash va event sequence ni bir-biriga moslang.","fix":"Forensic evidence integrity uchun hashing, access control va chain-of-custody jarayonini qo‘llang.","outputs":{"inspect":"[LOG] 12 events loaded | 1 suspicious sequence","timeline":"[TIMELINE] 10:14 login -> 10:16 file-write -> 10:17 archive","metadata":"[META] author=training-user | created=2026-08-15T10:16Z | hash=lab-only","verify":"[VERIFY] Forensic evidence chain complete. Check evidence vault."}},
    "OSINT": {"scenario":"osint","actions":["inspect","sources","correlate","verify"],"objective":"Faqat lab ichidagi public clues yordamida atributlarni bog‘lang.","detection":"Source credibility, repeated identifiers va metadata mosligini tekshiring.","fix":"Real odamlar haqida ruxsatsiz ma’lumot yig‘mang; privacy-preserving verification va source validationdan foydalaning.","outputs":{"inspect":"[CLUES] 4 synthetic profiles | 3 public attributes","sources":"[SOURCES] lab-wiki | synthetic-blog | synthetic-repo","correlate":"[CORRELATE] same synthetic handle appears in 3 lab sources","verify":"[VERIFY] OSINT evidence chain complete. Check evidence vault."}},
    "Reverse": {"scenario":"reverse","actions":["inspect","strings","format","verify"],"objective":"Synthetic binary metadata va stringlarini statik tarzda tahlil qiling.","detection":"File signature, strings, sections va suspicious configuration valuesni izlang.","fix":"Release build hardening, secret management va binary integrity checksdan foydalaning.","outputs":{"inspect":"[FILE] training.bin | ELF64 | stripped=no | sections=24","strings":"[STRINGS] 128 strings | 3 configuration-like values","format":"[SECTIONS] .text .rodata .data .symtab","verify":"[VERIFY] Reverse evidence chain complete. Check evidence vault."}},
    "Blue Team": {"scenario":"blue","actions":["inspect","alerts","timeline","verify"],"objective":"Detection loglaridan signalni ajratib, incident timeline tuzing.","detection":"Failed login burst, unusual source, privilege change va repeated alertsni bog‘lang.","fix":"Alert tuning, MFA, least privilege, logging va incident response playbookni qo‘llang.","outputs":{"inspect":"[SIEM] 38 events | 6 auth failures | 1 privilege event","alerts":"[ALERT] AUTH-BURST severity=medium | source=training-host","timeline":"[TIMELINE] failed-login burst -> session creation -> privilege event","verify":"[VERIFY] Blue Team evidence chain complete. Check evidence vault."}},
}

def scenario_for(category):
    return SCENARIOS.get(category, {"scenario":"generic","actions":["inspect","analyze","verify"],"objective":"Training muhitidagi dalillarni ketma-ket tahlil qiling.","detection":"Observed outputni solishtirib, muhim indikatorlarni ajrating.","fix":"Secure configuration, least privilege, validation va monitoringdan foydalaning.","outputs":{"inspect":"[LAB] synthetic target ready","analyze":"[ANALYZE] evidence collected","verify":"[VERIFY] Evidence chain complete. Check evidence vault."}})

def ensure_session(lab):
    uid=session.get("user_id")
    if not uid: return None
    now=datetime.utcnow()
    current=LabSession.query.filter_by(lab_id=lab.id,user_id=uid,status="running").order_by(LabSession.started_at.desc()).first()
    if current and current.expires_at > now: return current
    if current:
        current.status="expired"
    sc=scenario_for(lab.category)
    token=secrets.token_hex(16)
    state={"actions":[],"flag_unlocked":False,"completed":False}
    ls=LabSession(token=token,lab_id=lab.id,user_id=uid,state=json.dumps(state),expires_at=now+timedelta(minutes=60))
    db.session.add(ls); db.session.commit()
    return ls

def get_lab(slug):
    return Lab.query.filter_by(slug=slug,published=True).first_or_404()

def state_obj(ls):
    try:return json.loads(ls.state or "{}")
    except:return {"actions":[],"flag_unlocked":False,"completed":False}

def action_output(lab, action):
    sc=scenario_for(lab.category)
    return sc.get("outputs",{}).get(action, "[LAB] Action completed safely in the synthetic environment.")

@bp.route("/<slug>")
def view(slug):
    lab=get_lab(slug); ls=ensure_session(lab) if session.get("user_id") else None
    state=state_obj(ls) if ls else {"actions":[],"flag_unlocked":False,"completed":False}
    sc=scenario_for(lab.category)
    return render_template("virtual_lab.html",lab=lab,session_lab=ls,state=state,scenario=sc)

@bp.route("/<slug>/start",methods=["POST"])
def start(slug):
    if not session.get("user_id"): return redirect(url_for("auth.login"))
    lab=get_lab(slug)
    # A new lab launch always starts clean; this prevents a previous completed
    # session from making the flag appear immediately on the next visit.
    if request.form.get("new") == "1":
        for old in LabSession.query.filter_by(lab_id=lab.id, user_id=session["user_id"], status="running").all():
            old.status="replaced"
        db.session.commit()
    ensure_session(lab)
    return redirect(url_for("labs.view",slug=slug))

@bp.route("/<slug>/action",methods=["POST"])
def action(slug):
    if not session.get("user_id"): return redirect(url_for("auth.login"))
    lab=get_lab(slug); ls=ensure_session(lab); state=state_obj(ls)
    action=request.form.get("action","inspect")
    sc=scenario_for(lab.category)
    if action not in sc["actions"]:
        flash("Bu action ushbu lab uchun mavjud emas.","error")
        return redirect(url_for("labs.view",slug=slug))
    if action not in state["actions"]: state["actions"].append(action)
    if all(x in state["actions"] for x in sc["actions"]): state["flag_unlocked"]=True
    ls.state=json.dumps(state); ls.last_activity=datetime.utcnow()
    db.session.add(LabEvent(session_id=ls.id,action=action,output=action_output(lab,action)))
    db.session.commit()
    if request.form.get("return_to") == "ctf":
        lab_challenge = Challenge.query.filter_by(id=lab.challenge_id).first() if lab.challenge_id else None
        if lab_challenge:
            return redirect(url_for("ctf.lab_page", slug=lab_challenge.slug, focus=action))
    return redirect(url_for("labs.view",slug=slug,focus=action))

@bp.route("/<slug>/complete",methods=["POST"])
def complete(slug):
    if not session.get("user_id"): return redirect(url_for("auth.login"))
    lab=get_lab(slug); ls=ensure_session(lab); state=state_obj(ls)
    if not state.get("flag_unlocked"):
        flash("Avval barcha evidence bosqichlarini bajaring.","error"); return redirect(url_for("labs.view",slug=slug))
    if lab.lesson_id:
        lesson=Lesson.query.get(lab.lesson_id); u=User.query.get(session["user_id"])
        if lesson and u and not CourseProgress.query.filter_by(user_id=u.id,lesson_id=lesson.id).first():
            db.session.add(CourseProgress(user_id=u.id,lesson_id=lesson.id)); u.xp += lesson.xp_reward
    state["completed"]=True; ls.state=json.dumps(state); ls.status="completed"
    db.session.commit(); flash("Virtual lab yakunlandi. +amaliy progress", "success")
    return redirect(url_for("labs.view",slug=slug))

@bp.route("/<slug>/reset",methods=["POST"])
def reset(slug):
    if not session.get("user_id"): return redirect(url_for("auth.login"))
    lab=get_lab(slug); ls=ensure_session(lab); ls.state=json.dumps({"actions":[],"flag_unlocked":False,"completed":False}); ls.last_activity=datetime.utcnow(); db.session.commit()
    flash("Lab reset qilindi.","success")
    if request.form.get("return_to") == "ctf":
        lab_challenge = Challenge.query.filter_by(id=lab.challenge_id).first() if lab.challenge_id else None
        if lab_challenge:
            return redirect(url_for("ctf.lab_page", slug=lab_challenge.slug, new=1))
    return redirect(url_for("labs.view",slug=slug))
