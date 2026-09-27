export interface LevelTier {
  level: number;
  xpRequired: number;
  name: string;
  nameUz: string;
  badgeColor: string;
}

export const LEVELS: LevelTier[] = [
  { level: 1, xpRequired: 0, name: 'Newcomer', nameUz: 'Yangi Boshlovchi', badgeColor: 'text-gray-400 border-gray-600 bg-gray-800/40' },
  { level: 2, xpRequired: 500, name: 'Explorer', nameUz: 'Kashfiyotchi', badgeColor: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
  { level: 3, xpRequired: 1200, name: 'Learner', nameUz: "O'rganuvchi", badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
  { level: 4, xpRequired: 2000, name: 'Practitioner', nameUz: 'Amaliyotchi', badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
  { level: 5, xpRequired: 3500, name: 'Web Beginner', nameUz: 'Veb Havaskor', badgeColor: 'text-green-400 border-green-500/30 bg-green-500/10' },
  { level: 6, xpRequired: 5000, name: 'Security Student', nameUz: 'Xavfsizlik Talabasi', badgeColor: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' },
  { level: 7, xpRequired: 7500, name: 'Pentest Trainee', nameUz: 'Pentest Stajyor', badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
  { level: 8, xpRequired: 10000, name: 'Security Researcher', nameUz: 'Xavfsizlik Tadqiqotchisi', badgeColor: 'text-orange-400 border-orange-500/30 bg-orange-500/10' },
  { level: 9, xpRequired: 15000, name: 'Web Pentester', nameUz: 'Veb Pentester', badgeColor: 'text-rose-400 border-rose-500/30 bg-rose-500/10' },
  { level: 10, xpRequired: 22000, name: 'Advanced Researcher', nameUz: "Yetakchi Tadqiqotchi", badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
  { level: 11, xpRequired: 30000, name: 'Cyber Expert', nameUz: 'Kiber Ekspert', badgeColor: 'text-amber-300 border-amber-400/50 bg-amber-500/20 shadow-lg shadow-amber-500/10' },
];

export interface AchievementItem {
  id: string;
  code: string;
  title: string;
  description: string;
  category: 'LEARNING' | 'LAB' | 'CTF' | 'COMMUNITY' | 'STREAK';
  xpReward: number;
  icon: string;
  requiredCondition: string;
}

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach_1',
    code: 'first_lesson',
    title: 'Birinchi qadam',
    description: 'Birinchi darsni muvaffaqiyatli yakunlang',
    category: 'LEARNING',
    xpReward: 50,
    icon: '🚀',
    requiredCondition: '1-dars',
  },
  {
    id: 'ach_2',
    code: 'first_quiz',
    title: 'Birinchi Quiz',
    description: 'Birinchi test sinovidan 100% natija bilan o‘ting',
    category: 'LEARNING',
    xpReward: 50,
    icon: '📝',
    requiredCondition: '1 quiz',
  },
  {
    id: 'ach_3',
    code: 'first_lab',
    title: 'Birinchi Lab',
    description: 'Birinchi amaliy laboratoriyani muvaffaqiyatli topshiring',
    category: 'LAB',
    xpReward: 100,
    icon: '🧪',
    requiredCondition: '1 lab',
  },
  {
    id: 'ach_4',
    code: 'linux_explorer',
    title: 'Linux Explorer',
    description: 'Linux Fundamentals bo‘yicha 10 ta darsni bajaring',
    category: 'LEARNING',
    xpReward: 150,
    icon: '🐧',
    requiredCondition: '10 Linux dars',
  },
  {
    id: 'ach_5',
    code: 'web_student',
    title: 'Web Student',
    description: 'Web Pentest va OWASP bo‘yicha 20 ta darsni yakunlang',
    category: 'LEARNING',
    xpReward: 200,
    icon: '🌐',
    requiredCondition: '20 Web lesson',
  },
  {
    id: 'ach_6',
    code: 'sql_hunter',
    title: 'SQL Hunter',
    description: 'Kamida 3 ta SQL Injection laboratoriyasini to‘liq yeching',
    category: 'LAB',
    xpReward: 250,
    icon: '💉',
    requiredCondition: '3 SQLi lab',
  },
  {
    id: 'ach_7',
    code: 'xss_explorer',
    title: 'XSS Explorer',
    description: 'Kamida 3 ta XSS (Reflected, Stored, DOM) laboratoriyasini muvaffaqiyatli bajaring',
    category: 'LAB',
    xpReward: 250,
    icon: '⚡',
    requiredCondition: '3 XSS lab',
  },
  {
    id: 'ach_8',
    code: 'api_student',
    title: 'API Student',
    description: '5 ta API xavfsizligi va BOLA laboratoriyasini yakunlang',
    category: 'LAB',
    xpReward: 300,
    icon: '🔌',
    requiredCondition: '5 API lab',
  },
  {
    id: 'ach_9',
    code: 'lab_runner',
    title: 'Lab Runner',
    description: 'Platformada jami 10 ta laboratoriyani topshiring',
    category: 'LAB',
    xpReward: 300,
    icon: '🏃',
    requiredCondition: '10 lab',
  },
  {
    id: 'ach_10',
    code: 'lab_specialist',
    title: 'Lab Specialist',
    description: '25 ta amaliy laboratoriyani muvaffaqiyatli yeching',
    category: 'LAB',
    xpReward: 500,
    icon: '🔬',
    requiredCondition: '25 lab',
  },
  {
    id: 'ach_11',
    code: 'cybertrip_veteran',
    title: 'CyberTrip Veteran',
    description: '50 ta laboratoriyani zabt etib faxriy statusga erishing',
    category: 'LAB',
    xpReward: 750,
    icon: '🎖️',
    requiredCondition: '50 lab',
  },
  {
    id: 'ach_12',
    code: 'ctf_beginner',
    title: 'CTF Beginner',
    description: 'CTF musobaqasida 5 ta flagni to‘g‘ri yuboring',
    category: 'CTF',
    xpReward: 250,
    icon: '🚩',
    requiredCondition: '5 CTF',
  },
  {
    id: 'ach_13',
    code: 'ctf_specialist',
    title: 'CTF Specialist',
    description: 'CTF arenada 20 ta bayroqni qo‘lga kiriting',
    category: 'CTF',
    xpReward: 500,
    icon: '🏆',
    requiredCondition: '20 CTF',
  },
  {
    id: 'ach_14',
    code: 'learning_master',
    title: 'Learning Master',
    description: 'Barcha kurslar bo‘yicha 50 ta darsni to‘liq o‘zlashtiring',
    category: 'LEARNING',
    xpReward: 500,
    icon: '📚',
    requiredCondition: '50 lesson',
  },
  {
    id: 'ach_15',
    code: 'course_master',
    title: 'Course Master',
    description: 'Kamida 5 ta to‘liq kursni 100% natija bilan yakunlang',
    category: 'LEARNING',
    xpReward: 750,
    icon: '🎓',
    requiredCondition: '5 course',
  },
  {
    id: 'ach_16',
    code: 'knowledge_seeker',
    title: 'Knowledge Seeker',
    description: 'Bilimlar bazasidagi 25 ta tahliliy maqolani o‘qib chiqing',
    category: 'COMMUNITY',
    xpReward: 200,
    icon: '📖',
    requiredCondition: '25 article',
  },
  {
    id: 'ach_17',
    code: 'streak_7',
    title: '7 Day Streak',
    description: 'Ketma-ket 7 kun davomida dars yoki laboratoriya bajaring',
    category: 'STREAK',
    xpReward: 100,
    icon: '🔥',
    requiredCondition: '7 kun',
  },
  {
    id: 'ach_18',
    code: 'streak_30',
    title: '30 Day Streak',
    description: 'Ketma-ket 30 kun davomida faollikni uzmasdan o‘qing',
    category: 'STREAK',
    xpReward: 500,
    icon: '⚡',
    requiredCondition: '30 kun',
  },
];

export function getLevelForXp(xp: number): {
  currentLevel: LevelTier;
  nextLevel: LevelTier | null;
  progressPercent: number;
  xpRemaining: number;
} {
  let currentLevel = LEVELS[0];
  let nextLevel: LevelTier | null = LEVELS[1];

  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) {
      currentLevel = LEVELS[i];
      nextLevel = LEVELS[i + 1] || null;
      break;
    }
  }

  if (!nextLevel) {
    return {
      currentLevel,
      nextLevel: null,
      progressPercent: 100,
      xpRemaining: 0,
    };
  }

  const range = nextLevel.xpRequired - currentLevel.xpRequired;
  const inRange = xp - currentLevel.xpRequired;
  const progressPercent = Math.min(100, Math.max(0, Math.round((inRange / range) * 100)));
  const xpRemaining = Math.max(0, nextLevel.xpRequired - xp);

  return {
    currentLevel,
    nextLevel,
    progressPercent,
    xpRemaining,
  };
}
