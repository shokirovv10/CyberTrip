// ============================================
// CYBERTRIP.UZ — Internationalization (i18n)
// ============================================
// Primary: Uzbek (uz)
// Future: Russian (ru), English (en)

export type Locale = 'uz' | 'ru' | 'en';

export const defaultLocale: Locale = 'uz';

export interface TranslationSet {
  // Navigation
  nav: {
    home: string;
    learn: string;
    labs: string;
    ctf: string;
    terminal: string;
    knowledge: string;
    glossary: string;
    ranking: string;
    certificates: string;
    dashboard: string;
    admin: string;
    login: string;
    register: string;
    logout: string;
    settings: string;
    search: string;
    searchPlaceholder: string;
  };
  // Hero
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  // Common
  common: {
    loading: string;
    error: string;
    retry: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    create: string;
    back: string;
    next: string;
    previous: string;
    submit: string;
    search: string;
    filter: string;
    all: string;
    noResults: string;
    viewAll: string;
    readMore: string;
    startLearning: string;
    continue: string;
    complete: string;
    completed: string;
    inProgress: string;
    notStarted: string;
    minutes: string;
    hours: string;
    lessons: string;
    courses: string;
    modules: string;
    students: string;
    points: string;
    level: string;
    xp: string;
    streak: string;
    achievements: string;
    progress: string;
  };
  // Difficulty levels
  difficulty: {
    BEGINNER: string;
    INTERMEDIATE: string;
    ADVANCED: string;
    EXPERT: string;
  };
  // Lab categories
  labCategory: Record<string, string>;
  // CTF categories
  ctfCategory: Record<string, string>;
  // Dashboard
  dashboard: {
    welcome: string;
    myLearning: string;
    myLabs: string;
    myAchievements: string;
    continueLearning: string;
    activeLabs: string;
    recentActivity: string;
    recommendedNext: string;
    xpToNextLevel: string;
    currentStreak: string;
  };
  // Auth
  auth: {
    loginTitle: string;
    registerTitle: string;
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
    displayName: string;
    rememberMe: string;
    forgotPassword: string;
    noAccount: string;
    hasAccount: string;
    termsAgree: string;
  };
  // Labs
  labs: {
    catalog: string;
    briefing: string;
    startLab: string;
    objectives: string;
    submitEvidence: string;
    validate: string;
    completed: string;
    expired: string;
    timeRemaining: string;
    estimatedTime: string;
    prerequisites: string;
    relatedLessons: string;
    xpReward: string;
  };
  // CTF
  ctf: {
    challenges: string;
    events: string;
    scoreboard: string;
    submitFlag: string;
    flagPlaceholder: string;
    solved: string;
    unsolved: string;
    solves: string;
    firstBlood: string;
    hints: string;
    revealHint: string;
    files: string;
    attempts: string;
  };
  // Footer
  footer: {
    about: string;
    terms: string;
    privacy: string;
    acceptableUse: string;
    contact: string;
    disclaimer: string;
  };
}

export const uz: TranslationSet = {
  nav: {
    home: 'Bosh sahifa',
    learn: 'O\'rganish',
    labs: 'Laboratoriyalar',
    ctf: 'CTF',
    terminal: 'Terminal',
    knowledge: 'Bilimlar',
    glossary: 'Lug\'at',
    ranking: 'Reyting',
    certificates: 'Sertifikatlar',
    dashboard: 'Boshqaruv paneli',
    admin: 'Admin',
    login: 'Kirish',
    register: 'Ro\'yxatdan o\'tish',
    logout: 'Chiqish',
    settings: 'Sozlamalar',
    search: 'Qidirish',
    searchPlaceholder: 'Kurslar, laboratoriyalar, maqolalar qidiring...',
  },
  hero: {
    title: 'CYBERTRIP.UZ',
    subtitle: 'Professional kiberxavfsizlik ta\'limi: nazariya, amaliyot va real laboratoriyalar orqali.',
    ctaPrimary: 'O\'rganishni boshlash',
    ctaSecondary: 'Laboratoriyalar',
  },
  common: {
    loading: 'Yuklanmoqda...',
    error: 'Xatolik yuz berdi',
    retry: 'Qayta urinish',
    save: 'Saqlash',
    cancel: 'Bekor qilish',
    delete: 'O\'chirish',
    edit: 'Tahrirlash',
    create: 'Yaratish',
    back: 'Orqaga',
    next: 'Keyingi',
    previous: 'Oldingi',
    submit: 'Yuborish',
    search: 'Qidirish',
    filter: 'Filtrlash',
    all: 'Barchasi',
    noResults: 'Natija topilmadi',
    viewAll: 'Barchasini ko\'rish',
    readMore: 'Batafsil o\'qish',
    startLearning: 'O\'rganishni boshlash',
    continue: 'Davom ettirish',
    complete: 'Yakunlash',
    completed: 'Yakunlangan',
    inProgress: 'Jarayonda',
    notStarted: 'Boshlanmagan',
    minutes: 'daqiqa',
    hours: 'soat',
    lessons: 'Darslar',
    courses: 'Kurslar',
    modules: 'Modullar',
    students: 'Talabalar',
    points: 'Ball',
    level: 'Daraja',
    xp: 'XP',
    streak: 'Davomiylik',
    achievements: 'Yutuqlar',
    progress: 'Progress',
  },
  difficulty: {
    BEGINNER: 'Boshlang\'ich',
    INTERMEDIATE: 'O\'rta',
    ADVANCED: 'Yuqori',
    EXPERT: 'Ekspert',
  },
  labCategory: {
    SQL_INJECTION: 'SQL Injection',
    XSS: 'Cross-Site Scripting (XSS)',
    IDOR: 'IDOR / BOLA',
    SSRF: 'Server-Side Request Forgery',
    XXE: 'XML External Entity',
    SSTI: 'Server-Side Template Injection',
    PATH_TRAVERSAL: 'Path Traversal',
    FILE_UPLOAD: 'Fayl yuklash zaifligi',
    COMMAND_INJECTION: 'Command Injection',
    AUTHENTICATION: 'Autentifikatsiya',
    JWT: 'JWT xavfsizligi',
    BUSINESS_LOGIC: 'Biznes logika',
    RACE_CONDITION: 'Race Condition',
    GRAPHQL: 'GraphQL xavfsizligi',
    WEBSOCKET: 'WebSocket xavfsizligi',
    CORS: 'CORS noto\'g\'ri sozlanishi',
    CSRF: 'Cross-Site Request Forgery',
    OPEN_REDIRECT: 'Open Redirect',
    MISCONFIGURATION: 'Xavfsizlik konfiguratsiyasi',
    LINUX: 'Linux',
    NETWORKING: 'Tarmoq',
    FORENSICS: 'Raqamli kriminalistika',
    OSINT: 'OSINT',
    CRYPTOGRAPHY: 'Kriptografiya',
  },
  ctfCategory: {
    WEB: 'Web',
    CRYPTO: 'Kriptografiya',
    FORENSICS: 'Kriminalistika',
    LINUX: 'Linux',
    NETWORK: 'Tarmoq',
    OSINT: 'OSINT',
    REVERSE_ENGINEERING: 'Reverse Engineering',
    MISC: 'Boshqa',
  },
  dashboard: {
    welcome: 'Xush kelibsiz',
    myLearning: 'Mening o\'rganishlarim',
    myLabs: 'Mening laboratoriyalarim',
    myAchievements: 'Mening yutuqlarim',
    continueLearning: 'O\'rganishni davom ettirish',
    activeLabs: 'Faol laboratoriyalar',
    recentActivity: 'So\'nggi faoliyat',
    recommendedNext: 'Tavsiya etilgan keyingi qadam',
    xpToNextLevel: 'Keyingi darajagacha',
    currentStreak: 'Joriy davomiylik',
  },
  auth: {
    loginTitle: 'Tizimga kirish',
    registerTitle: 'Ro\'yxatdan o\'tish',
    email: 'Email',
    password: 'Parol',
    confirmPassword: 'Parolni tasdiqlang',
    username: 'Foydalanuvchi nomi',
    displayName: 'Ismingiz',
    rememberMe: 'Eslab qolish',
    forgotPassword: 'Parolni unutdingizmi?',
    noAccount: 'Hisobingiz yo\'qmi?',
    hasAccount: 'Hisobingiz bormi?',
    termsAgree: 'Foydalanish shartlari va Maxfiylik siyosatiga roziman',
  },
  labs: {
    catalog: 'Laboratoriyalar katalogi',
    briefing: 'Laboratoriya briflingi',
    startLab: 'Laboratoriyani boshlash',
    objectives: 'Maqsadlar',
    submitEvidence: 'Dalil yuborish',
    validate: 'Tekshirish',
    completed: 'Yakunlangan',
    expired: 'Muddati tugagan',
    timeRemaining: 'Qolgan vaqt',
    estimatedTime: 'Taxminiy vaqt',
    prerequisites: 'Oldindan tayyorgarlik',
    relatedLessons: 'Tegishli darslar',
    xpReward: 'XP mukofot',
  },
  ctf: {
    challenges: 'Topshiriqlar',
    events: 'Tadbirlar',
    scoreboard: 'Natijalar jadvali',
    submitFlag: 'Flag yuborish',
    flagPlaceholder: 'FLAG{...}',
    solved: 'Yechilgan',
    unsolved: 'Yechilmagan',
    solves: 'Yechimlar',
    firstBlood: 'Birinchi yechim',
    hints: 'Maslahatlar',
    revealHint: 'Maslahatni ochish',
    files: 'Fayllar',
    attempts: 'Urinishlar',
  },
  footer: {
    about: 'Biz haqimizda',
    terms: 'Foydalanish shartlari',
    privacy: 'Maxfiylik siyosati',
    acceptableUse: 'Maqbul foydalanish siyosati',
    contact: 'Bog\'lanish',
    disclaimer: 'Ushbu platforma faqat ta\'lim maqsadlarida yaratilgan. Barcha laboratoriyalar va mashg\'ulotlar faqat maxsus yaratilgan ta\'lim muhitlarida amalga oshiriladi. Real tizimlarni ruxsatsiz sinash taqiqlanadi.',
  },
};

// Translation getter
export function t(locale: Locale = defaultLocale): TranslationSet {
  switch (locale) {
    case 'uz':
      return uz;
    default:
      return uz; // Fallback to Uzbek
  }
}
