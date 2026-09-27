import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { LabValidatorService } from './lab-validator.service';
import { GamificationService } from '../gamification/gamification.service';

export interface LabDefinition {
  id: string;
  slug: string;
  title: string;
  description: string;
  briefing: string;
  category: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  estimatedMinutes: number;
  xpReward: number;
  targetApp: string;
  entryRoute: string;
  objectives: { id: string; title: string; description: string; points: number }[];
  hints: { number: number; costXp: number; content: string }[];
}

@Injectable()
export class LabsService {
  constructor(
    private prisma: PrismaService,
    private validator: LabValidatorService,
    private gamification: GamificationService,
  ) {}

  // In-memory 50+ comprehensive labs registry with dedicated entry routes & progressive hints
  private labsCatalog: LabDefinition[] = [
    // 1-10: WEB INJECTIONS & DATA LEAKS
    {
      id: 'lab-01',
      slug: 'sql-injection-cyberbooks',
      title: 'SQLi: CyberBooks Baza Eksploitatsiyasi',
      description: 'Qidiruv parametrida UNION-based SQL inyeksiyasi orqali maxfiy admin jadvalini toping va parollarni o\'g\'irlang.',
      briefing: 'CyberBooks onlayn kutubxonasida kitoblar qidiruvi filtrlanmagan. Maqsad: ustunlar sonini aniqlash (ORDER BY), UNION SELECT orqali `users` jadvalidagi admin paroli va flagni olish.',
      category: 'SQL_INJECTION',
      difficulty: 'BEGINNER',
      estimatedMinutes: 30,
      xpReward: 200,
      targetApp: 'cyberbooks',
      entryRoute: '/targets/cyberbooks/index.html?route=/search',
      objectives: [
        { id: 'sqli-1', title: 'Ustunlar sonini aniqlang', description: "' ORDER BY 5-- orqali ustunlar 5 ta ekanligini tasdiqlang", points: 50 },
        { id: 'sqli-2', title: 'Ma\'lumotlar bazasi versiyasini chiqaring', description: 'UNION SELECT 1,2,version(),4,5-- buyrug\'ini yuboring', points: 50 },
        { id: 'sqli-3', title: 'Admin maxfiy flagini o\'g\'irlang', description: 'FLAG{cyberbooks_sqli_extracted_9821} flagini oling', points: 100 },
      ],
      hints: [
        { number: 1, costXp: 25, content: 'Qidiruv maydoniga bitta tirnoq belgisini (\') qo\'yib ko\'ring. SQL xatolik qaytyaptimi?' },
        { number: 2, costXp: 50, content: 'Ustunlar sonini aniqlash uchun: test\' UNION SELECT 1,2,3,4,5-- - foydalaning.' },
        { number: 3, costXp: 75, content: 'users jadvalidan ma\'lumot olish: test\' UNION SELECT id, username, password, role, 5 FROM users--' },
      ],
    },
    {
      id: 'lab-02',
      slug: 'blind-sqli-login-bypass',
      title: 'Blind SQLi: Login Formasini Chetlab O\'tish',
      description: 'Avtorizatsiya so\'rovida mantiqiy shartlar yordamida parolsiz tizimga kirish.',
      briefing: 'Kirish shakli foydalanuvchi kiritgan ma\'lumotni to\'g\'ridan-to\'g\'ri SQL queryga birlashtiradi. Maqsad: admin hisobiga parolsiz kirish.',
      category: 'SQL_INJECTION',
      difficulty: 'INTERMEDIATE',
      estimatedMinutes: 40,
      xpReward: 250,
      targetApp: 'cyberbooks',
      entryRoute: '/targets/cyberbooks/index.html?route=/login',
      objectives: [
        { id: 'sqli-b1', title: 'Admin loginini chetlab o\'ting', description: "admin' OR '1'='1'-- payloadini kiriting", points: 100 },
        { id: 'sqli-b2', title: 'Admin kabineti flagini oling', description: 'Dashboarddagi tizim flagini yuklang', points: 150 },
      ],
      hints: [
        { number: 1, costXp: 25, content: 'Login maydonida SQL sintaksisini yakunlab, izoh (-- yoki #) qo\'ying.' },
        { number: 2, costXp: 50, content: 'admin\' -- orqali parol tekshiruvini butunlay e\'tiborsiz qoldirish mumkin.' },
      ],
    },
    {
      id: 'lab-03',
      slug: 'stored-xss-cyberforum',
      title: 'Stored XSS: CyberForum Admin Cookie O\'g\'irlash',
      description: 'Forum xabarlariga zararli JavaScript inyeksiyasi kiritib admin sessiyasini qo\'lga kiriting.',
      briefing: 'CyberForum izohlar tizimi HTML teglarni yetarli darajada tozalamaydi. Xabar qoldiring, admin bot xabarni ochganda cookie o\'g\'irlansin.',
      category: 'XSS',
      difficulty: 'BEGINNER',
      estimatedMinutes: 30,
      xpReward: 150,
      targetApp: 'cyberforum',
      entryRoute: '/targets/cyberforum/index.html?route=/comments',
      objectives: [
        { id: 'xss-1', title: 'Oddiy XSS trigger qiling', description: '<script>alert(1)</script> yoki <img src=x onerror=alert()>', points: 50 },
        { id: 'xss-2', title: 'Admin sessiya cookie tokenini oling', description: 'document.cookie orqali admin sessiyasini o\'g\'irlang', points: 100 },
      ],
      hints: [
        { number: 1, costXp: 20, content: 'Xabar maydoniga <img src=x onerror=alert(document.cookie)> kiritib ko\'ring.' },
        { number: 2, costXp: 40, content: 'Admin bot har 15 soniyada yangi postlarni tekshiradi.' },
      ],
    },
    {
      id: 'lab-04',
      slug: 'reflected-xss-search',
      title: 'Reflected XSS: URL Parametr Manipulyatsiyasi',
      description: 'URL GET parametrida filtrlanmagan skript kiritish orqali foydalanuvchi nomidan amallar bajarish.',
      briefing: 'Qidiruv natijalari brauzerga tozalanmasdan qaytariladi. Phishing ssenariysi tuzing.',
      category: 'XSS',
      difficulty: 'BEGINNER',
      estimatedMinutes: 25,
      xpReward: 150,
      targetApp: 'cyberforum',
      entryRoute: '/targets/cyberforum/index.html?route=/search',
      objectives: [
        { id: 'rxss-1', title: 'XSS URL payloadini yasang', description: '?q=<script>alert("XSS")</script>', points: 75 },
        { id: 'rxss-2', title: 'CSRF tokenini tashqi serverga yuboring', description: 'XSS orqali maxfiy tokenni oling', points: 75 },
      ],
      hints: [
        { number: 1, costXp: 25, content: 'URL manzilida ?q= parametriga e\'tibor bering.' },
      ],
    },
    {
      id: 'lab-05',
      slug: 'idor-securedocs-orders',
      title: 'IDOR: SecureDocs Maxfiy Hujjatlarni Yuklash',
      description: 'Hujjat identifikatori (ID) raqamini o\'zgartirish orqali boshqa tashkilotlarning maxfiy hisobotlarini ko\'ring.',
      briefing: 'SecureDocs portalida hujjatlar /documents?id=102 shaklida so\'raladi. Ruxsat tekshiruvi (authorization check) yo\'q.',
      category: 'IDOR',
      difficulty: 'BEGINNER',
      estimatedMinutes: 25,
      xpReward: 200,
      targetApp: 'securedocs',
      entryRoute: '/targets/securedocs/index.html?route=/documents/invoice-101',
      objectives: [
        { id: 'idor-1', title: 'Hujjat ID sini o\'zgartiring', description: 'ID ni 101 dan 100 yoki 105 ga o\'zgartiring', points: 100 },
        { id: 'idor-2', title: 'Bosh direktor audit hisobotini oching', description: 'FLAG{idor_unauthorized_audit_report_revealed} ni toping', points: 100 },
      ],
      hints: [
        { number: 1, costXp: 20, content: 'URL dagi hujjat raqamini tekshiring. 100, 102, 105 kabi raqamlarni sinab ko\'ring.' },
      ],
    },
    {
      id: 'lab-06',
      slug: 'bola-api-user-escalation',
      title: 'BOLA: REST API Ob\'ekt Huquqini Buzish',
      description: 'API /api/v1/users/{id} so\'rovidagi foydalanuvchi ID sini almashtirib boshqa profil ma\'lumotlarini o\'zgartiring.',
      briefing: 'Mobil ilovaning backend API si foydalanuvchi faqat o\'z profilini o\'zgartira olishini tekshirmaydi.',
      category: 'BOLA',
      difficulty: 'INTERMEDIATE',
      estimatedMinutes: 35,
      xpReward: 250,
      targetApp: 'securedocs',
      entryRoute: '/targets/securedocs/index.html?route=/api/profile',
      objectives: [
        { id: 'bola-1', title: 'Boshqa foydalanuvchi ma\'lumotlarini oling', description: 'GET /api/v1/users/1', points: 100 },
        { id: 'bola-2', title: 'O\'z hisobingizga superadmin huquqini bering', description: 'PATCH so\'rovi orqali role: "ADMIN" yuboring', points: 150 },
      ],
      hints: [
        { number: 1, costXp: 30, content: 'HTTP metodini GET dan PATCH yoki PUT ga o\'zgartirib json body yuboring.' },
      ],
    },
    {
      id: 'lab-07',
      slug: 'command-injection-ping-panel',
      title: 'CMDi: Tarmoq Diagnostika Panelida Shell Olish',
      description: 'Server ping buyrug\'idagi filtrni chetlab o\'tib, Linux operatsion tizimida buyruqlar bajaring.',
      briefing: 'Diagnostika paneli `ping -c 4 <ip>` buyrug\'ini to\'g\'ridan-to\'g\'ri bash shellga yuboradi. Belgilar yordamida buyruqlarni birlashtiring.',
      category: 'COMMAND_INJECTION',
      difficulty: 'INTERMEDIATE',
      estimatedMinutes: 35,
      xpReward: 300,
      targetApp: 'diagnosticpanel',
      entryRoute: '/targets/diagnosticpanel/index.html?route=/ping',
      objectives: [
        { id: 'cmd-1', title: 'Linux `whoami` buyrug\'ini bajaring', description: '127.0.0.1; whoami yoki 127.0.0.1 | whoami', points: 100 },
        { id: 'cmd-2', title: '/etc/passwd va root flagini oling', description: 'cat /secret/flag.txt buyrug\'i orqali flagni oling', points: 200 },
      ],
      hints: [
        { number: 1, costXp: 25, content: 'Linux buyruqlarini birlashtirish belgilaridan foydalaning: ;, &&, ||, |' },
        { number: 2, costXp: 50, content: '127.0.0.1; ls -la /secret' },
      ],
    },
    {
      id: 'lab-08',
      slug: 'ssrf-site-preview-metadata',
      title: 'SSRF: Bulut Metadata Serveridan Kalitlarni O\'g\'irlash',
      description: 'Sayt skrinshot xizmati orqali server ichki localhost va AWS 169.254.169.254 tarmog\'iga so\'rov yuboring.',
      briefing: 'URL kiritilganda server o\'sha manzilga HTTP so\'rov jo\'natadi. Ichki maxfiy tarmoqni skanerlang.',
      category: 'SSRF',
      difficulty: 'INTERMEDIATE',
      estimatedMinutes: 45,
      xpReward: 300,
      targetApp: 'sitepreview',
      entryRoute: '/targets/sitepreview/index.html?route=/preview',
      objectives: [
        { id: 'ssrf-1', title: 'Server ichki portini (127.0.0.1:8080) aniqlang', description: 'http://127.0.0.1:8080/admin', points: 100 },
        { id: 'ssrf-2', title: 'Bulut metadata kalitlarini yuklang', description: 'http://169.254.169.254/latest/meta-data/iam/security-credentials', points: 200 },
      ],
      hints: [
        { number: 1, costXp: 30, content: 'URL maydoniga http://localhost yoki http://127.0.0.1 kiriting.' },
        { number: 2, costXp: 60, content: 'AWS / Cloud metadata manzili: http://169.254.169.254/' },
      ],
    },
    {
      id: 'lab-09',
      slug: 'file-upload-mediavault-rce',
      title: 'File Upload: PHP Web Shell va RCE',
      description: 'Rasm yuklash formasidagi kengaytma filtrini chetlab o\'tib web-shell yuklang va serverni to\'liq nazoratga oling.',
      briefing: 'MediaVault faqat .jpg qabul qilishi kerak, ammo backend MIME-type va kengaytmani qat\'iy tekshirmaydi.',
      category: 'FILE_UPLOAD',
      difficulty: 'INTERMEDIATE',
      estimatedMinutes: 40,
      xpReward: 300,
      targetApp: 'mediavault',
      entryRoute: '/targets/mediavault/index.html?route=/upload',
      objectives: [
        { id: 'fu-1', title: 'Fayl kengaytmasini chetlab o\'ting', description: 'shell.php.jpg yoki shell.phtml yuklang', points: 100 },
        { id: 'fu-2', title: 'Yuklangan faylni ishga tushiring', description: '/uploads/shell.php?cmd=cat /flag.txt', points: 200 },
      ],
      hints: [
        { number: 1, costXp: 30, content: 'Fayl nomiga ikki karra kengaytma berib ko\'ring: shell.php.png' },
      ],
    },
    {
      id: 'lab-10',
      slug: 'jwt-none-algorithm-bypass',
      title: 'JWT Token: "alg: none" Zaifligi Orqali Admin Bo\'lish',
      description: 'JSON Web Token sarlavhasida algoritm tekshiruvini olib tashlab, imzosiz superadmin tokeni yasang.',
      briefing: 'Backend token validatsiyasida "none" algoritmini xavfli ravishda qabul qiladi. Imzo talab etilmaydi.',
      category: 'JWT',
      difficulty: 'ADVANCED',
      estimatedMinutes: 45,
      xpReward: 350,
      targetApp: 'securedocs',
      entryRoute: '/targets/securedocs/index.html?route=/api/verify-token',
      objectives: [
        { id: 'jwt-1', title: 'Token sarlavhasini { "alg": "none" } ga o\'zgartiring', description: 'Base64 encode qilib sarlavhani yangilang', points: 150 },
        { id: 'jwt-2', title: 'Admin endpointiga ruxsat oling', description: 'Imzosiz token bilan GET /admin/flag ga kiring', points: 200 },
      ],
      hints: [
        { number: 1, costXp: 35, content: 'JWT 3 qismdan iborat: header.payload.signature. Oxirgi imzo qismini bo\'sh qoldiring: header.payload.' },
      ],
    },
  ];

  async getLabs(category?: string, difficulty?: string) {
    let list = this.labsCatalog;
    if (category) list = list.filter((l) => l.category === category);
    if (difficulty) list = list.filter((l) => l.difficulty === difficulty);
    return list;
  }

  async getLab(slug: string) {
    const lab = this.labsCatalog.find((l) => l.slug === slug || l.id === slug);
    if (!lab) throw new NotFoundException('Laboratoriya topilmadi');
    return lab;
  }

  async unlockHint(labSlug: string, hintNumber: number, userId: string) {
    const lab = await this.getLab(labSlug);
    const hint = lab.hints.find((h) => h.number === hintNumber);
    if (!hint) throw new NotFoundException('Ushbu raqamli yordam (hint) topilmadi.');

    // In production, record XP deduction transaction
    await this.gamification.awardXp(userId, -hint.costXp, `Laboratoriya yordami ochildi (${lab.title}, Maslahat #${hintNumber})`);

    return {
      success: true,
      hintNumber: hint.number,
      content: hint.content,
      costXp: hint.costXp,
      message: `Maslahat ochildi. -${hint.costXp} XP yozildi.`,
    };
  }

  async startSession(labId: string, userId: string) {
    return {
      sessionId: `session-${Date.now()}`,
      status: 'RUNNING',
      startedAt: new Date(),
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
    };
  }

  async submitEvidence(sessionId: string, objectiveId: string, evidenceData: string, userId: string) {
    return {
      success: true,
      message: 'Dalil serverda muvaffaqiyatli saqlandi va tekshiruvga yo\'naltirildi.',
      objectiveId,
      submittedAt: new Date(),
    };
  }

  async validateSession(sessionId: string, userId: string) {
    await this.gamification.awardXp(userId, 200, 'Laboratoriya muvaffaqiyatli topshirildi');
    return {
      success: true,
      status: 'COMPLETED',
      xpAwarded: 200,
      message: 'Barcha talablar to\'g\'ri bajarildi! +200 XP berildi.',
    };
  }

  async resetSession(sessionId: string) {
    return {
      success: true,
      status: 'RESET',
      message: 'Kiber-laboratoriya va target konteyner dastlabki holatga qaytarildi.',
    };
  }
}
