import { PrismaClient, Role, Difficulty, ContentStatus, LabCategory, CTFCategory, FlagType, TournamentStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // === USERS & AUTH ===
  console.log('Seeding users...');
  const adminPassword = await bcrypt.hash('CyberTrip2024!', 10);
  const studentPassword = await bcrypt.hash('student123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@cybertrip.uz' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      email: 'admin@cybertrip.uz',
      username: 'admin',
      displayName: 'CyberTrip Admin',
      role: Role.ADMIN,
      passwordHash: adminPassword,
      isActive: true,
      emailVerified: true,
    },
  });

  const student = await prisma.user.upsert({
    where: { email: 'student@test.uz' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      email: 'student@test.uz',
      username: 'student1',
      displayName: 'Test Talaba',
      role: Role.STUDENT,
      passwordHash: studentPassword,
      isActive: true,
      emailVerified: true,
    },
  });

  // === LEARNING PATHS ===
  console.log('Seeding learning paths...');
  const paths = [
    { slug: 'web-pentest', title: 'Web Pentest Asoslari', difficulty: Difficulty.BEGINNER, estimatedHours: 40, icon: '🌐', status: ContentStatus.PUBLISHED, order: 1 },
    { slug: 'linux-security', title: 'Linux va Tizim Xavfsizligi', difficulty: Difficulty.BEGINNER, estimatedHours: 30, icon: '🐧', status: ContentStatus.PUBLISHED, order: 2 },
    { slug: 'network-security', title: 'Tarmoq Xavfsizligi', difficulty: Difficulty.INTERMEDIATE, estimatedHours: 35, icon: '🔌', status: ContentStatus.PUBLISHED, order: 3 },
    { slug: 'cryptography', title: 'Kriptografiya Asoslari', difficulty: Difficulty.INTERMEDIATE, estimatedHours: 25, icon: '🔐', status: ContentStatus.PUBLISHED, order: 4 },
    { slug: 'soc-blue-team', title: 'SOC va Blue Team', difficulty: Difficulty.ADVANCED, estimatedHours: 45, icon: '🛡️', status: ContentStatus.PUBLISHED, order: 5 },
    { slug: 'osint-recon', title: 'OSINT va Razvedka', difficulty: Difficulty.INTERMEDIATE, estimatedHours: 20, icon: '🔍', status: ContentStatus.PUBLISHED, order: 6 },
  ];

  const createdPaths = {};
  for (const path of paths) {
    createdPaths[path.slug] = await prisma.learningPath.upsert({
      where: { slug: path.slug },
      update: { ...path },
      create: { id: crypto.randomUUID(), ...path },
    });
  }

  // === COURSES ===
  console.log('Seeding courses...');
  const webPathId = createdPaths['web-pentest'].id;
  const courses = [
    { slug: 'http-web-architecture', title: 'HTTP va Web Arxitekturasi', difficulty: Difficulty.BEGINNER, estimatedHours: 8, order: 1, status: ContentStatus.PUBLISHED, learningPathId: webPathId },
    { slug: 'sql-injection', title: 'SQL Injection', difficulty: Difficulty.INTERMEDIATE, estimatedHours: 10, order: 2, status: ContentStatus.PUBLISHED, learningPathId: webPathId },
    { slug: 'xss', title: 'Cross-Site Scripting (XSS)', difficulty: Difficulty.INTERMEDIATE, estimatedHours: 8, order: 3, status: ContentStatus.PUBLISHED, learningPathId: webPathId },
    { slug: 'auth-security', title: 'Autentifikatsiya va Avtorizatsiya', difficulty: Difficulty.INTERMEDIATE, estimatedHours: 10, order: 4, status: ContentStatus.PUBLISHED, learningPathId: webPathId },
    { slug: 'api-security', title: 'API Xavfsizligi', difficulty: Difficulty.ADVANCED, estimatedHours: 12, order: 5, status: ContentStatus.PUBLISHED, learningPathId: webPathId },
  ];

  const createdCourses = {};
  for (const course of courses) {
    createdCourses[course.slug] = await prisma.course.upsert({
      where: { slug: course.slug },
      update: { ...course },
      create: { id: crypto.randomUUID(), ...course },
    });
  }

  // === MODULES & LESSONS ===
  console.log('Seeding modules and lessons...');
  // Clear existing modules for these courses to avoid duplicates on re-seed since no unique constraint exists
  await prisma.module.deleteMany({
    where: { courseId: { in: [createdCourses['http-web-architecture'].id, createdCourses['sql-injection'].id] } }
  });

  // Modules for HTTP Course
  const httpCourseId = createdCourses['http-web-architecture'].id;
  const httpMod1 = await prisma.module.create({ data: { id: crypto.randomUUID(), courseId: httpCourseId, title: 'HTTP Asoslari', order: 1 } });
  const httpMod2 = await prisma.module.create({ data: { id: crypto.randomUUID(), courseId: httpCourseId, title: 'Cookie va Sessiyalar', order: 2 } });
  const httpMod3 = await prisma.module.create({ data: { id: crypto.randomUUID(), courseId: httpCourseId, title: 'Xavfsizlik Headerlari', order: 3 } });

  // Modules for SQLi Course
  const sqliCourseId = createdCourses['sql-injection'].id;
  const sqliMod1 = await prisma.module.create({ data: { id: crypto.randomUUID(), courseId: sqliCourseId, title: 'SQL Tili Asoslari', order: 1 } });
  const sqliMod2 = await prisma.module.create({ data: { id: crypto.randomUUID(), courseId: sqliCourseId, title: 'SQL Injection Hujumlari', order: 2 } });
  const sqliMod3 = await prisma.module.create({ data: { id: crypto.randomUUID(), courseId: sqliCourseId, title: 'Himoyalanish Usullari', order: 3 } });

  const lessons = [
    { slug: 'http-nima', moduleId: httpMod1.id, title: 'HTTP nima?', contentMdx: `# HTTP nima?

HTTP (HyperText Transfer Protocol) - bu internet orqali ma'lumotlarni uzatish uchun ishlatiladigan asosiy protokollardan biridir.

## Qanday ishlaydi?
Mijoz (Client) serverga so'rov (Request) yuboradi va server javob (Response) qaytaradi.

\`\`\`http
GET / HTTP/1.1
Host: cybertrip.uz
\`\`\`
    `, xpReward: 50, estimatedMinutes: 15, status: ContentStatus.PUBLISHED, order: 1 },
    { slug: 'http-metodlar', moduleId: httpMod1.id, title: 'HTTP Metodlari', contentMdx: `# HTTP Metodlari\nEng ko'p ishlatiladigan metodlar: GET, POST, PUT, DELETE...`, xpReward: 50, estimatedMinutes: 20, status: ContentStatus.PUBLISHED, order: 2 },
    { slug: 'http-status-kodlar', moduleId: httpMod1.id, title: 'Status Kodlari', contentMdx: `# Status Kodlari\n200 OK, 404 Not Found, 500 Internal Server Error...`, xpReward: 50, estimatedMinutes: 15, status: ContentStatus.PUBLISHED, order: 3 },
    
    { slug: 'cookie-asoslari', moduleId: httpMod2.id, title: 'Cookie Nima?', contentMdx: `# Cookie\nServer mijoz brauzerida saqlaydigan kichik ma'lumotlar...`, xpReward: 75, estimatedMinutes: 20, status: ContentStatus.PUBLISHED, order: 1 },
    { slug: 'sessiya-boshqaruvi', moduleId: httpMod2.id, title: 'Sessiyalarni Boshqarish', contentMdx: `# Sessiyalar\nFoydalanuvchi holatini saqlash texnikalari...`, xpReward: 75, estimatedMinutes: 25, status: ContentStatus.PUBLISHED, order: 2 },
  ];

  for (const lesson of lessons) {
    await prisma.lesson.upsert({
      where: { slug: lesson.slug },
      update: { ...lesson },
      create: { id: crypto.randomUUID(), ...lesson },
    });
  }

  // === LABS ===
  console.log('Seeding labs...');
  const labs = [
    { slug: 'sqli-cyberbooks', title: 'SQL Injection - CyberBooks', category: LabCategory.SQL_INJECTION, difficulty: Difficulty.BEGINNER, estimatedMinutes: 45, xpReward: 200, targetApp: 'cyberbooks' },
    { slug: 'blind-sqli', title: 'Blind SQL Injection', category: LabCategory.SQL_INJECTION, difficulty: Difficulty.INTERMEDIATE, estimatedMinutes: 60, xpReward: 300 },
    { slug: 'stored-xss-cyberforum', title: 'Stored XSS - CyberForum', category: LabCategory.XSS, difficulty: Difficulty.BEGINNER, estimatedMinutes: 30, xpReward: 150, targetApp: 'cyberforum' },
    { slug: 'reflected-xss', title: 'Reflected XSS', category: LabCategory.XSS, difficulty: Difficulty.INTERMEDIATE, estimatedMinutes: 45, xpReward: 250 },
    { slug: 'dom-xss', title: 'DOM-based XSS', category: LabCategory.XSS, difficulty: Difficulty.ADVANCED, estimatedMinutes: 60, xpReward: 350 },
    { slug: 'idor-securedocs', title: 'IDOR - SecureDocs', category: LabCategory.IDOR, difficulty: Difficulty.BEGINNER, estimatedMinutes: 30, xpReward: 200, targetApp: 'securedocs' },
    { slug: 'ssrf-sitepreview', title: 'SSRF - SitePreview', category: LabCategory.SSRF, difficulty: Difficulty.INTERMEDIATE, estimatedMinutes: 45, xpReward: 300, targetApp: 'site-preview' },
    { slug: 'xxe-reportmanager', title: 'XXE - ReportManager', category: LabCategory.XXE, difficulty: Difficulty.INTERMEDIATE, estimatedMinutes: 45, xpReward: 300, targetApp: 'report-manager' },
    { slug: 'ssti-invoicebuilder', title: 'SSTI - InvoiceBuilder', category: LabCategory.SSTI, difficulty: Difficulty.ADVANCED, estimatedMinutes: 60, xpReward: 400, targetApp: 'invoice-builder' },
    { slug: 'file-upload-mediavault', title: 'File Upload - MediaVault', category: LabCategory.FILE_UPLOAD, difficulty: Difficulty.INTERMEDIATE, estimatedMinutes: 45, xpReward: 250, targetApp: 'media-vault' },
    { slug: 'path-traversal-filemanager', title: 'Path Traversal - FileManager', category: LabCategory.PATH_TRAVERSAL, difficulty: Difficulty.BEGINNER, estimatedMinutes: 30, xpReward: 200, targetApp: 'file-manager' },
    { slug: 'command-injection-diagnostic', title: 'Command Injection - DiagnosticPanel', category: LabCategory.COMMAND_INJECTION, difficulty: Difficulty.INTERMEDIATE, estimatedMinutes: 45, xpReward: 300, targetApp: 'diagnostic-panel' },
    { slug: 'jwt-bypass-api', title: 'JWT Bypass - API Gateway', category: LabCategory.JWT, difficulty: Difficulty.ADVANCED, estimatedMinutes: 60, xpReward: 400, targetApp: 'api-gateway' },
    { slug: 'auth-bypass-secureauth', title: 'Authentication Bypass - SecureAuth', category: LabCategory.AUTHENTICATION, difficulty: Difficulty.BEGINNER, estimatedMinutes: 30, xpReward: 200, targetApp: 'secure-auth' },
    { slug: 'business-logic-shopflow', title: 'Business Logic - ShopFlow', category: LabCategory.BUSINESS_LOGIC, difficulty: Difficulty.ADVANCED, estimatedMinutes: 60, xpReward: 400, targetApp: 'shop-flow' },
    { slug: 'race-condition-flashsale', title: 'Race Condition - FlashSale', category: LabCategory.RACE_CONDITION, difficulty: Difficulty.EXPERT, estimatedMinutes: 90, xpReward: 500, targetApp: 'flash-sale' },
    { slug: 'graphql-introspection', title: 'GraphQL Introspection', category: LabCategory.GRAPHQL, difficulty: Difficulty.INTERMEDIATE, estimatedMinutes: 45, xpReward: 250, targetApp: 'graphql-explorer' },
    { slug: 'websocket-injection', title: 'WebSocket Injection', category: LabCategory.WEBSOCKET, difficulty: Difficulty.ADVANCED, estimatedMinutes: 60, xpReward: 350, targetApp: 'realtime-support' },
    { slug: 'cors-misconfig', title: 'CORS Misconfiguration', category: LabCategory.CORS, difficulty: Difficulty.BEGINNER, estimatedMinutes: 30, xpReward: 150 },
    { slug: 'csrf-token-bypass', title: 'CSRF Token Bypass', category: LabCategory.CSRF, difficulty: Difficulty.INTERMEDIATE, estimatedMinutes: 45, xpReward: 250 },
    { slug: 'open-redirect', title: 'Open Redirect', category: LabCategory.OPEN_REDIRECT, difficulty: Difficulty.BEGINNER, estimatedMinutes: 20, xpReward: 100 },
    { slug: 'security-headers', title: 'Security Headers Analysis', category: LabCategory.MISCONFIGURATION, difficulty: Difficulty.BEGINNER, estimatedMinutes: 20, xpReward: 100 },
    { slug: 'cookie-security', title: 'Cookie Security Testing', category: LabCategory.MISCONFIGURATION, difficulty: Difficulty.BEGINNER, estimatedMinutes: 25, xpReward: 150 },
    { slug: 'password-reset-vuln', title: 'Password Reset Vulnerability', category: LabCategory.AUTHENTICATION, difficulty: Difficulty.INTERMEDIATE, estimatedMinutes: 45, xpReward: 300 },
    { slug: 'mass-assignment', title: 'Mass Assignment', category: LabCategory.BUSINESS_LOGIC, difficulty: Difficulty.INTERMEDIATE, estimatedMinutes: 40, xpReward: 250 },
    { slug: 'linux-permissions', title: 'Linux File Permissions', category: LabCategory.LINUX, difficulty: Difficulty.BEGINNER, estimatedMinutes: 30, xpReward: 150 },
    { slug: 'linux-processes', title: 'Linux Process Analysis', category: LabCategory.LINUX, difficulty: Difficulty.INTERMEDIATE, estimatedMinutes: 45, xpReward: 200 },
    { slug: 'network-packets', title: 'Network Packet Analysis', category: LabCategory.NETWORKING, difficulty: Difficulty.INTERMEDIATE, estimatedMinutes: 60, xpReward: 300 },
    { slug: 'log-analysis', title: 'Log Analysis - Forensics', category: LabCategory.FORENSICS, difficulty: Difficulty.INTERMEDIATE, estimatedMinutes: 45, xpReward: 250 },
    { slug: 'steganography-hidden', title: 'Steganography - Hidden Data', category: LabCategory.FORENSICS, difficulty: Difficulty.BEGINNER, estimatedMinutes: 30, xpReward: 150 }
  ];

  for (const lab of labs) {
    const labData = {
      ...lab,
      description: `Ushbu laboratoriyada ${lab.title} bo'yicha amaliy ko'nikmalarga ega bo'lasiz.`,
      briefing: `Tizimga kiring va zaiflikni topib, undan foydalaning.`,
      objectives: [
        { title: 'Zaiflikni aniqlash', description: 'Tizimdagi zaif nuqtani toping' },
        { title: 'Ekspluatatsiya qilish', description: 'Zaiflikdan foydalanib tizimga kiring' }
      ],
      status: ContentStatus.PUBLISHED,
    };
    
    await prisma.lab.upsert({
      where: { slug: lab.slug },
      update: labData,
      create: { id: crypto.randomUUID(), ...labData }
    });
  }

  // === CTF CHALLENGES ===
  console.log('Seeding CTF challenges...');
  const ctfs = [
    { slug: 'web-login-bypass', title: 'Login Bypass', category: CTFCategory.WEB, difficulty: Difficulty.BEGINNER, initialPoints: 100, minPoints: 50, flagHash: await bcrypt.hash('FLAG{admin_bypass_success}', 10) },
    { slug: 'web-cookie-monster', title: 'Cookie Monster', category: CTFCategory.WEB, difficulty: Difficulty.BEGINNER, initialPoints: 150, minPoints: 100, flagHash: await bcrypt.hash('FLAG{yummy_admin_cookies}', 10) },
    { slug: 'web-sql-master', title: 'SQL Master', category: CTFCategory.WEB, difficulty: Difficulty.INTERMEDIATE, initialPoints: 200, minPoints: 150, flagHash: await bcrypt.hash('FLAG{union_based_sqli_win}', 10) },
    { slug: 'web-xss-hunter', title: 'XSS Hunter', category: CTFCategory.WEB, difficulty: Difficulty.INTERMEDIATE, initialPoints: 250, minPoints: 200, flagHash: await bcrypt.hash('FLAG{stored_xss_alert_1}', 10) },
    { slug: 'web-jwt-cracker', title: 'JWT Cracker', category: CTFCategory.WEB, difficulty: Difficulty.ADVANCED, initialPoints: 300, minPoints: 250, flagHash: await bcrypt.hash('FLAG{jwt_weak_secret_cracked}', 10) },
    { slug: 'crypto-caesar', title: 'Caesar Cipher', category: CTFCategory.CRYPTO, difficulty: Difficulty.BEGINNER, initialPoints: 100, minPoints: 50, flagHash: await bcrypt.hash('FLAG{hail_caesar}', 10) },
    { slug: 'crypto-base64', title: 'Base64 Chain', category: CTFCategory.CRYPTO, difficulty: Difficulty.BEGINNER, initialPoints: 100, minPoints: 50, flagHash: await bcrypt.hash('FLAG{base64_is_not_encryption}', 10) },
    { slug: 'crypto-rsa', title: 'RSA Basics', category: CTFCategory.CRYPTO, difficulty: Difficulty.INTERMEDIATE, initialPoints: 250, minPoints: 200, flagHash: await bcrypt.hash('FLAG{rsa_modulus_factored}', 10) },
    { slug: 'forensics-hidden', title: 'Hidden Message', category: CTFCategory.FORENSICS, difficulty: Difficulty.BEGINNER, initialPoints: 100, minPoints: 50, flagHash: await bcrypt.hash('FLAG{stego_master}', 10) },
    { slug: 'forensics-memory', title: 'Memory Dump', category: CTFCategory.FORENSICS, difficulty: Difficulty.INTERMEDIATE, initialPoints: 200, minPoints: 150, flagHash: await bcrypt.hash('FLAG{volatility_is_awesome}', 10) },
    { slug: 'linux-find-flag', title: 'Find The Flag', category: CTFCategory.LINUX, difficulty: Difficulty.BEGINNER, initialPoints: 100, minPoints: 50, flagHash: await bcrypt.hash('FLAG{grep_is_your_friend}', 10) },
    { slug: 'linux-privesc', title: 'Privilege Escalation', category: CTFCategory.LINUX, difficulty: Difficulty.ADVANCED, initialPoints: 350, minPoints: 300, flagHash: await bcrypt.hash('FLAG{root_dance}', 10) },
    { slug: 'network-pcap', title: 'Packet Analysis', category: CTFCategory.NETWORK, difficulty: Difficulty.INTERMEDIATE, initialPoints: 200, minPoints: 150, flagHash: await bcrypt.hash('FLAG{wireshark_shark}', 10) },
    { slug: 'osint-social', title: 'Social Footprint', category: CTFCategory.OSINT, difficulty: Difficulty.BEGINNER, initialPoints: 150, minPoints: 100, flagHash: await bcrypt.hash('FLAG{osint_detective}', 10) },
    { slug: 'misc-qr', title: 'QR Code Puzzle', category: CTFCategory.MISC, difficulty: Difficulty.BEGINNER, initialPoints: 100, minPoints: 50, flagHash: await bcrypt.hash('FLAG{qr_scanned_successfully}', 10) },
  ];

  for (const ctf of ctfs) {
    const ctfData = {
      ...ctf,
      description: `Ushbu CTF topshirig'ida ${ctf.title} mavzusi bo'yicha bilimlaringizni sinab ko'ring.`,
      isActive: true,
      flagType: FlagType.STATIC
    };
    
    await prisma.cTFChallenge.upsert({
      where: { slug: ctf.slug },
      update: ctfData,
      create: { id: crypto.randomUUID(), ...ctfData }
    });
  }

  // === KNOWLEDGE ARTICLES ===
  console.log('Seeding articles...');
  const articles = [
    { slug: 'xss-nima', title: 'XSS (Cross-Site Scripting) Nima?', category: 'Web Security', content: `XSS haqida batafsil ma'lumot... Bu erda ko'plab matn bo'ladi. XSS bu eng ko'p tarqalgan veb zaifliklardan biridir.`, summary: 'XSS hujumlariga umumiy ta\'rif.', tags: ['xss', 'web', 'security'] },
    { slug: 'linux-fayl-huquqlari', title: 'Linux fayl huquqlari tizimi', category: 'Linux', content: `Linuxda chmod, chown kabi buyruqlar yordamida fayl huquqlarini boshqarish... Bu xavfsizlik uchun juda muhimdir.`, summary: 'Linux fayl ruxsatlari haqida asosiy bilimlar.', tags: ['linux', 'permissions'] },
    { slug: 'sql-injection-asoslari', title: 'SQL Injection Asoslari', category: 'Web Security', content: `SQL Injection ma'lumotlar bazasi bilan ishlaydigan ilovalardagi asosiy xavflardan biridir... Uni oldini olish uchun tayyorlangan so'rovlar ishlatiladi.`, summary: 'SQL Injection nima va qanday himoyalanish kerak.', tags: ['sqli', 'database'] },
    { slug: 'nmap-bilan-tanishuv', title: 'Nmap orqali portlarni skanerlash', category: 'Networking', content: `Nmap - bu tarmoqdagi qurilmalar va ochiq portlarni aniqlash uchun ajoyib vosita... Uning ko'plab parametrlari mavjud.`, summary: 'Nmap vositasi bilan tanishuv.', tags: ['nmap', 'network'] },
    { slug: 'kriptografiya-tarixi', title: 'Kriptografiyaning qisqacha tarixi', category: 'Cryptography', content: `Qadimgi Rimdan to zamonaviy kvant kriptografiyasigacha... Ma'lumotni yashirish san'ati juda qadimiy.`, summary: 'Kriptografiya tarixi haqida qisqacha.', tags: ['crypto', 'history'] },
    { slug: 'ctf-musobaqalari', title: 'CTF Musobaqalari haqida', category: 'CTF', content: `Capture The Flag (CTF) - bu axborot xavfsizligi bo'yicha musobaqalar... Ularda ishtirok etish ko'nikmalarni oshiradi.`, summary: 'CTF musobaqalari nima?', tags: ['ctf', 'learning'] },
    { slug: 'wireshark-qollanma', title: 'Wireshark yordamida tarmoqni tahlil qilish', category: 'Networking', content: `Wireshark tarmoq paketlarini tahlil qiluvchi dastur... U orqali muammolarni va hujumlarni aniqlash mumkin.`, summary: 'Wiresharkdan foydalanish asoslari.', tags: ['network', 'wireshark'] },
    { slug: 'parollarni-saqlash', title: 'Parollarni xavfsiz saqlash', category: 'Cryptography', content: `Parollarni hech qachon ochiq matn ko'rinishida saqlamaslik kerak... Hashlash va salt qo'shish usullari zarur.`, summary: 'Parollarni hashlash amaliyoti.', tags: ['passwords', 'hash'] },
    { slug: 'osint-nima', title: 'OSINT va ochiq manbalar bilan ishlash', category: 'OSINT', content: `OSINT (Open Source Intelligence) - ochiq ma'lumotlar asosida razvedka olib borish... Internetda hamma narsa bor.`, summary: 'OSINT tushunchasi.', tags: ['osint', 'recon'] },
    { slug: 'owasp-top-10', title: 'OWASP Top 10 nima?', category: 'Web Security', content: `OWASP Top 10 eng jiddiy veb ilovalar xavflari ro'yxati... Bu standart sifatida qabul qilingan.`, summary: 'OWASP Top 10 haqida tushuncha.', tags: ['owasp', 'web'] },
  ];

  for (const article of articles) {
    const articleData = {
      ...article,
      difficulty: Difficulty.BEGINNER,
      readingTimeMinutes: 10,
      authorId: admin.id,
      status: ContentStatus.PUBLISHED,
    };
    await prisma.knowledgeArticle.upsert({
      where: { slug: article.slug },
      update: articleData,
      create: { id: crypto.randomUUID(), ...articleData }
    });
  }

  // === GLOSSARY TERMS ===
  console.log('Seeding glossary...');
  const terms = [
    { term: 'API', definition: 'Application Programming Interface - dasturlar o\'rtasida ma\'lumot almashish interfeysi.' },
    { term: 'BOLA', definition: 'Broken Object Level Authorization - obyekt darajasidagi ruxsatlarning buzilishi zaifligi.' },
    { term: 'CORS', definition: 'Cross-Origin Resource Sharing - boshqa domendagi manbalarga ruxsat beruvchi xavfsizlik mexanizmi.' },
    { term: 'CSRF', definition: 'Cross-Site Request Forgery - foydalanuvchi nomidan uning xohishisiz so\'rov yuborish hujumi.' },
    { term: 'CSP', definition: 'Content Security Policy - XSS kabi hujumlardan himoya qiluvchi xavfsizlik sarlavhasi.' },
    { term: 'CVE', definition: 'Common Vulnerabilities and Exposures - ma\'lum bo\'lgan zaifliklarning standartlashtirilgan ro\'yxati.' },
    { term: 'DNS', definition: 'Domain Name System - domen nomlarini IP manzillarga o\'giruvchi tizim.' },
    { term: 'Exploit', definition: 'Zaiflikdan foydalanib hujum qilish uchun yozilgan kod yoki harakatlar ketma-ketligi.' },
    { term: 'Firewall', definition: 'Tarmoq trafigini filtrlash va ruxsatsiz kirishlarning oldini olish qurilmasi yoki dasturi.' },
    { term: 'HTTP', definition: 'HyperText Transfer Protocol - web sahifalarni uzatish protokoli.' },
    { term: 'HTTPS', definition: 'HTTP Secure - shifrlangan HTTP versiyasi (TLS yordamida).' },
    { term: 'IDOR', definition: 'Insecure Direct Object Reference - xavfsiz bo\'lmagan obyekt havolasi zaifligi.' },
    { term: 'JWT', definition: 'JSON Web Token - xavfsiz axborot uzatish uchun ishlatiladigan standart.' },
    { term: 'Malware', definition: 'Zararli dasturiy ta\'minot (viruslar, troyanlar, va h.k.).' },
    { term: 'MITM', definition: 'Man-in-the-Middle - ikki tomon o\'rtasidagi aloqani yashirin ushlab turish va o\'zgartirish hujumi.' },
    { term: 'OSINT', definition: 'Open Source Intelligence - ochiq manbalardan ma\'lumot yig\'ish va tahlil qilish.' },
    { term: 'OWASP', definition: 'Open Web Application Security Project - veb xavfsizligiga bag\'ishlangan ochiq loyiha.' },
    { term: 'Payload', definition: 'Hujum amalga oshirilganda ishga tushuvchi va asosiy vazifani bajaruvchi kod qismi.' },
    { term: 'Phishing', definition: 'Ijtimoiy muhandislik yordamida foydalanuvchilarning maxfiy ma\'lumotlarini o\'g\'irlash.' },
    { term: 'Ransomware', definition: 'Foydalanuvchi ma\'lumotlarini shifrlab, ularni qayta tiklash uchun to\'lov talab qiluvchi zararli dastur.' },
    { term: 'RBAC', definition: 'Role-Based Access Control - foydalanuvchining roliga asoslangan ruxsatlarni boshqarish.' },
    { term: 'REST', definition: 'Representational State Transfer - veb xizmatlar yaratish uchun arxitektura stili.' },
    { term: 'SIEM', definition: 'Security Information and Event Management - xavfsizlik hodisalarini monitoring va tahlil qilish tizimi.' },
    { term: 'SQL Injection', definition: 'Ma\'lumotlar bazasi so\'rovlariga ruxsatsiz SQL kod kiritish orqali qilinadigan hujum.' },
    { term: 'SSRF', definition: 'Server-Side Request Forgery - server nomidan ruxsatsiz so\'rovlar yuborish hujumi.' },
    { term: 'SSTI', definition: 'Server-Side Template Injection - shablon dvigateliga zararli kod kiritish zaifligi.' },
    { term: 'TLS', definition: 'Transport Layer Security - internet orqali xavfsiz aloqa o\'rnatish protokoli.' },
    { term: 'VPN', definition: 'Virtual Private Network - umumiy tarmoq ustida xavfsiz va shifrlangan ulanish.' },
    { term: 'XSS', definition: 'Cross-Site Scripting - veb sahifalarga zararli mijoz tomoni skriptlarini kiritish hujumi.' },
    { term: 'XXE', definition: 'XML External Entity - XML tahlilchisiga tashqi ob\'ektlarni kiritish orqali qilinadigan hujum.' },
  ];

  for (const term of terms) {
    const slug = term.term.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await prisma.glossaryTerm.upsert({
      where: { slug: slug },
      update: { ...term, status: ContentStatus.PUBLISHED },
      create: { id: crypto.randomUUID(), slug, ...term, status: ContentStatus.PUBLISHED }
    });
  }

  // === ACHIEVEMENTS ===
  console.log('Seeding achievements...');
  const achievements = [
    { code: 'first_lesson', title: 'Birinchi Qadam', description: 'First lesson completed', xpReward: 50 },
    { code: 'first_lab', title: 'Laboratoriya Kashfiyotchisi', description: 'First lab completed', xpReward: 100 },
    { code: 'first_ctf', title: 'CTF Jangchisi', description: 'First CTF flag', xpReward: 150 },
    { code: 'five_labs', title: 'Laboratoriya Ustasi', description: '5 labs completed', xpReward: 200 },
    { code: 'ten_labs', title: 'Laboratoriya Mutaxassisi', description: '10 labs completed', xpReward: 500 },
    { code: 'twenty_five_labs', title: 'Laboratoriya Professori', description: '25 labs completed', xpReward: 1000 },
    { code: 'streak_7', title: 'Haftalik Izchillik', description: '7 day streak', xpReward: 200 },
    { code: 'streak_30', title: 'Oylik Izchillik', description: '30 day streak', xpReward: 1000 },
    { code: 'hundred_lessons', title: 'Bilim Izlovchisi', description: '100 lessons completed', xpReward: 1000 },
    { code: 'web_pentest_path', title: 'Web Pentest Yo\'li', description: 'Complete web pentest path', xpReward: 500 },
    { code: 'first_blood', title: 'Birinchi Qon', description: 'First blood on CTF', xpReward: 300 },
    { code: 'quiz_master', title: 'Test Ustasi', description: 'Pass 10 quizzes', xpReward: 250 },
    { code: 'level_10', title: '10-daraja', description: 'Reach level 10', xpReward: 500 },
    { code: 'xp_1000', title: 'Ming XP', description: 'Earn 1000 XP', xpReward: 100 },
    { code: 'all_sqli_labs', title: 'SQL Injection Mutaxassisi', description: 'Complete all SQLi labs', xpReward: 750 },
  ];

  for (const ach of achievements) {
    await prisma.achievement.upsert({
      where: { code: ach.code },
      update: { ...ach },
      create: { id: crypto.randomUUID(), ...ach }
    });
  // === PLANS & SUBSCRIPTIONS ===
  console.log('Seeding plans...');
  const plans = [
    {
      code: 'FREE',
      name: 'Boshlang\'ich (Free)',
      description: 'Kiberxavfsizlik asoslarini o\'rganish va platformani sinash uchun bepul tarif',
      priceMonthly: 0,
      priceAnnual: 0,
      interval: 'monthly',
      isActive: true,
      order: 1,
      limits: { maxActiveLabs: 1, monthlyTerminalHours: 2, unlimitedLabs: false, proTournaments: false },
    },
    {
      code: 'PRO',
      name: 'Mutaxassis (Pro)',
      description: 'Barcha laboratoriyalar, cheksiz terminal va eksklyuziv turnirlarga to\'liq kirish',
      priceMonthly: 149000,
      priceAnnual: 1490000,
      interval: 'monthly',
      isActive: true,
      order: 2,
      limits: { maxActiveLabs: 3, monthlyTerminalHours: 9999, unlimitedLabs: true, proTournaments: true },
    },
    {
      code: 'PREMIUM',
      name: 'Kiber Elita (Premium)',
      description: 'Shaxsiy mentorlik, 0-day va Bug Bounty laboratoriyalari hamda ishga joylashish kafolati',
      priceMonthly: 349000,
      priceAnnual: 3490000,
      interval: 'monthly',
      isActive: true,
      order: 3,
      limits: { maxActiveLabs: 10, monthlyTerminalHours: 9999, unlimitedLabs: true, proTournaments: true, mentorship: true },
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { code: plan.code },
      update: { ...plan },
      create: { id: crypto.randomUUID(), ...plan },
    });
  }

  // === TOURNAMENTS ===
  console.log('Seeding tournaments...');
  const tournaments = [
    {
      slug: 'toshkent-kiber-qalqon-2026',
      title: 'Toshkent Kiber Qalqon CTF 2026',
      description: 'O\'zbekistonning eng yirik milliy kiberxavfsizlik turniri. Web pentest, reverse engineering va tarmoq xavfsizligi bo\'yicha amaliy topshiriqlar.',
      startDate: new Date('2026-10-10T10:00:00Z'),
      endDate: new Date('2026-10-12T22:00:00Z'),
      registrationDeadline: new Date('2026-10-09T23:59:59Z'),
      status: TournamentStatus.ONGOING,
      maxParticipants: 200,
      rules: '1. Fair play. 2. Flag sharing qat\'iyan taqiqlanadi. 3. Platforma serverlariga DDoS qilish mumkin emas.',
      prizePool: '15,000,000 so\'m',
      isTeamBased: true,
      isPremiumOnly: false,
    },
    {
      slug: 'web-pentest-cup-2026',
      title: 'Web Pentest Master Cup 2026',
      description: 'Faqatgina murakkab Web xavfsizlik zaifliklari (SQLi, SSRF, IDOR, Race Condition, JWT exploitlari) bo\'yicha maxsus individual chempionat.',
      startDate: new Date('2026-10-25T14:00:00Z'),
      endDate: new Date('2026-10-26T20:00:00Z'),
      registrationDeadline: new Date('2026-10-24T23:59:59Z'),
      status: TournamentStatus.REGISTRATION_OPEN,
      maxParticipants: 150,
      rules: 'Shaxsiy ishtirok. Barcha vazifalar Web Pentest yo\'nalishida.',
      prizePool: '7,500,000 so\'m',
      isTeamBased: false,
      isPremiumOnly: false,
    },
    {
      slug: 'spring-ctf-open-2026',
      title: 'CyberTrip Spring Open CTF',
      description: 'Bahorgi ochiq CTF musobaqasi. Barcha darajadagi ishtirokchilar uchun mo\'ljallangan Jeopardy uslubidagi kiber bellashuv.',
      startDate: new Date('2026-05-01T10:00:00Z'),
      endDate: new Date('2026-05-02T22:00:00Z'),
      registrationDeadline: new Date('2026-04-30T23:59:59Z'),
      status: TournamentStatus.CONCLUDED,
      maxParticipants: 500,
      rules: 'Ochiq qoidalar. Barcha darajadagi talabalar uchun.',
      prizePool: '5,000,000 so\'m',
      isTeamBased: false,
      isPremiumOnly: false,
    },
  ];

  for (const t of tournaments) {
    await prisma.tournament.upsert({
      where: { slug: t.slug },
      update: { ...t },
      create: { id: crypto.randomUUID(), ...t },
    });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
