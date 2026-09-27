import { 
  PrismaClient, 
  Role, 
  Difficulty, 
  ContentStatus, 
  LabCategory, 
  CTFCategory, 
  FlagType, 
  TournamentStatus,
  QuestionType 
} from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { CURRICULUM_DATA } from '../../apps/web/src/lib/curriculum-data';
import { LABS_DATA } from '../../apps/web/src/lib/labs-data';

const prisma = new PrismaClient();

const difficultyMap: Record<string, Difficulty> = {
  beginner: Difficulty.BEGINNER,
  easy: Difficulty.BEGINNER,
  intermediate: Difficulty.INTERMEDIATE,
  medium: Difficulty.INTERMEDIATE,
  advanced: Difficulty.ADVANCED,
  hard: Difficulty.ADVANCED,
  expert: Difficulty.EXPERT,
};

const labCategoryMap: Record<string, LabCategory> = {
  SQL_INJECTION: LabCategory.SQL_INJECTION,
  XSS: LabCategory.XSS,
  CSRF: LabCategory.CSRF,
  IDOR: LabCategory.IDOR,
  API_SECURITY: LabCategory.AUTHENTICATION,
  SSRF: LabCategory.SSRF,
  XXE: LabCategory.XXE,
  SSTI: LabCategory.SSTI,
  PATH_TRAVERSAL: LabCategory.PATH_TRAVERSAL,
  FILE_UPLOAD: LabCategory.FILE_UPLOAD,
  AUTHENTICATION: LabCategory.AUTHENTICATION,
  JWT: LabCategory.JWT,
  CORS: LabCategory.CORS,
  OPEN_REDIRECT: LabCategory.OPEN_REDIRECT,
  SECURITY_HEADERS: LabCategory.MISCONFIGURATION,
  BUSINESS_LOGIC: LabCategory.BUSINESS_LOGIC,
  RACE_CONDITION: LabCategory.RACE_CONDITION,
  GRAPHQL: LabCategory.GRAPHQL,
  WEBSOCKET: LabCategory.WEBSOCKET,
  COMMAND_INJECTION: LabCategory.COMMAND_INJECTION,
  LINUX: LabCategory.LINUX,
  FORENSICS: LabCategory.FORENSICS,
  OSINT: LabCategory.OSINT,
  NETWORK: LabCategory.NETWORKING,
  NETWORKING: LabCategory.NETWORKING,
  CTF: LabCategory.MISCONFIGURATION,
  ASSESSMENT: LabCategory.MISCONFIGURATION,
  CRYPTOGRAPHY: LabCategory.CRYPTOGRAPHY,
};

function getTargetUrl(labDef: any): string {
  const app = (labDef.targetApp || '').toLowerCase();
  const cat = labDef.category || '';

  if (app.includes('order') || (cat === 'IDOR' && app.includes('order'))) {
    return '/targets/orderhub/index.html';
  } else if (app.includes('api') || cat === 'JWT' || cat === 'API_SECURITY') {
    return '/targets/cyberapi/index.html';
  } else if (app.includes('report') || cat === 'XXE') {
    return '/targets/reportmanager/index.html';
  } else if (app.includes('invoice') || cat === 'SSTI') {
    return '/targets/invoicebuilder/index.html';
  } else if (app.includes('file') || cat === 'PATH_TRAVERSAL') {
    return '/targets/filemanager/index.html';
  } else if (app.includes('shop') || cat === 'BUSINESS_LOGIC') {
    return '/targets/shopflow/index.html';
  } else if (app.includes('flash') || cat === 'RACE_CONDITION') {
    return '/targets/flashsale/index.html';
  } else if (app.includes('graphql') || cat === 'GRAPHQL') {
    return '/targets/graphql-lab/index.html';
  } else if (app.includes('support') || app.includes('realtime') || cat === 'WEBSOCKET') {
    return '/targets/realtime-support/index.html';
  } else if (app.includes('auth') || cat === 'AUTHENTICATION') {
    return '/targets/secureauth/index.html';
  } else if (app.includes('case') || cat === 'FORENSICS') {
    return '/targets/cybercase/index.html';
  } else if (app.includes('intel') || cat === 'OSINT') {
    return '/targets/inteldesk/index.html';
  } else if (app.includes('vault') || app.includes('media') || cat === 'FILE_UPLOAD') {
    return '/targets/mediavault/index.html';
  } else if (app.includes('preview') || cat === 'SSRF') {
    return '/targets/sitepreview/index.html';
  } else if (app.includes('forum') || cat === 'XSS' || cat === 'CSRF' || cat === 'CORS') {
    return '/targets/cyberforum/index.html';
  } else if (app.includes('diagnostic') || cat === 'COMMAND_INJECTION') {
    return '/targets/diagnosticpanel/index.html';
  } else if (app.includes('doc') || cat === 'IDOR') {
    return '/targets/securedocs/index.html';
  } else {
    return '/targets/cyberbooks/index.html';
  }
}

async function main() {
  console.log('🚀 Starting Master Database Seeding for CYBERTRIP.UZ...');

  // ============================================================
  // 1. USERS & AUTHENTICATION
  // ============================================================
  console.log('👤 Seeding default users...');
  const adminPassword = await bcrypt.hash('CyberTrip2024!', 10);
  const studentPassword = await bcrypt.hash('student123', 10);
  const instructorPassword = await bcrypt.hash('instructor123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@cybertrip.uz' },
    update: {
      role: Role.ADMIN,
      displayName: 'CyberTrip Admin',
      isActive: true,
      emailVerified: true,
    },
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
    update: {
      role: Role.STUDENT,
      displayName: 'Test Talaba',
      isActive: true,
      emailVerified: true,
    },
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

  const instructor = await prisma.user.upsert({
    where: { email: 'instructor@cybertrip.uz' },
    update: {
      role: Role.INSTRUCTOR,
      displayName: 'CyberTrip Bosh Murabbiy',
      isActive: true,
      emailVerified: true,
    },
    create: {
      id: crypto.randomUUID(),
      email: 'instructor@cybertrip.uz',
      username: 'instructor1',
      displayName: 'CyberTrip Bosh Murabbiy',
      role: Role.INSTRUCTOR,
      passwordHash: instructorPassword,
      isActive: true,
      emailVerified: true,
    },
  });

  console.log(`✅ Users seeded: admin (${admin.id}), student (${student.id}), instructor (${instructor.id})`);

  // ============================================================
  // 2. MASTER CURRICULUM (6 Paths, 15 Courses, 30 Modules, 172 Lessons, 172 Quizzes)
  // ============================================================
  console.log('📚 Seeding 6 Learning Paths, 15 Courses, 30 Modules, 172 Lessons & Quizzes...');

  const pathIcons: Record<string, string> = {
    'web-pentest': '🌐',
    'linux-security': '🐧',
    'network-security': '🔌',
    'cyber-fundamentals': '🛡️',
    'soc-blue-team': '🎯',
    'ctf-challenge': '🚩',
  };

  let totalPathsSeeded = 0;
  let totalCoursesSeeded = 0;
  let totalModulesSeeded = 0;
  let totalLessonsSeeded = 0;
  let totalQuizzesSeeded = 0;

  for (const [pathSlug, pathData] of Object.entries(CURRICULUM_DATA)) {
    const diff = difficultyMap[pathData.level.toLowerCase()] || Difficulty.BEGINNER;
    const icon = pathIcons[pathSlug] || '🛡️';

    const dbPath = await prisma.learningPath.upsert({
      where: { slug: pathSlug },
      update: {
        title: pathData.title,
        description: pathData.description,
        difficulty: diff,
        estimatedHours: pathData.hours,
        icon,
        status: ContentStatus.PUBLISHED,
        order: totalPathsSeeded + 1,
      },
      create: {
        id: crypto.randomUUID(),
        slug: pathSlug,
        title: pathData.title,
        description: pathData.description,
        difficulty: diff,
        estimatedHours: pathData.hours,
        icon,
        status: ContentStatus.PUBLISHED,
        order: totalPathsSeeded + 1,
      },
    });
    totalPathsSeeded++;

    // Seed Courses for this path
    let courseOrder = 1;
    for (const courseData of pathData.courses) {
      const courseDiff = difficultyMap[courseData.level.toLowerCase()] || diff;

      const dbCourse = await prisma.course.upsert({
        where: { slug: courseData.slug },
        update: {
          learningPathId: dbPath.id,
          title: courseData.title,
          description: courseData.description,
          difficulty: courseDiff,
          estimatedHours: courseData.hours,
          prerequisites: courseData.prerequisites || null,
          order: courseOrder++,
          status: ContentStatus.PUBLISHED,
        },
        create: {
          id: crypto.randomUUID(),
          slug: courseData.slug,
          learningPathId: dbPath.id,
          title: courseData.title,
          description: courseData.description,
          difficulty: courseDiff,
          estimatedHours: courseData.hours,
          prerequisites: courseData.prerequisites || null,
          order: courseOrder++,
          status: ContentStatus.PUBLISHED,
        },
      });
      totalCoursesSeeded++;

      // Seed Modules for this course
      let moduleOrder = 1;
      for (const modData of courseData.modules) {
        let dbModule = await prisma.module.findFirst({
          where: { courseId: dbCourse.id, title: modData.title },
        });

        if (!dbModule) {
          dbModule = await prisma.module.create({
            data: {
              id: crypto.randomUUID(),
              courseId: dbCourse.id,
              title: modData.title,
              description: modData.description,
              order: moduleOrder++,
            },
          });
        } else {
          dbModule = await prisma.module.update({
            where: { id: dbModule.id },
            data: {
              description: modData.description,
              order: moduleOrder++,
            },
          });
        }
        totalModulesSeeded++;

        // Seed Lessons for this module
        let lessonOrder = 1;
        for (const lessonData of modData.lessons) {
          const estimatedMins = parseInt(lessonData.duration.replace(/\D/g, ''), 10) || 20;

          const dbLesson = await prisma.lesson.upsert({
            where: {
              moduleId_slug: {
                moduleId: dbModule.id,
                slug: lessonData.slug,
              },
            },
            update: {
              title: lessonData.title,
              contentMdx: lessonData.content,
              summary: lessonData.summary || null,
              estimatedMinutes: estimatedMins,
              xpReward: lessonData.xp || lessonData.completionXp || 50,
              order: lessonOrder++,
              isPremium: !!lessonData.isPremium,
              status: ContentStatus.PUBLISHED,
            },
            create: {
              id: crypto.randomUUID(),
              moduleId: dbModule.id,
              slug: lessonData.slug,
              title: lessonData.title,
              contentMdx: lessonData.content,
              summary: lessonData.summary || null,
              estimatedMinutes: estimatedMins,
              xpReward: lessonData.xp || lessonData.completionXp || 50,
              order: lessonOrder++,
              isPremium: !!lessonData.isPremium,
              status: ContentStatus.PUBLISHED,
            },
          });
          totalLessonsSeeded++;

          // Seed Quiz if available
          if (lessonData.quiz && Array.isArray(lessonData.quiz.questions) && lessonData.quiz.questions.length > 0) {
            let dbQuiz = await prisma.quiz.findFirst({
              where: { lessonId: dbLesson.id },
            });

            if (!dbQuiz) {
              dbQuiz = await prisma.quiz.create({
                data: {
                  id: crypto.randomUUID(),
                  lessonId: dbLesson.id,
                  title: `${lessonData.title} — Bilimni tekshirish`,
                  description: `${lessonData.title} mavzusi bo'yicha interaktiv test`,
                  passingScore: lessonData.quiz.passingScore || 80,
                  xpReward: lessonData.quizXp || 25,
                },
              });
            }

            // Remove existing questions to allow clean updates
            await prisma.quizQuestion.deleteMany({
              where: { quizId: dbQuiz.id },
            });

            let qOrder = 1;
            for (const q of lessonData.quiz.questions) {
              const dbQ = await prisma.quizQuestion.create({
                data: {
                  id: crypto.randomUUID(),
                  quizId: dbQuiz.id,
                  questionText: q.question,
                  questionType: QuestionType.SINGLE_CHOICE,
                  explanation: q.explanation || null,
                  order: qOrder++,
                  points: 10,
                },
              });

              if (Array.isArray(q.options)) {
                let ansOrder = 0;
                for (const opt of q.options) {
                  await prisma.quizAnswer.create({
                    data: {
                      id: crypto.randomUUID(),
                      questionId: dbQ.id,
                      answerText: opt,
                      isCorrect: ansOrder === q.correctAnswer,
                      order: ansOrder++,
                    },
                  });
                }
              }
            }
            totalQuizzesSeeded++;
          }
        }
      }
    }
  }

  console.log(`✅ Curriculum seeded: ${totalPathsSeeded} paths, ${totalCoursesSeeded} courses, ${totalModulesSeeded} modules, ${totalLessonsSeeded} lessons, ${totalQuizzesSeeded} quizzes!`);

  // ============================================================
  // 3. MASTER LABS (60 Complete Real Vulnerable Labs)
  // ============================================================
  console.log('🧪 Seeding 60 Complete Hands-on Labs...');

  let labOrder = 1;
  for (const lab of LABS_DATA) {
    const category = labCategoryMap[lab.category] || LabCategory.MISCONFIGURATION;
    const diff = difficultyMap[lab.difficulty.toLowerCase()] || Difficulty.BEGINNER;
    const entryRoute = getTargetUrl(lab);

    const labData = {
      title: lab.title,
      description: lab.description,
      briefing: lab.briefing,
      category,
      difficulty: diff,
      estimatedMinutes: lab.estimatedMinutes || 30,
      xpReward: lab.xp || 200,
      targetApp: lab.targetApp,
      entryRoute,
      objectives: lab.objectives,
      status: ContentStatus.PUBLISHED,
      order: labOrder++,
    };

    await prisma.lab.upsert({
      where: { slug: lab.slug },
      update: labData,
      create: {
        id: crypto.randomUUID(),
        slug: lab.slug,
        ...labData,
      },
    });
  }

  console.log(`✅ All ${LABS_DATA.length} labs successfully seeded with dedicated target simulators!`);

  // ============================================================
  // 4. CTF CHALLENGES (15 Challenges)
  // ============================================================
  console.log('🚩 Seeding 15 CTF challenges...');
  const ctfs = [
    { slug: 'web-login-bypass', title: 'Login Bypass', category: CTFCategory.WEB, difficulty: Difficulty.BEGINNER, initialPoints: 100, minPoints: 50, flag: 'FLAG{admin_bypass_success}' },
    { slug: 'web-cookie-monster', title: 'Cookie Monster', category: CTFCategory.WEB, difficulty: Difficulty.BEGINNER, initialPoints: 150, minPoints: 100, flag: 'FLAG{yummy_admin_cookies}' },
    { slug: 'web-sql-master', title: 'SQL Master', category: CTFCategory.WEB, difficulty: Difficulty.INTERMEDIATE, initialPoints: 200, minPoints: 150, flag: 'FLAG{union_based_sqli_win}' },
    { slug: 'web-xss-hunter', title: 'XSS Hunter', category: CTFCategory.WEB, difficulty: Difficulty.INTERMEDIATE, initialPoints: 250, minPoints: 200, flag: 'FLAG{stored_xss_alert_1}' },
    { slug: 'web-jwt-cracker', title: 'JWT Cracker', category: CTFCategory.WEB, difficulty: Difficulty.ADVANCED, initialPoints: 300, minPoints: 250, flag: 'FLAG{jwt_weak_secret_cracked}' },
    { slug: 'crypto-caesar', title: 'Caesar Cipher', category: CTFCategory.CRYPTO, difficulty: Difficulty.BEGINNER, initialPoints: 100, minPoints: 50, flag: 'FLAG{hail_caesar}' },
    { slug: 'crypto-base64', title: 'Base64 Chain', category: CTFCategory.CRYPTO, difficulty: Difficulty.BEGINNER, initialPoints: 100, minPoints: 50, flag: 'FLAG{base64_is_not_encryption}' },
    { slug: 'crypto-rsa', title: 'RSA Basics', category: CTFCategory.CRYPTO, difficulty: Difficulty.INTERMEDIATE, initialPoints: 250, minPoints: 200, flag: 'FLAG{rsa_modulus_factored}' },
    { slug: 'forensics-hidden', title: 'Hidden Message', category: CTFCategory.FORENSICS, difficulty: Difficulty.BEGINNER, initialPoints: 100, minPoints: 50, flag: 'FLAG{stego_master}' },
    { slug: 'forensics-memory', title: 'Memory Dump', category: CTFCategory.FORENSICS, difficulty: Difficulty.INTERMEDIATE, initialPoints: 200, minPoints: 150, flag: 'FLAG{volatility_is_awesome}' },
    { slug: 'linux-find-flag', title: 'Find The Flag', category: CTFCategory.LINUX, difficulty: Difficulty.BEGINNER, initialPoints: 100, minPoints: 50, flag: 'FLAG{grep_is_your_friend}' },
    { slug: 'linux-privesc', title: 'Privilege Escalation', category: CTFCategory.LINUX, difficulty: Difficulty.ADVANCED, initialPoints: 350, minPoints: 300, flag: 'FLAG{root_dance}' },
    { slug: 'network-pcap', title: 'Packet Analysis', category: CTFCategory.NETWORK, difficulty: Difficulty.INTERMEDIATE, initialPoints: 200, minPoints: 150, flag: 'FLAG{wireshark_shark}' },
    { slug: 'osint-social', title: 'Social Footprint', category: CTFCategory.OSINT, difficulty: Difficulty.BEGINNER, initialPoints: 150, minPoints: 100, flag: 'FLAG{osint_detective}' },
    { slug: 'misc-qr', title: 'QR Code Puzzle', category: CTFCategory.MISC, difficulty: Difficulty.BEGINNER, initialPoints: 100, minPoints: 50, flag: 'FLAG{qr_scanned_successfully}' },
  ];

  for (const ctf of ctfs) {
    const flagHash = await bcrypt.hash(ctf.flag, 10);
    const ctfData = {
      title: ctf.title,
      category: ctf.category,
      difficulty: ctf.difficulty,
      initialPoints: ctf.initialPoints,
      minPoints: ctf.minPoints,
      flagHash,
      flagType: FlagType.STATIC,
      description: `Ushbu CTF topshirig'ida ${ctf.title} mavzusi bo'yicha amaliy bilimlaringizni sinab ko'ring. Flag formati: FLAG{...}.`,
      isActive: true,
    };

    await prisma.cTFChallenge.upsert({
      where: { slug: ctf.slug },
      update: ctfData,
      create: {
        id: crypto.randomUUID(),
        slug: ctf.slug,
        ...ctfData,
      },
    });
  }
  console.log(`✅ Seeded ${ctfs.length} CTF challenges!`);

  // ============================================================
  // 5. KNOWLEDGE ARTICLES (10 Articles)
  // ============================================================
  console.log('📖 Seeding 10 Knowledge Articles...');
  const articles = [
    { slug: 'xss-nima', title: 'XSS (Cross-Site Scripting) Nima?', category: 'Web Security', content: `XSS bu eng ko'p tarqalgan veb zaifliklardan biridir. Tajovuzkor veb-sahifaga zararli JavaScript kodini kiritadi va boshqa foydalanuvchilar sessiyalarini o'g'irlashi mumkin.`, summary: 'XSS hujumlariga umumiy ta\'rif va turlari.', tags: ['xss', 'web', 'security'] },
    { slug: 'linux-fayl-huquqlari', title: 'Linux fayl huquqlari tizimi', category: 'Linux', content: `Linuxda chmod, chown kabi buyruqlar yordamida r/w/x huquqlarini boshqarish axborot xavfsizligining fundamental asosi hisoblanadi.`, summary: 'Linux ruxsatlari va xavfsizlik konfiguratsiyasi.', tags: ['linux', 'permissions'] },
    { slug: 'sql-injection-asoslari', title: 'SQL Injection Asoslari', category: 'Web Security', content: `SQL Injection ma'lumotlar bazasi so'rovlariga ruxsatsiz kod qo'shish orqali bazadagi ma'lumotlarni o'qish, o'chirish yoki o'zgartirish imkonini beradi. Himoyalanish uchun Parametrized Queries (Prepared Statements) shart.`, summary: 'SQL Injection nima va qanday himoyalanish kerak.', tags: ['sqli', 'database'] },
    { slug: 'nmap-bilan-tanishuv', title: 'Nmap orqali portlarni skanerlash', category: 'Networking', content: `Nmap - bu tarmoqdagi ochiq portlar, xizmat versiyalari va OS turini aniqlash bo'yicha dunyodagi eng mashhur tarmoq razvedkasi vositasidir.`, summary: 'Nmap vositasi bilan amaliy tanishuv.', tags: ['nmap', 'network'] },
    { slug: 'kriptografiya-tarixi', title: 'Kriptografiyaning qisqacha tarixi', category: 'Cryptography', content: `Sezar shifridan tortib zamonaviy asimmetrik shifrlash (RSA, ECC) va post-kvant algoritmlarigacha bo'lgan tarixiy evolyutsiya.`, summary: 'Kriptografiya tarixi va asosiy tamoyillari.', tags: ['crypto', 'history'] },
    { slug: 'ctf-musobaqalari', title: 'CTF Musobaqalari haqida', category: 'CTF', content: `Capture The Flag (CTF) - axborot xavfsizligi bo'yicha eng samarali sport musobaqalari bo'lib, amaliy pentest va tahlil mahoratini oshiradi.`, summary: 'CTF musobaqalari nima va qanday tayyorgarlik ko\'rish kerak.', tags: ['ctf', 'learning'] },
    { slug: 'wireshark-qollanma', title: 'Wireshark yordamida tarmoqni tahlil qilish', category: 'Networking', content: `Wireshark real vaqtda tarmoq paketlarini tahlil qiluvchi vosita bo'lib, sniffing va anomaliyalarni topishda qo'llaniladi.`, summary: 'Wiresharkdan foydalanish asoslari.', tags: ['network', 'wireshark'] },
    { slug: 'parollarni-saqlash', title: 'Parollarni xavfsiz saqlash', category: 'Cryptography', content: `Parollarni hech qachon ochiq saqlamang. Argon2, bcrypt kabi sekin hash funksiyalari va kriptografik tuz (salt) qo'llash majburiydir.`, summary: 'Parollarni hashlash amaliyoti va xatolar.', tags: ['passwords', 'hash'] },
    { slug: 'osint-nima', title: 'OSINT va ochiq manbalar bilan ishlash', category: 'OSINT', content: `Open Source Intelligence (OSINT) - jamoatchilikka ochiq manbalardan razvedka ma'lumotlarini qonuniy to'plash metodologiyasidir.`, summary: 'OSINT tushunchasi va vositalari.', tags: ['osint', 'recon'] },
    { slug: 'owasp-top-10', title: 'OWASP Top 10 nima?', category: 'Web Security', content: `OWASP Top 10 - veb ilovalardagi eng xavfli 10 ta zaiflik ro'yxati (Broken Access Control, Cryptographic Failures, Injection va b.).`, summary: 'OWASP Top 10 zamonaviy tahdidlari.', tags: ['owasp', 'web'] },
  ];

  for (const a of articles) {
    const articleData = {
      title: a.title,
      content: a.content,
      summary: a.summary,
      category: a.category,
      tags: a.tags,
      difficulty: Difficulty.BEGINNER,
      readingTimeMinutes: 10,
      authorId: admin.id,
      status: ContentStatus.PUBLISHED,
    };

    await prisma.knowledgeArticle.upsert({
      where: { slug: a.slug },
      update: articleData,
      create: {
        id: crypto.randomUUID(),
        slug: a.slug,
        ...articleData,
      },
    });
  }
  console.log(`✅ Seeded ${articles.length} knowledge articles!`);

  // ============================================================
  // 6. GLOSSARY TERMS (30 Terms)
  // ============================================================
  console.log('📕 Seeding 30 Glossary Terms...');
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

  for (const t of terms) {
    const slug = t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await prisma.glossaryTerm.upsert({
      where: { slug },
      update: { ...t, status: ContentStatus.PUBLISHED },
      create: {
        id: crypto.randomUUID(),
        slug,
        ...t,
        status: ContentStatus.PUBLISHED,
      },
    });
  }
  console.log(`✅ Seeded ${terms.length} glossary terms!`);

  // ============================================================
  // 7. ACHIEVEMENTS (15 Achievements)
  // ============================================================
  console.log('🏆 Seeding 15 Achievements...');
  const achievements = [
    { code: 'first_lesson', title: 'Birinchi Qadam', description: 'Birinchi darsni yakunlash', xpReward: 50 },
    { code: 'first_lab', title: 'Laboratoriya Kashfiyotchisi', description: 'Birinchi laboratoriyani muvaffaqiyatli topshirish', xpReward: 100 },
    { code: 'first_ctf', title: 'CTF Jangchisi', description: 'Birinchi CTF bayrog\'ini qo\'lga kiritish', xpReward: 150 },
    { code: 'five_labs', title: 'Laboratoriya Ustasi', description: '5 ta laboratoriyani tamomlash', xpReward: 200 },
    { code: 'ten_labs', title: 'Laboratoriya Mutaxassisi', description: '10 ta laboratoriyani tamomlash', xpReward: 500 },
    { code: 'twenty_five_labs', title: 'Laboratoriya Professori', description: '25 ta laboratoriyani tamomlash', xpReward: 1000 },
    { code: 'streak_7', title: 'Haftalik Izchillik', description: 'Ketma-ket 7 kunlik faollik zanjiri', xpReward: 200 },
    { code: 'streak_30', title: 'Oylik Izchillik', description: 'Ketma-ket 30 kunlik faollik zanjiri', xpReward: 1000 },
    { code: 'hundred_lessons', title: 'Bilim Izlovchisi', description: '100 ta darsni muvaffaqiyatli yakunlash', xpReward: 1000 },
    { code: 'web_pentest_path', title: 'Web Pentest Yo\'li', description: 'Web Pentest to\'liq o\'quv yo\'lini bitirish', xpReward: 500 },
    { code: 'first_blood', title: 'Birinchi Qon', description: 'Turnirda eng birinchi bo\'lib topshiriqni yechish', xpReward: 300 },
    { code: 'quiz_master', title: 'Test Ustasi', description: '10 ta testdan 100% natija bilan o\'tish', xpReward: 250 },
    { code: 'level_10', title: '10-daraja', description: '10-tajriba darajasiga erishish', xpReward: 500 },
    { code: 'xp_1000', title: 'Ming XP', description: '1000 umumiy XP to\'plash', xpReward: 100 },
    { code: 'all_sqli_labs', title: 'SQL Injection Mutaxassisi', description: 'Barcha SQLi laboratoriyalarini yakunlash', xpReward: 750 },
  ];

  for (const ach of achievements) {
    await prisma.achievement.upsert({
      where: { code: ach.code },
      update: ach,
      create: {
        id: crypto.randomUUID(),
        ...ach,
      },
    });
  }
  console.log(`✅ Seeded ${achievements.length} achievements!`);

  // ============================================================
  // 8. SUBSCRIPTION PLANS
  // ============================================================
  console.log('💳 Seeding Subscription Plans...');
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
      name: 'Pentester (Pro)',
      description: 'Barcha 60 ta laboratoriya, cheksiz terminal va eksklyuziv turnirlarga to\'liq kirish',
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
      update: plan,
      create: {
        id: crypto.randomUUID(),
        ...plan,
      },
    });
  }
  console.log(`✅ Seeded ${plans.length} subscription plans!`);

  // ============================================================
  // 9. TOURNAMENTS
  // ============================================================
  console.log('🏆 Seeding Tournaments...');
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
      update: t,
      create: {
        id: crypto.randomUUID(),
        ...t,
      },
    });
  }
  console.log(`✅ Seeded ${tournaments.length} tournaments!`);

  console.log('🎉 MASTER DATABASE SEEDING COMPLETED SUCCESSFULLY!');
}

main()
  .catch((e) => {
    console.error('❌ Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
