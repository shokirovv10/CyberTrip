from datetime import datetime
import os
from werkzeug.security import generate_password_hash
from . import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(180), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(30), default="user", nullable=False)
    language = db.Column(db.String(5), default="uz")
    full_name = db.Column(db.String(160), default="")
    location = db.Column(db.String(160), default="")
    bio = db.Column(db.Text, default="")
    xp = db.Column(db.Integer, default=0)
    streak = db.Column(db.Integer, default=0)
    blocked = db.Column(db.Boolean, default=False)
    two_factor_enabled = db.Column(db.Boolean, default=False)
    two_factor_secret = db.Column(db.String(64), default="")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    course_progress = db.relationship("CourseProgress", backref="user", cascade="all, delete-orphan")
    solves = db.relationship("Solve", backref="user", cascade="all, delete-orphan")

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(220), nullable=False)
    slug = db.Column(db.String(220), unique=True, nullable=False)
    category = db.Column(db.String(100), default="Fundamentals")
    difficulty = db.Column(db.String(40), default="Beginner")
    description = db.Column(db.Text, default="")
    duration = db.Column(db.String(60), default="2 soat")
    instructor = db.Column(db.String(120), default="CYBERTRIP Academy")
    published = db.Column(db.Boolean, default=True)
    lessons = db.relationship("Lesson", backref="course", cascade="all, delete-orphan", order_by="Lesson.position")

class Lesson(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey("course.id"), nullable=False)
    title = db.Column(db.String(220), nullable=False)
    slug = db.Column(db.String(220), nullable=False)
    content = db.Column(db.Text, default="")
    position = db.Column(db.Integer, default=1)
    xp_reward = db.Column(db.Integer, default=50)

class CourseProgress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    lesson_id = db.Column(db.Integer, db.ForeignKey("lesson.id"), nullable=False)
    completed_at = db.Column(db.DateTime, default=datetime.utcnow)
    __table_args__ = (db.UniqueConstraint("user_id","lesson_id",name="uq_user_lesson"),)

class Challenge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(220), nullable=False)
    slug = db.Column(db.String(220), unique=True, nullable=False)
    category = db.Column(db.String(80), default="Web")
    difficulty = db.Column(db.String(40), default="Easy")
    points = db.Column(db.Integer, default=100)
    description = db.Column(db.Text, default="")
    objective = db.Column(db.Text, default="")
    hint = db.Column(db.Text, default="")
    simulated_service = db.Column(db.String(120), default="Training Web Node")
    flag = db.Column(db.String(220), nullable=False)
    published = db.Column(db.Boolean, default=True)
    solves = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Solve(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    challenge_id = db.Column(db.Integer, db.ForeignKey("challenge.id"), nullable=False)
    submitted_flag = db.Column(db.String(220))
    correct = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    __table_args__ = (db.UniqueConstraint("user_id","challenge_id",name="uq_user_challenge"),)



class Lab(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(220), nullable=False)
    slug = db.Column(db.String(240), unique=True, nullable=False)
    category = db.Column(db.String(100), default="Web")
    difficulty = db.Column(db.String(40), default="Beginner")
    lesson_id = db.Column(db.Integer, db.ForeignKey("lesson.id"), nullable=True)
    challenge_id = db.Column(db.Integer, db.ForeignKey("challenge.id"), nullable=True)
    objective = db.Column(db.Text, default="")
    detection = db.Column(db.Text, default="")
    remediation = db.Column(db.Text, default="")
    instructions = db.Column(db.Text, default="")
    scenario = db.Column(db.Text, default="generic")
    flag = db.Column(db.String(220), nullable=False)
    required_actions = db.Column(db.Text, default="inspect,analyze,verify")
    published = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class LabSession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(64), unique=True, nullable=False)
    lab_id = db.Column(db.Integer, db.ForeignKey("lab.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    state = db.Column(db.Text, default="{}")
    started_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_activity = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), default="running")


class LabEvent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.Integer, db.ForeignKey("lab_session.id"), nullable=False)
    action = db.Column(db.String(80), nullable=False)
    output = db.Column(db.Text, default="")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)



class Resource(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(220), nullable=False)
    category = db.Column(db.String(100), default="Cheatsheet")
    description = db.Column(db.Text, default="")
    content = db.Column(db.Text, default="")
    level = db.Column(db.String(40), default="Beginner")
    minutes = db.Column(db.Integer, default=10)

class QuizQuestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    lesson_id = db.Column(db.Integer, db.ForeignKey("lesson.id"), nullable=False)
    question = db.Column(db.Text, nullable=False)
    option_a = db.Column(db.String(300), nullable=False)
    option_b = db.Column(db.String(300), nullable=False)
    option_c = db.Column(db.String(300), nullable=False)
    option_d = db.Column(db.String(300), nullable=False)
    answer = db.Column(db.String(1), nullable=False)

class UserQuizResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    lesson_id = db.Column(db.Integer, db.ForeignKey("lesson.id"), nullable=False)
    score = db.Column(db.Integer, default=0)
    passed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Achievement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(120), unique=True, nullable=False)
    title = db.Column(db.String(180), nullable=False)
    description = db.Column(db.Text, default="")
    icon = db.Column(db.String(20), default="✦")
    xp_reward = db.Column(db.Integer, default=50)

class UserAchievement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    achievement_id = db.Column(db.Integer, db.ForeignKey("achievement.id"), nullable=False)
    unlocked_at = db.Column(db.DateTime, default=datetime.utcnow)
    __table_args__ = (db.UniqueConstraint("user_id","achievement_id",name="uq_user_achievement"),)

class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    invite_code = db.Column(db.String(30), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class TeamMember(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey("team.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    role = db.Column(db.String(20), default="member")
    __table_args__ = (db.UniqueConstraint("team_id","user_id",name="uq_team_member"),)

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    title = db.Column(db.String(180), nullable=False)
    message = db.Column(db.Text, default="")
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class ChatMessage(db.Model):
    __tablename__ = "chat_message"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey("team.id"), nullable=True)
    channel = db.Column(db.String(20), nullable=False, default="general")
    body = db.Column(db.String(1200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    author = db.relationship("User", foreign_keys=[user_id])
    __table_args__ = (db.Index("ix_chat_message_channel_created", "channel", "created_at"),)


class SiteSetting(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(120), unique=True, nullable=False)
    value = db.Column(db.Text, default="")
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class AuditLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    actor_id = db.Column(db.Integer)
    action = db.Column(db.String(120), nullable=False)
    target = db.Column(db.String(255), default="")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

def level_for_xp(xp):
    return min(50, max(1, xp // 250 + 1))

def seed():
    # Demo accounts are useful locally, but should not be created automatically
    # in production. Set CYBERTRIP_SEED_DEMO=true only when you explicitly want it.
    seed_demo = os.getenv("CYBERTRIP_SEED_DEMO", "false" if os.getenv("CYBERTRIP_ENV", "development").lower() == "production" else "true").lower() == "true"
    if seed_demo:
        demo = User.query.filter((User.username == "demo") | (User.email == "demo@cybertrip.local")).first()
        if demo is None:
            demo = User(username="demo", email="demo@cybertrip.local",
                password_hash=generate_password_hash("Demo12345!"), role="user", xp=780,
                full_name="Demo Student", language="uz")
            db.session.add(demo)
            db.session.commit()
    if Course.query.count() == 0:
        courses = [
            ("Kiberxavfsizlik asoslari","cybersecurity-fundamentals","Fundamentals","Beginner","Asosiy xavfsizlik tushunchalari, CIA triad va himoya prinsiplari."),
            ("Tarmoq asoslari","networking-basics","Networking","Beginner","TCP/IP, DNS, HTTP va tarmoq xavfsizligi asoslari."),
            ("Linux amaliyoti","linux-practice","Linux","Beginner","Terminal, fayl tizimi, permission va jarayonlar."),
            ("Web xavfsizlik","web-security","Web Security","Intermediate","HTTP, cookie, session va xavfsiz web arxitekturasi."),
            ("Kriptografiya asoslari","crypto-basics","Cryptography","Intermediate","Encoding, hashing, symmetric va asymmetric tushunchalar."),
            ("Forensika","digital-forensics","Forensics","Intermediate","Loglar, metadata va network capture tahlili."),
            ("OSINT","osint-foundations","OSINT","Beginner","Ochiq manbalar bilan xavfsiz axborot yig‘ish."),
            ("Reverse Engineering","reverse-engineering","Reverse","Advanced","Static/dynamic analysis tushunchalari."),
        ]
        for idx,(title,slug,cat,diff,desc) in enumerate(courses):
            c=Course(title=title,slug=slug,category=cat,difficulty=diff,description=desc,
                     duration=f"{2+idx%4} soat", instructor="CYBERTRIP Academy")
            db.session.add(c); db.session.flush()
            lessons = [
                f"{title}: Kirish", f"{title}: Asosiy tushunchalar",
                f"{title}: Amaliy misollar", f"{title}: Mini quiz"
            ]
            for p,lt in enumerate(lessons,1):
                db.session.add(Lesson(course_id=c.id,title=lt,slug=f"{slug}-{p}",
                    content=f"# {lt}\n\nBu dars CYBERTRIP trening muhitida xavfsiz, bosqichma-bosqich amaliy bilim beradi.\n\n### Amaliy topshiriq\nKonsepsiyani o‘rganing, misolni tahlil qiling va mini quiz orqali tekshiring.",
                    position=p,xp_reward=50))
    if Challenge.query.count() == 0:
        data = [
            ("HTTP Trail","http-trail","Web","Easy",100,"Training web ilovasida HTTP headerlarini kuzating.","So‘rov va javob orasidagi metama’lumotlarni tahlil qiling.","Server javobini ko‘ring.","flag{cybertrip_http}"),
            ("Cookie Trail","cookie-trail","Web","Easy",100,"Simulyatsiya qilingan sessiya cookie'larini tahlil qiling.","Cookie nomi va uning vazifasini aniqlang.","Cookie nomi ipucu bo‘lishi mumkin.","flag{cybertrip_cookie}"),
            ("Session Maze","session-maze","Web","Medium",150,"Sessiya oqimini xavfsiz labda tekshiring.","Auth state qanday o‘zgarishini kuzating.","Login oqimini bosqichlarga bo‘ling.","flag{cybertrip_session}"),
            ("Header Hunter","header-hunter","Web","Medium",150,"Xavfsizlik headerlarini toping.","Missing headerni aniqlang.","Security headerlar ro‘yxatidan boshlang.","flag{cybertrip_header}"),
            ("Hash Garden","hash-garden","Crypto","Easy",100,"Berilgan hash turi haqida xulosa qiling.","Hash formatini taning.","Uzunlik va belgilar to‘plamiga qarang.","flag{cybertrip_hash}"),
            ("Encoding Box","encoding-box","Crypto","Easy",100,"Encoding va encryptionni farqlang.","Artefaktni decode qiling.","Bu labda kuchli shifrlash emas, encoding ishlatilgan.","flag{cybertrip_encoding}"),
            ("RSA Basics","rsa-basics","Crypto","Medium",175,"RSA komponentlarini aniqlang.","n, e va d rollarini tushuning.","Kalit rollarini taqqoslang.","flag{cybertrip_rsa}"),
            ("Log Whisper","log-whisper","Forensics","Easy",100,"Log fayldagi anomaliyani toping.","Normal va g‘ayritabiiy qatorlarni ajrating.","Timestamp va status code'larni ko‘ring.","flag{cybertrip_logs}"),
            ("Metadata Lens","metadata-lens","Forensics","Easy",100,"Fayl metadata ma’lumotlarini tahlil qiling.","Author va creation time ni toping.","Metadata maydonlarini tekshiring.","flag{cybertrip_meta}"),
            ("Packet Story","packet-story","Network","Medium",150,"Trening pcap ichidagi trafik turini aniqlang.","Protokollarni taqqoslang.","Port va protokol juftligini kuzating.","flag{cybertrip_packet}"),
            ("DNS Trail","dns-trail","Network","Easy",100,"DNS query oqimini tahlil qiling.","So‘rov nomlari orasidagi bog‘lanishni toping.","Query va response juftliklarini ko‘ring.","flag{cybertrip_dns}"),
            ("Port Map","port-map","Network","Easy",100,"Xavfsiz training hostning ochiq portlarini xaritalang.","Port va xizmatni moslang.","Standart portlar jadvalidan foydalaning.","flag{cybertrip_port}"),
            ("Public Clues","public-clues","OSINT","Easy",100,"Ochiq ma’lumotlardan profilni yig‘ing.","Public atributlarni bog‘lang.","Faqat lab ichidagi ma’lumotlardan foydalaning.","flag{cybertrip_osint}"),
            ("Search Logic","search-logic","OSINT","Medium",150,"Qidiruv operatorlarini trening ma’lumotlarida sinang.","Aniqroq query tuzing.","Kalit so‘zlarni kombinatsiya qiling.","flag{cybertrip_search}"),
            ("Binary Intro","binary-intro","Reverse","Medium",175,"Berilgan binar metadata haqida xulosa qiling.","File type va section tushunchalarini tekshiring.","Format imzosidan boshlang.","flag{cybertrip_binary}"),
            ("String Hunt","string-hunt","Reverse","Easy",100,"Simulyatsiya qilingan binary stringlarini tahlil qiling.","E’tiborga molik satrlarni toping.","Konfiguratsiya kalitlariga qarang.","flag{cybertrip_strings}"),
            ("Linux Trail","linux-trail","Linux","Easy",100,"Fayl permissionlarini tahlil qiling.","Owner/group/other farqini toping.","rwx bitlarini ajrating.","flag{cybertrip_linux}"),
            ("Process Watch","process-watch","Linux","Medium",150,"Trening jarayonlar jadvalidagi noma’lum jarayonni toping.","PID va process nomini taqqoslang.","Parent-child bog‘lanishini ko‘ring.","flag{cybertrip_process}"),
            ("Blue Signal","blue-signal","Blue Team","Medium",175,"Detection loglaridan signalni toping.","Alert va eventlarni bog‘lang.","Takroriy failed loginlarni kuzating.","flag{cybertrip_blue}"),
            ("Incident Room","incident-room","Blue Team","Hard",250,"Simulyatsiya qilingan incident timeline'ni tiklang.","Eventlarni vaqt bo‘yicha joylashtiring.","Timeline birinchi qadamdir.","flag{cybertrip_incident}"),
        ]
        for d in data:
            db.session.add(Challenge(title=d[0],slug=d[1],category=d[2],difficulty=d[3],points=d[4],
                                     description=d[5],objective=d[6],hint=d[7],flag=d[8]))

    if Resource.query.count() == 0:
        resources = [
            ("Linux buyruqlari Cheat Sheet","Cheatsheet","pwd, ls, cd, cat, grep, find, chmod, chown, ps, top, ss va boshqa asosiy buyruqlar.", "Linuxda har kuni kerak bo‘ladigan buyruqlarni sodda misollar bilan o‘rganing.", "Beginner", 12),
            ("Networking Quick Guide","Cheatsheet","IP, MAC, ARP, DNS, TCP, UDP, ports, subnet va routing bo‘yicha tezkor qo‘llanma.", "Tarmoq asoslarini tez takrorlash uchun.", "Beginner", 15),
            ("HTTP Status Codes","Reference","200, 301, 302, 400, 401, 403, 404, 500 va boshqalar.", "Web xavfsizligi uchun HTTP javob kodlari.", "Beginner", 8),
            ("Web Security Checklist","Checklist","Authentication, authorization, session, input validation, file upload, API va logging.", "Web ilova xavfsizligini tekshirish checklisti.", "Intermediate", 20),
            ("Git va GitHub Asoslari","Cheatsheet","init, clone, add, commit, branch, merge, pull, push va conflict.", "Kod bazasini boshqarish uchun Git asoslari.", "Beginner", 18),
            ("Python Security Basics","Guide","String, list, dict, function, exception, file, JSON va HTTP.", "Pythonni security automation uchun poydevor sifatida o‘rganing.", "Beginner", 25),
            ("SQL Fundamentals","Cheatsheet","SELECT, WHERE, ORDER BY, GROUP BY, JOIN va parametrli query.", "Database va web security asoslari.", "Intermediate", 20),
            ("Regex Basics","Cheatsheet","Character classes, anchors, groups, quantifiers.", "Log va matn tahlilida regex.", "Beginner", 15),
            ("Incident Response Flow","Checklist","Prepare, Identify, Contain, Eradicate, Recover, Lessons Learned.", "Blue Team uchun incident bosqichlari.", "Intermediate", 12),
            ("CTF First Steps","Guide","Challenge o‘qish, note olish, hint, flag va writeup.", "CTFga yangi kirganlar uchun qo‘llanma.", "Beginner", 10),
            ("OWASP Concepts","Reference","Authentication, access control, injection, misconfiguration, crypto va SSRF.", "Web xavfsizligi tushunchalarini tizimlashtirish.", "Intermediate", 25),
            ("Digital Forensics Notes","Reference","Metadata, timeline, hashes, logs va PCAP basics.", "Forensika bo‘yicha tezkor takrorlash.", "Intermediate", 20),
            ("OSINT Methods","Guide","Source verification, query refinement, metadata, public records.", "Ochiq manbalardan xavfsiz foydalanish.", "Beginner", 18),
            ("Reverse Engineering Primer","Guide","Binary format, strings, symbols, static vs dynamic analysis.", "Reverse engineeringga kirish.", "Advanced", 30),
        ]
        for d in resources:
            db.session.add(Resource(title=d[0],category=d[1],description=d[2],content=d[3],level=d[4],minutes=d[5]))

    if QuizQuestion.query.count() == 0:
        samples=[
          ("CIA Triad","Confidentiality nimani anglatadi?","Ma’lumotga ruxsatni cheklash","Tizimni tezlashtirish","Faqat backup qilish","Internetni o‘chirish","A"),
          ("Kirish","TCP nimaga misol?","Transport protokoli","Fayl formati","Operatsion tizim","Hash turi","A"),
          ("Linux","chmod nimaga xizmat qiladi?","Permission o‘zgartirish","Process o‘chirish","DNS tekshirish","Faylni zip qilish","A"),
          ("Web","HTTP 404 odatda nimani bildiradi?","Resource topilmadi","Server ishga tushdi","Auth muvaffaqiyatli","Permission berildi","A"),
          ("Crypto","Hashning asosiy xususiyati qaysi?","Bir tomonlama funksiya sifatida ishlatilishi","Har doim qayta ochilishi","Faqat matnni siqishi","Faqat video uchun ishlashi","A"),
          ("Forensics","Metadata nimani beradi?","Fayl haqida qo‘shimcha atributlar","Faqat parol","Faqat portlar","Faqat CPU harorati","A")
        ]
        for title,qtext,a,b,c,d,ans in samples:
            l=Lesson.query.filter(Lesson.title.ilike(f"%{title}%")).first()
            if l:
                db.session.add(QuizQuestion(lesson_id=l.id,question=qtext,option_a=a,option_b=b,option_c=c,option_d=d,answer=ans))

    # CURRICULUM_EXPANSION
    if Lesson.query.count() < 80:
        expansions = {
          "Cyber Fundamentals":["CIA Triad","Threats vs Vulnerabilities","Risk Basics","Authentication","Authorization","Least Privilege","Secure Defaults","Security Culture"],
          "Networking":["OSI Model","TCP/IP","IPv4 Basics","Subnets","DNS","DHCP","NAT","Routing"],
          "Linux":["Filesystem","Users and Groups","Permissions","Processes","Services","SSH Concepts","Bash Basics","Log Review"],
          "Web Security":["HTTP","Cookies","Sessions","Access Control","Input Validation","SQL Injection Concepts","XSS Concepts","CSRF Concepts"],
          "Cryptography":["Encoding vs Encryption","Hashing","Salt","Symmetric Encryption","Asymmetric Encryption","Digital Signatures","PKI","Common Crypto Mistakes"],
          "Forensics":["Evidence Handling","File Metadata","Hash Verification","Timeline Analysis","Logs","PCAP Basics","Memory Concepts","Report Writing"],
          "OSINT":["Search Operators","Source Verification","Metadata","Username Research Concepts","Domain Basics","Public Records Concepts","Image Verification","OSINT Ethics"],
          "Reverse":["Binary Files","Strings","Sections","Symbols","Static Analysis","Dynamic Analysis","Debugging Concepts","Safe Practice"],
          "Blue Team":["Logging","Monitoring","Detection Rules","Alert Triage","IOC Concepts","Incident Timeline","Containment Concepts","Post-Incident Review"],
          "Pwn Foundations":["Memory Concepts","Stack Basics","Heap Concepts","Pointers","Input Handling","Crash Analysis","Mitigation Concepts","Safe Lab Concepts"],
          "Cloud Security":["Shared Responsibility","IAM","Storage Access","Network Segmentation","Secrets","Logging","Key Management","Cloud Incident Basics"],
          "Mobile Security":["Android Basics","App Components","Permissions","Storage","Network Traffic","Static Analysis","Dynamic Analysis Concepts","Mobile Threat Model"],
          "Python for Security":["Python Syntax","Data Types","Functions","Files","JSON","Regex","HTTP Clients","Automation Patterns"],
          "Security Engineering":["Threat Modeling","Secure Architecture","Input Validation","Secrets Management","Dependency Hygiene","Secure Logging","Testing","Security Review"]
        }
        for cname,lessons in expansions.items():
            slug=cname.lower().replace(" ","-")
            c=Course.query.filter((Course.title==cname) | (Course.slug==slug)).first()
            if not c:
                # Ensure slug uniqueness even if an older/custom course already uses it.
                base_slug=slug
                counter=2
                while Course.query.filter_by(slug=slug).first():
                    slug=f"{base_slug}-{counter}"
                    counter += 1
                c=Course(title=cname,slug=slug,category=cname,difficulty="Beginner",description=f"{cname} bo‘yicha bosqichma-bosqich o‘quv yo‘li.",duration="3 soat",instructor="CyberTrip Academy")
                db.session.add(c); db.session.flush()
            existing={x.title for x in c.lessons}; pos=len(c.lessons)+1
            for name in lessons:
                title=f"{cname}: {name}"
                if title in existing: continue
                body=(f"# {title}\n\n"
                      "### 1. Tushuncha\nAsosiy termin va g‘oyani sodda misollar bilan ajrating.\n\n"
                      "### 2. Nima uchun kerak?\nReal xavfsizlik vazifalarida qayerda ishlashini ko‘ring.\n\n"
                      "### 3. Amaliyot\nCyberTrip training muhitidagi misolni tahlil qiling va natijani yozib qo‘ying.\n\n"
                      "### 4. Tekshiruv\nDars oxiridagi quiz orqali o‘zingizni tekshiring.")
                db.session.add(Lesson(course_id=c.id,title=title,slug=f"{slug}-{pos}",content=body,position=pos,xp_reward=60))
                pos+=1

    # MORE_CYBERTRIP_CHALLENGES
    if Challenge.query.count() < 60:
        extra_challenges=[
          ("Gateway Puzzle","gateway-puzzle","Web","Easy",100,"HTTP request oqimini kuzating.","Request method va response code’ni taqqoslang.","Header va body farqini ko‘ring.","flag{ct_gateway}"),
          ("Form Logic","form-logic","Web","Easy",100,"Training form validation oqimini tahlil qiling.","Client va server validationni farqlang.","Form maydonlarini tekshiring.","flag{ct_form}"),
          ("Access Matrix","access-matrix","Web","Medium",150,"Authorization matrixini to‘ldiring.","Role va resource jadvalini kuzating.","Kim qaysi resursga kira olishini belgilang.","flag{ct_matrix}"),
          ("API Schema","api-schema","Web","Medium",175,"Xavfsiz API endpointlar sxemasini tahlil qiling.","Method va fieldlarni toping.","Response JSON tuzilmasiga qarang.","flag{ct_api}"),
          ("File Gate","file-gate","Web","Medium",150,"Upload validation qoidalarini tahlil qiling.","Extension, MIME va size tekshiruvlarini ajrating.","Server policy ni kuzating.","flag{ct_file}"),
          ("JWT Anatomy","jwt-anatomy","Web","Medium",175,"JWT qismlarini o‘rganing.","Header, payload, signature qismlarini ajrating.","Nuqta bilan ajratilgan uch qismni ko‘ring.","flag{ct_jwt}"),
          ("Base64 Room","base64-room","Crypto","Easy",100,"Base64 encodingni aniqlang.","Decode va encryption farqini toping.","Alfavit belgilarini tekshiring.","flag{ct_b64}"),
          ("Caesar Walk","caesar-walk","Crypto","Easy",100,"Oddiy substitution shiftni toping.","Harflar siljishini aniqlang.","Shift qiymatini taqqoslang.","flag{ct_caesar}"),
          ("XOR Room","xor-room","Crypto","Medium",150,"XOR konsepsiyasini trening misolida tahlil qiling.","Input va keyni solishtiring.","Bir xil key bilan qayta XOR xususiyatini o‘rganing.","flag{ct_xor}"),
          ("Key Exchange","key-exchange","Crypto","Medium",175,"Public/private key rollarini ajrating.","Qaysi qism maxfiy ekanini toping.","Kalit vazifalarini bog‘lang.","flag{ct_keys}"),
          ("Timeline One","timeline-one","Forensics","Easy",100,"Eventlarni vaqt bo‘yicha tartiblang.","Timestamplarni ajrating.","Eng erta hodisadan boshlang.","flag{ct_timeline1}"),
          ("Timeline Two","timeline-two","Forensics","Medium",150,"Ikki manbadagi vaqtni birlashtiring.","Clock skew tushunchasini ko‘ring.","Manbalarni taqqoslang.","flag{ct_timeline2}"),
          ("Hash Verify","hash-verify","Forensics","Easy",100,"Fayl yaxlitligini hash bilan tekshiring.","Ikki hashni solishtiring.","Digestni qidiring.","flag{ct_hashverify}"),
          ("PCAP Start","pcap-start","Forensics","Easy",100,"Training PCAP ichidagi asosiy protokolni toping.","Conversation va protocol ro‘yxatini ko‘ring.","Eng ko‘p uchragan protokolni aniqlang.","flag{ct_pcap}"),
          ("DNS Beacon","dns-beacon","Forensics","Medium",160,"Shubhali DNS ketma-ketligini ajrating.","Query uzunligi va takrorlanishini ko‘ring.","Normal va anomal trafficni taqqoslang.","flag{ct_dnsbeacon}"),
          ("MAC Trail","mac-trail","Network","Easy",100,"MAC va IP bog‘lanishini aniqlang.","ARP jadvalini ko‘ring.","Address juftliklarini yozing.","flag{ct_mactrail}"),
          ("TCP Three","tcp-three","Network","Easy",100,"TCP handshake bosqichlarini toping.","SYN, SYN-ACK, ACK ketma-ketligini ko‘ring.","Uch bosqichni tartiblang.","flag{ct_tcp3}"),
          ("UDP Light","udp-light","Network","Easy",100,"UDP va TCP farqini aniqlang.","Connectionless xususiyatini toping.","Header va handshake farqini taqqoslang.","flag{ct_udp}"),
          ("Subnet Steps","subnet-steps","Network","Medium",150,"Trening tarmoq segmentini hisoblang.","Prefix lengthni o‘qing.","Network va broadcastni ajrating.","flag{ct_subnet}"),
          ("Route Room","route-room","Network","Medium",150,"Routing jadvalidagi mos yo‘lni toping.","Destination va next hopni taqqoslang.","Longest prefix prinsipini yodlang.","flag{ct_route}"),
          ("Metadata Name","metadata-name","OSINT","Easy",100,"Public fayl metadata maydonini aniqlang.","Author maydonini toping.","Metadata viewer natijasini o‘qing.","flag{ct_metname}"),
          ("Source Check","source-check","OSINT","Easy",100,"Ikki manba orasidagi farqni toping.","Primary va secondary source ni ajrating.","Sana va muallifni tekshiring.","flag{ct_source}"),
          ("Query Builder","query-builder","OSINT","Medium",150,"Aniq qidiruv query tuzing.","Qo‘shtirnoq va minus operatorlarini o‘rganing.","Keraksiz natijalarni chiqarib tashlang.","flag{ct_query}"),
          ("Image Verify","image-verify","OSINT","Medium",150,"Rasm atributlarini tekshiring.","Metadata va visible clue’larni solishtiring.","EXIF bo‘lishi mumkinligini tekshiring.","flag{ct_image}"),
          ("Strings Two","strings-two","Reverse","Easy",100,"Training binary stringlarini guruhlang.","Config va status satrlarini ajrating.","Ma’noli satrlarni belgilang.","flag{ct_strings2}"),
          ("Section Map","section-map","Reverse","Medium",150,"PE/ELF section konsepsiyasini tushuning.","Code va data segmentlarini ajrating.","Section nomlarini taqqoslang.","flag{ct_section}"),
          ("Symbol Room","symbol-room","Reverse","Medium",175,"Symbol table vazifasini aniqlang.","Funksiya nomlarini kuzating.","Static analysis belgilarini toping.","flag{ct_symbol}"),
          ("Debug Path","debug-path","Reverse","Medium",175,"Safe debugger trace ni o‘qing.","Break point va step tushunchalarini ajrating.","Execution flowni kuzating.","flag{ct_debug}"),
          ("File Perms","file-perms","Linux","Easy",100,"Linux permission satrini o‘qing.","rwx bitlarini ajrating.","Owner/group/otherni taqqoslang.","flag{ct_perms}"),
          ("Process Tree","process-tree","Linux","Easy",100,"Process parent-child bog‘lanishini toping.","PID va PPIDni kuzating.","Tree shaklida tasavvur qiling.","flag{ct_ptree}"),
          ("Service Desk","service-desk","Linux","Medium",150,"Trening xizmatlar ro‘yxatida service holatini toping.","running/stopped holatlarini ajrating.","Port bilan moslang.","flag{ct_service}"),
          ("SSH Concepts","ssh-concepts","Linux","Medium",150,"SSH authentication turlarini farqlang.","Password va key authni taqqoslang.","Public key rolini toping.","flag{ct_ssh}"),
          ("Alert Triage","alert-triage","Blue Team","Easy",100,"Loglardan muhim alertni toping.","Severity va timestampni taqqoslang.","Critical bo‘lganini ajrating.","flag{ct_triage}"),
          ("IOC Map","ioc-map","Blue Team","Medium",150,"Indicatorlarni kategoriya bo‘yicha ajrating.","IP, domain, hash va pathni farqlang.","Indicator turini aniqlang.","flag{ct_ioc}"),
          ("Detection Lab","detection-lab","Blue Team","Medium",175,"Detection rule signalini tahlil qiling.","Condition va eventni bog‘lang.","Patternni toping.","flag{ct_detection}"),
          ("Incident Timeline","incident-timeline","Blue Team","Hard",250,"Incident ketma-ketligini tiklang.","Initial accessdan recoverygacha joylashtiring.","Event vaqtini taqqoslang.","flag{ct_incident2}"),
          ("Cloud IAM","cloud-iam","Cloud","Easy",100,"IAM role va permissionlarni ajrating.","Least privilege nuqtasini toping.","Action/resource juftligini ko‘ring.","flag{ct_cloudiam}"),
          ("Cloud Storage","cloud-storage","Cloud","Medium",150,"Storage access policy ni tahlil qiling.","Public/private farqini toping.","Policy statementni o‘qing.","flag{ct_cloudstorage}"),
          ("Secret Vault","secret-vault","Cloud","Medium",175,"Secretlarni to‘g‘ri saqlash konsepsiyasini aniqlang.","Environment va secret managerni taqqoslang.","Secretni source codega joylamaslik prinsipini toping.","flag{ct_secret}"),
          ("Mobile Manifest","mobile-manifest","Mobile","Easy",100,"Mobile manifest permissionlarini ko‘ring.","Kerakli va ortiqcha permissionlarni ajrating.","Permission nomlarini yozing.","flag{ct_manifest}"),
          ("Mobile Storage","mobile-storage","Mobile","Medium",150,"App storage xavfini tahlil qiling.","Plaintext secret tushunchasini toping.","Sensitive data joylashuvini ko‘ring.","flag{ct_mobilestore}"),
          ("Python Regex","python-regex","Python","Easy",100,"Regex patternni o‘qing.","Character class va quantifierni ajrating.","Pattern nimani qidirishini aniqlang.","flag{ct_pyregex}"),
          ("Python JSON","python-json","Python","Easy",100,"JSON tuzilmasini tahlil qiling.","Key va value ni ajrating.","Nested objectni toping.","flag{ct_pyjson}"),
          ("Python HTTP","python-http","Python","Medium",150,"Training HTTP client oqimini o‘qing.","Method va response ni bog‘lang.","Status code’ni toping.","flag{ct_pyhttp}"),
          ("Threat Model","threat-model","Security Engineering","Easy",100,"Asset, threat, control bog‘lanishini toping.","Riskni aktivga bog‘lang.","Control maqsadini aniqlang.","flag{ct_threat}"),
          ("Secure Design","secure-design","Security Engineering","Medium",150,"Secure-by-default prinsipini toping.","Fail-safe va least privilege ni taqqoslang.","Design qarorini belgilang.","flag{ct_design}"),
          ("Logging Lab","logging-lab","Blue Team","Easy",100,"Qaysi log maydonlari kerakligini toping.","Timestamp, actor va actionni ajrating.","Auditabilityni tushuning.","flag{ct_logging}"),
          ("Auth Flow","auth-flow","Web","Easy",100,"Login oqimini bosqichlarga ajrating.","Credential check va session yaratishni toping.","Flow diagrammasini tiklang.","flag{ct_auth}"),
          ("Rate Limit","rate-limit","Web","Medium",150,"Rate limiting vazifasini tushuning.","Request count va time windowni taqqoslang.","Limitdan keyingi xatti-harakatni aniqlang.","flag{ct_ratelimit}"),
          ("CSP Basics","csp-basics","Web","Medium",150,"Content Security Policy konsepsiyasini o‘rganing.","Allowed source tushunchasini toping.","Policy directive'larni ajrating.","flag{ct_csp}"),
          ("Access Review","access-review","Security Engineering","Medium",150,"Foydalanuvchi permissionlarini audit qiling.","Ortiqcha accessni belgilang.","Least privilege bilan taqqoslang.","flag{ct_accessreview}"),
          ("Dependency Check","dependency-check","Security Engineering","Easy",100,"Package dependency holatini tahlil qiling.","Version va riskni ajrating.","Yangilash siyosatini belgilang.","flag{ct_dependency}"),
        ]
        existing={c.slug for c in Challenge.query.all()}
        for d in extra_challenges:
            if d[1] not in existing:
                db.session.add(Challenge(title=d[0],slug=d[1],category=d[2],difficulty=d[3],points=d[4],description=d[5],objective=d[6],hint=d[7],flag=d[8]))
                existing.add(d[1])
    db.session.commit()




def ensure_learning_content():
    """Idempotently add practical labs and quizzes to existing local databases."""
    from .routes.labs import scenario_for
    import secrets
    lessons = Lesson.query.order_by(Lesson.id).all()
    for lesson in lessons:
        # Har bir dars kamida 3 ta qisqa, darsga tegishli mustahkamlash savoliga ega bo‘lsin.
        # Eski bazalarda 1-2 ta savol bo‘lsa, yetishmayotganlari qo‘shiladi.
        existing_q = QuizQuestion.query.filter_by(lesson_id=lesson.id).count()
        if existing_q < 3:
            category = (lesson.course.category or "Fundamentals").lower()
            bank = {
                "linux": [
                    ("Linuxda fayl permissionlarini o‘zgartirish uchun qaysi buyruq ishlatiladi?", "chmod", "grep", "ps", "host", "A"),
                    ("`pwd` buyrug‘i nima ko‘rsatadi?", "Joriy katalog yo‘lini", "Ochiq portlarni", "DNS yozuvini", "Processlar ro‘yxatini", "A"),
                    ("`ps` buyrug‘idan asosiy maqsad nima?", "Jarayonlarni ko‘rish", "Faylni shifrlash", "DNS sozlash", "HTTP so‘rov yuborish", "A"),
                ],
                "networking": [
                    ("DNSning asosiy vazifasi nima?", "Nomni IP bilan bog‘lash", "Fayl permissionini berish", "Parolni hash qilish", "Logni siqish", "A"),
                    ("TCP qaysi xususiyat bilan tanilgan?", "Connection-oriented aloqa", "Har doim encryption", "Faqat DNS uchun ishlash", "Faqat lokal ishlash", "A"),
                    ("`ip route` nimani ko‘rsatadi?", "Routing jadvalini", "Fayl metadata'sini", "CPU yukini", "HTML source'ni", "A"),
                ],
                "web security": [
                    ("HTTP 404 odatda nimani bildiradi?", "Resurs topilmadi", "Login muvaffaqiyatli", "Server o‘chirildi", "DNS ishlamayapti", "A"),
                    ("SQL Injectiondan asosiy himoyalardan biri qaysi?", "Parameterized queries", "Ko‘proq CSS", "Faqat client-side validation", "Parolni HTMLga yozish", "A"),
                    ("HttpOnly cookie flagi nimaga yordam beradi?", "Client-side script orqali cookie o‘qilishini cheklashga", "Cookie'ni internetdan yashirishga", "TLSni o‘chirib qo‘yishga", "DNSni tezlashtirishga", "A"),
                ],
                "cryptography": [
                    ("Base64 nima?", "Encoding", "Hashing", "Symmetric encryption", "Firewall", "A"),
                    ("SHA-256 odatda nima uchun ishlatiladi?", "Hash olish uchun", "Port ochish uchun", "DNS rezolyutsiya uchun", "Cookie yaratish uchun", "A"),
                    ("Parollarni saqlash uchun qaysi yondashuv to‘g‘ri?", "Password hashing + salt", "Plaintext", "Base64", "URL encoding", "A"),
                ],
                "forensics": [
                    ("Metadata nimani anglatadi?", "Fayl haqidagi qo‘shimcha atributlar", "Faqat parol", "Faqat IP manzil", "Faqat CPU ma'lumoti", "A"),
                    ("Evidence yaxlitligini tekshirishda nima foydali?", "Hash", "CSS", "Cookie", "DNS", "A"),
                    ("Forensics jarayonida birinchi navbatdagi maqsad nima?", "Dalilni saqlash", "Originalni o‘zgartirish", "Logni o‘chirish", "Natijani taxmin qilish", "A"),
                ],
                "osint": [
                    ("OSINT nimaga asoslanadi?", "Ochiq va qonuniy manbalarga", "Faqat maxfiy bazalarga", "Faqat parollarga", "Faqat local fayllarga", "A"),
                    ("Manba ishonchliligini oshirish uchun nima qilish kerak?", "Cross-check qilish", "Bitta postga tayanish", "Manbani yashirish", "Sanasini tekshirmaslik", "A"),
                    ("OSINTda etik prinsip nima?", "Maxfiylik va qonuniylikni hurmat qilish", "Har qanday ma'lumotni tarqatish", "Ruxsatsiz kirish", "Hisoblarni buzish", "A"),
                ],
                "reverse": [
                    ("Static analysis nimani anglatadi?", "Faylni ishga tushirmasdan tahlil qilish", "Faqat network skanerlash", "Parol o‘zgartirish", "DNS yozish", "A"),
                    ("`strings` buyrug‘i nima beradi?", "Binary ichidagi o‘qiladigan satrlarni", "Processlarni", "Portlarni", "Routing jadvalini", "A"),
                    ("Noma'lum binary bilan xavfsiz ishlashning to‘g‘ri usuli qaysi?", "Izolyatsiyalangan sandbox", "Asosiy tizimda ishga tushirish", "Admin passwordni berish", "Himoyani o‘chirish", "A"),
                ],
                "blue team": [
                    ("Incident response odatda nimadan boshlanadi?", "Signal/triage", "Logni o‘chirish", "Parolni public qilish", "Backupni o‘chirish", "A"),
                    ("IOC nima?", "Compromise belgisi", "Video formati", "DNS turi", "Linux package", "A"),
                    ("Least privilege nimani anglatadi?", "Faqat kerakli huquqlarni berish", "Hamma userga admin berish", "Barcha portlarni ochish", "Loglarni o‘chirish", "A"),
                ],
                "cloud": [
                    ("IAM nimani boshqaradi?", "Identity va access", "Video encoding", "CSS", "Local printer", "A"),
                    ("Cloud securityda least privilege nimaga kerak?", "Keraksiz accessni kamaytirishga", "Barcha resursni public qilishga", "Secretni sourcega yozishga", "Loggingni o‘chirishga", "A"),
                    ("Secretlarni qayerda saqlash ma'qul?", "Secret manager/environment secret", "GitHub source code", "HTML", "Public README", "A"),
                ],
                "mobile": [
                    ("Mobile app permissionlari nimani belgilaydi?", "Qaysi resurslarga app kira olishini", "CPU tezligini", "DNS serverini", "HTML rangini", "A"),
                    ("Sensitive data uchun qaysi yondashuv xavfsizroq?", "Secure storage", "Plaintext log", "Public file", "URL parameter", "A"),
                    ("Mobile securityda static analysis nimani tekshiradi?", "App kodi va strukturasini", "Faqat Wi-Fi tezligini", "Faqat ekran o‘lchamini", "Printer holatini", "A"),
                ],
                "python": [
                    ("JSONda ma'lumot odatda nimadan tuziladi?", "Key-value juftliklardan", "Faqat rasmlardan", "Faqat portlardan", "Faqat shell buyruqlaridan", "A"),
                    ("Regex nima uchun ishlatiladi?", "Pattern bilan matn qidirish/tekshirish uchun", "DNS yaratish uchun", "Password reset uchun", "Video render uchun", "A"),
                    ("Python HTTP clientda response status nima beradi?", "Server javob holatini", "CPU haroratini", "Disk hajmini", "DNS credentialni", "A"),
                ],
                "security engineering": [
                    ("Threat modelingning maqsadi nima?", "Risklarni oldindan aniqlash", "Logni o‘chirish", "Designni yashirish", "Parolni public qilish", "A"),
                    ("Secure-by-default nima?", "Xavfsiz sozlama bilan boshlash", "Barcha permissionni ochish", "Debugni public qilish", "Validationni olib tashlash", "A"),
                    ("Dependency hygiene nimani anglatadi?", "Kutubxonalarni nazorat va yangilash", "Har bir packagega admin berish", "Versionni yashirish", "Source'ni o‘chirish", "A"),
                ],
                "fundamentals": [
                    ("CIA Triadning C harfi nimani anglatadi?", "Confidentiality", "Control", "Code", "Cache", "A"),
                    ("Authentication nima qiladi?", "Foydalanuvchi kimligini tekshiradi", "Huquq berishni yakunlaydi", "DNSni sozlaydi", "Logni o‘chiradi", "A"),
                    ("Least privilege nimani anglatadi?", "Minimal zarur huquqlar", "Barcha huquqlar", "Faqat guest huquqlari", "No access", "A"),
                ],
            }
            key = next((k for k in bank if k in category), "fundamentals")
            for q in bank[key][:3]:
                if not QuizQuestion.query.filter_by(lesson_id=lesson.id, question=q[0]).first():
                    db.session.add(QuizQuestion(lesson_id=lesson.id, question=q[0], option_a=q[1], option_b=q[2], option_c=q[3], option_d=q[4], answer=q[5]))
        if not Lab.query.filter_by(lesson_id=lesson.id).first():
            sc=scenario_for(lesson.course.category)
            slug=f"lesson-{lesson.id}-{lesson.slug}"
            db.session.add(Lab(title=f"{lesson.title} — Virtual Lab",slug=slug,category=lesson.course.category,difficulty=lesson.course.difficulty,lesson_id=lesson.id,objective=sc["objective"],detection=sc["detection"],remediation=sc["fix"],instructions="Bosqichlarni ketma-ket bajaring. Har bir action faqat synthetic training evidence qaytaradi.",scenario=sc["scenario"],flag=f"CYBERTRIP{{lesson_{lesson.id}_{secrets.token_hex(4)}}}",required_actions=','.join(sc["actions"])))
    # Upgrade lesson text in-place so existing local databases receive the full practical curriculum.
    packs = {
        "Linux": """## Linux amaliyoti — to‘liq o‘quv konspekti

### 1. Maqsad
Linux terminalini tushunish, fayl tizimi, permission, jarayonlar va tarmoq holatini **faqat o‘z kompyuteringiz yoki CYBERTRIP sandboxida** tekshirish.

### 2. Asosiy buyruqlar
```bash
pwd
ls -la
cd /tmp
mkdir cybertrip_lab
cd cybertrip_lab
touch notes.txt
echo 'training' > notes.txt
cat notes.txt
cp notes.txt backup.txt
mv backup.txt evidence.txt
rm evidence.txt
```

### 3. Fayl va kataloglarni tahlil qilish
```bash
find . -maxdepth 2 -type f
file notes.txt
stat notes.txt
head -n 10 notes.txt
tail -n 10 notes.txt
grep -n 'training' notes.txt
```

### 4. Permission
```bash
ls -l
chmod 600 notes.txt
chmod 700 cybertrip_lab
```
`r` — read, `w` — write, `x` — execute. Eng kam huquq prinsipini ishlating.

### 5. Jarayonlar
```bash
ps
top
pgrep -a python
```
Maqsad — jarayonni ko‘rish va qaysi servis ishlayotganini tushunish. Noma’lum jarayonni o‘chirishdan oldin uni aniqlang.

### 6. Tarmoq holati
```bash
ip addr
ip route
ss -tuln
host localhost
```
Bu buyruqlar lokal tizimdagi interfeys, route va listening socketlarni ko‘rishga yordam beradi.

### 7. Log tahlili
```bash
grep -i 'error' /var/log/syslog 2>/dev/null | head
tail -n 30 /var/log/syslog 2>/dev/null
```
Labda logdan vaqt, hodisa, source va natijani ajrating.

### 8. Aniqlash → Tuzatish
Aniqlash: normal holatni belgilang → o‘zgarishni kuzating → dalilni saqlang.
Tuzatish: ortiqcha permissionni olib tashlang → keraksiz servisni o‘chirib qo‘ying → qayta tekshiring.

### 9. Amaliy vazifa
CYBERTRIP Virtual Lab ichida `inspect → analyze → verify` bosqichlarini bajaring. Real internet hostlariga test qilmang.
""",
        "Networking": """## Tarmoq asoslari — amaliy konspekt

### 1. Muhim tushunchalar
IP manzil, subnet, gateway, DNS, TCP, UDP, port va HTTP o‘rtasidagi farqni tushuning.

### 2. Lokal tarmoqni ko‘rish
```bash
ip addr
ip route
getent hosts localhost
host localhost
```
Windows PowerShellda: `ipconfig`, `route print`, `nslookup localhost`.

### 3. TCP/UDP holatini kuzatish
```bash
ss -tuln
```
Portni ko‘rish — servisning mavjudligini anglatadi; keyingi qadam servis nima qilayotganini hujjat yoki lab orqali tekshirishdir.

### 4. HTTP bilan tanishish — faqat lokal lab
```bash
curl -I http://127.0.0.1:5000
curl -s http://127.0.0.1:5000 | head
```
Response status, headers va body'ni alohida tahlil qiling.

### 5. DNS
```bash
nslookup localhost
getent hosts localhost
```
DNS nomni IP bilan bog‘lashga xizmat qiladi.

### 6. Aniqlash
Normal response → o‘zgarish → dalil → sabab. Biror tizimni tekshirishdan oldin ruxsat doirasini belgilang.

### 7. Himoya
Keraksiz portlarni yopish, firewall siyosatini minimal qilish, servislarni yangilash, TLS va autentifikatsiyani to‘g‘ri sozlash.
""",
        "Web Security": """## Web xavfsizlik — amaliy va himoyaviy dars

### 1. HTTP asoslari
Request: method, path, headers, body. Response: status, headers, body.

Lokal labni tekshirish: `curl -I http://127.0.0.1:5000` yoki CYBERTRIP bergan training URL.

### 2. Cookie va session
Cookie nomi, Secure, HttpOnly va SameSite atributlarini tushuning.

### 3. Xavfsiz input ishlov berish
User inputni to‘g‘ridan-to‘g‘ri query yoki HTMLga qo‘shmang. Parameterized query, context-aware output encoding va server-side validationdan foydalaning.

### 4. Aniqlash
Input → response farqi → log → qayta tekshirish. Faqat CYBERTRIP sandboxida tajriba qiling.

### 5. Himoyalash
- Prepared statements
- Output encoding
- CSRF himoyasi
- Secure cookie flags
- Access control
- Rate limiting
- Security logging

### 6. Lokal test
```bash
curl -I http://127.0.0.1:5000
curl -s http://127.0.0.1:5000/robots.txt
```
Natijani izohlang va Virtual Labda evidence yig‘ing.
""",
        "Cryptography": """## Kriptografiya asoslari

### Encoding ≠ encryption ≠ hashing
Base64 — encoding. AES — symmetric encryption. SHA-256 — hash. Parolni oddiy hash bilan emas, password hashing algoritmlari bilan saqlash kerak.

### Lokal mashq
```bash
printf 'CYBERTRIP' | base64
printf 'CYBERTRIP' | sha256sum
```

### Aniqlash
Formatni aniqlang, reversible yoki irreversible ekanini ajrating, key mavjudligini tekshiring.

### Himoya
Parollar uchun Argon2/bcrypt/scrypt kabi password hashing, kalitlarni secret managerda saqlash, TLS va kalit rotatsiyasi.
""",
        "Forensics": """## Digital Forensics — dalilga asoslangan tahlil

### Asosiy jarayon
Preserve → Collect → Examine → Analyze → Report.

### Fayl metadata
```bash
file evidence.bin
stat evidence.bin
sha256sum evidence.bin
strings evidence.bin | head -n 30
```

### Log tahlili
```bash
grep -n -i 'error' app.log
grep -n -E 'login|auth|failed' app.log
tail -n 50 app.log
```

Har bir xulosani dalil bilan bog‘lang. Original evidence'ni o‘zgartirmang.
""",
        "OSINT": """## OSINT asoslari

OSINT — ochiq va qonuniy manbalardan ma’lumot yig‘ish va tekshirish.

### Jarayon
Savol → manba → tekshirish → cross-check → xulosa.

### Mahalliy fayl bilan mashq
```bash
grep -i 'keyword' notes.txt
sort notes.txt | uniq
```

Shaxsiy ma’lumotlarni izlash yoki tarqatishda maxfiylik va qonuniylikni birinchi o‘ringa qo‘ying.
""",
        "Reverse": """## Reverse Engineering — xavfsiz kirish

Maqsad — dastur qanday ishlashini tushunish.

### Static analysis
```bash
file sample.bin
strings sample.bin | head -n 50
sha256sum sample.bin
```

### Dynamic analysis
Faqat CYBERTRIP sandboxidagi sample bilan ishlang. Dastur xatti-harakatini process, file va network evidence orqali kuzating.

### Himoya
Noma’lum binaryni asosiy tizimda ishga tushirmang; izolyatsiya, snapshot va minimal permissiondan foydalaning.
""",
        "Blue Team": """## Blue Team — aniqlash va himoyalash

### SOC fikrlashi
Signal → triage → evidence → containment → remediation → verification.

### Foydali lokal buyruqlar
```bash
ps
ss -tuln
tail -n 100 app.log
grep -i 'failed' app.log
sha256sum suspicious.bin
```

### Aniqlash
False positive va true positive farqini dalil bilan ajrating.

### Himoya
Least privilege, patching, logging, alerting, backups va incident response playbook.
""",
        "Fundamentals": """## Kiberxavfsizlik asoslari

### CIA Triad
Confidentiality, Integrity, Availability.

### Asosiy prinsiplar
Least privilege, defense in depth, secure defaults, authentication, authorization, logging.

### Lokal mashq
```bash
pwd
whoami
ip addr
ss -tuln
```

Har bir buyruq nima ko‘rsatishini yozing. Keyin Virtual Labda evidence bilan tekshiring.

### Professional qoida
O‘rgangan texnikani faqat o‘zingizga tegishli yoki aniq ruxsat berilgan muhitda qo‘llang.
"""
    }
    for lesson in lessons:
        pack = packs.get(lesson.course.category, packs["Fundamentals"])
        if "CYBERTRIP PRACTICAL CURRICULUM" not in (lesson.content or ""):
            lesson.content = f"# {lesson.title}\n\n> CYBERTRIP PRACTICAL CURRICULUM\n\n{pack}\n\n## Nazorat savollari\n1. Bu mavzuni qanday aniqlaysiz?\n2. Qaysi dalil sizning xulosangizni tasdiqlaydi?\n3. Developer yoki defender sifatida qanday yopasiz?\n4. Virtual Labda qanday verify qilasiz?"

    for ch in Challenge.query.all():
        if not Lab.query.filter_by(challenge_id=ch.id).first():
            sc=scenario_for(ch.category)
            db.session.add(Lab(title=f"{ch.title} — CTF Virtual Lab",slug=f"ctf-{ch.slug}",category=ch.category,difficulty=ch.difficulty,challenge_id=ch.id,objective=ch.objective,detection=sc["detection"],remediation=sc["fix"],instructions="Challenge flagini topish uchun evidence chainni tugating. Bu synthetic sandbox.",scenario=sc["scenario"],flag=ch.flag,required_actions=','.join(sc["actions"])))
    db.session.commit()
