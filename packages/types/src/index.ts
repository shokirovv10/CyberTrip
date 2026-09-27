// ============================================
// CYBERTRIP.UZ — Shared TypeScript Types
// ============================================

// ── Enums ──

export enum Role {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN',
}

export enum Difficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}

export enum ContentStatus {
  DRAFT = 'DRAFT',
  REVIEW = 'REVIEW',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum LabCategory {
  SQL_INJECTION = 'SQL_INJECTION',
  XSS = 'XSS',
  IDOR = 'IDOR',
  SSRF = 'SSRF',
  XXE = 'XXE',
  SSTI = 'SSTI',
  PATH_TRAVERSAL = 'PATH_TRAVERSAL',
  FILE_UPLOAD = 'FILE_UPLOAD',
  COMMAND_INJECTION = 'COMMAND_INJECTION',
  AUTHENTICATION = 'AUTHENTICATION',
  JWT = 'JWT',
  BUSINESS_LOGIC = 'BUSINESS_LOGIC',
  RACE_CONDITION = 'RACE_CONDITION',
  GRAPHQL = 'GRAPHQL',
  WEBSOCKET = 'WEBSOCKET',
  CORS = 'CORS',
  CSRF = 'CSRF',
  OPEN_REDIRECT = 'OPEN_REDIRECT',
  MISCONFIGURATION = 'MISCONFIGURATION',
  LINUX = 'LINUX',
  NETWORKING = 'NETWORKING',
  FORENSICS = 'FORENSICS',
  OSINT = 'OSINT',
  CRYPTOGRAPHY = 'CRYPTOGRAPHY',
}

export enum LabSessionStatus {
  CREATED = 'CREATED',
  STARTING = 'STARTING',
  RUNNING = 'RUNNING',
  EVIDENCE_REQUIRED = 'EVIDENCE_REQUIRED',
  VALIDATING = 'VALIDATING',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
  RESET = 'RESET',
}

export enum CTFCategory {
  WEB = 'WEB',
  CRYPTO = 'CRYPTO',
  FORENSICS = 'FORENSICS',
  LINUX = 'LINUX',
  NETWORK = 'NETWORK',
  OSINT = 'OSINT',
  REVERSE_ENGINEERING = 'REVERSE_ENGINEERING',
  MISC = 'MISC',
}

export enum XPSource {
  LESSON_COMPLETE = 'LESSON_COMPLETE',
  QUIZ_PASS = 'QUIZ_PASS',
  LAB_COMPLETE = 'LAB_COMPLETE',
  CTF_FLAG = 'CTF_FLAG',
  FIRST_BLOOD = 'FIRST_BLOOD',
  DAILY_STREAK = 'DAILY_STREAK',
  ACHIEVEMENT = 'ACHIEVEMENT',
  COURSE_COMPLETE = 'COURSE_COMPLETE',
  PATH_COMPLETE = 'PATH_COMPLETE',
}

export enum QuestionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  SHORT_ANSWER = 'SHORT_ANSWER',
}

export enum CertificateType {
  COURSE = 'COURSE',
  PATH = 'PATH',
  PROFESSIONAL = 'PROFESSIONAL',
}

export enum CertificateStatus {
  ACTIVE = 'ACTIVE',
  REVOKED = 'REVOKED',
  EXPIRED = 'EXPIRED',
}

export enum NotificationType {
  ACHIEVEMENT = 'ACHIEVEMENT',
  COURSE_UPDATE = 'COURSE_UPDATE',
  LAB_COMPLETE = 'LAB_COMPLETE',
  CTF_EVENT = 'CTF_EVENT',
  SYSTEM = 'SYSTEM',
  CERTIFICATE = 'CERTIFICATE',
}

// ── User Types ──

export interface UserPublic {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  role: Role;
  level: number;
  totalXp: number;
}

export interface UserProfile extends UserPublic {
  email: string;
  bio: string | null;
  currentStreak: number;
  longestStreak: number;
  createdAt: string;
}

export interface UserDashboard {
  user: UserProfile;
  gamification: {
    totalXp: number;
    level: number;
    xpToNextLevel: number;
    currentStreak: number;
    longestStreak: number;
  };
  currentPath: LearningPathSummary | null;
  currentCourse: CourseSummary | null;
  activeLabs: LabSessionSummary[];
  recentAchievements: AchievementUnlock[];
  recentActivity: ActivityItem[];
  recommendedNext: RecommendedItem | null;
}

// ── Learning Types ──

export interface LearningPathSummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  difficulty: Difficulty;
  estimatedHours: number;
  courseCount: number;
  lessonCount: number;
  progress: number; // 0-100
}

export interface LearningPathDetail extends LearningPathSummary {
  courses: CourseSummary[];
  prerequisites: string[];
}

export interface CourseSummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedHours: number;
  moduleCount: number;
  lessonCount: number;
  progress: number;
}

export interface CourseDetail extends CourseSummary {
  prerequisites: string;
  modules: ModuleSummary[];
  relatedLabs: LabSummary[];
}

export interface ModuleSummary {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: LessonSummary[];
  progress: number;
}

export interface LessonSummary {
  id: string;
  slug: string;
  title: string;
  estimatedMinutes: number;
  xpReward: number;
  completed: boolean;
  order: number;
}

export interface LessonDetail extends LessonSummary {
  contentMdx: string;
  summary: string;
  relatedLabs: LabSummary[];
  quiz: QuizSummary | null;
  nextLesson: LessonSummary | null;
  previousLesson: LessonSummary | null;
}

export interface QuizSummary {
  id: string;
  title: string;
  questionCount: number;
  passingScore: number;
  timeLimit: number | null;
  xpReward: number;
  bestScore: number | null;
  passed: boolean;
}

export interface QuizDetail extends QuizSummary {
  questions: QuizQuestionDisplay[];
}

export interface QuizQuestionDisplay {
  id: string;
  questionText: string;
  questionType: QuestionType;
  answers: QuizAnswerDisplay[];
  points: number;
}

export interface QuizAnswerDisplay {
  id: string;
  answerText: string;
  // isCorrect is NEVER sent to client before submission
}

export interface QuizSubmission {
  quizId: string;
  answers: Record<string, string | string[]>; // questionId -> answerId(s)
}

export interface QuizResult {
  score: number;
  passed: boolean;
  xpAwarded: number;
  correctAnswers: Record<string, string[]>;
  explanations: Record<string, string>;
}

// ── Lab Types ──

export interface LabSummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: LabCategory;
  difficulty: Difficulty;
  estimatedMinutes: number;
  xpReward: number;
  completed: boolean;
  targetApp: string;
}

export interface LabDetail extends LabSummary {
  briefing: string;
  objectives: LabObjective[];
  prerequisites: string;
  relatedLessons: LessonSummary[];
}

export interface LabObjective {
  index: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface LabSessionSummary {
  id: string;
  labId: string;
  labTitle: string;
  status: LabSessionStatus;
  startedAt: string;
  expiresAt: string;
  environmentUrl: string | null;
  objectivesCompleted: number;
  objectivesTotal: number;
}

export interface LabSessionDetail extends LabSessionSummary {
  lab: LabDetail;
  objectives: LabObjective[];
  evidence: LabEvidenceItem[];
}

export interface LabEvidenceItem {
  objectiveIndex: number;
  evidenceType: string;
  evidenceData: string;
  submittedAt: string;
  validated: boolean;
}

export interface LabValidationResult {
  success: boolean;
  objectiveResults: {
    index: number;
    passed: boolean;
    feedback: string;
  }[];
  xpAwarded: number;
  completed: boolean;
}

// ── CTF Types ──

export interface CTFChallengeSummary {
  id: string;
  slug: string;
  title: string;
  category: CTFCategory;
  difficulty: Difficulty;
  points: number;
  solveCount: number;
  solved: boolean;
}

export interface CTFChallengeDetail extends CTFChallengeSummary {
  description: string;
  hints: CTFHint[];
  files: CTFFile[];
  maxAttempts: number | null;
  attemptsUsed: number;
}

export interface CTFHint {
  id: string;
  cost: number;
  content: string | null; // null if not yet revealed
  revealed: boolean;
}

export interface CTFFile {
  name: string;
  url: string;
  size: number;
}

export interface CTFSubmissionResult {
  correct: boolean;
  pointsAwarded: number;
  isFirstBlood: boolean;
  message: string;
}

export interface CTFEventSummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  participantCount: number;
  challengeCount: number;
}

export interface CTFScoreboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatarUrl: string | null;
  totalPoints: number;
  solveCount: number;
  lastSolveAt: string | null;
}

// ── Gamification Types ──

export interface AchievementDisplay {
  id: string;
  code: string;
  title: string;
  description: string;
  iconUrl: string;
  category: string;
  xpReward: number;
  unlocked: boolean;
  unlockedAt: string | null;
}

export interface AchievementUnlock {
  achievement: AchievementDisplay;
  unlockedAt: string;
}

export interface RankingEntry {
  rank: number;
  userId: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  level: number;
  totalXp: number;
  completedLabs: number;
  ctfPoints: number;
  achievementCount: number;
}

// ── Certificate Types ──

export interface CertificateSummary {
  id: string;
  title: string;
  certificateType: CertificateType;
  recipientName: string;
  issueDate: string;
  verificationId: string;
  status: CertificateStatus;
}

export interface CertificateVerification {
  valid: boolean;
  certificate: CertificateSummary | null;
  courseName: string | null;
  pathName: string | null;
}

// ── Knowledge Types ──

export interface KnowledgeArticleSummary {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  difficulty: Difficulty;
  readingTimeMinutes: number;
  authorName: string;
  publishedAt: string;
  tags: string[];
}

export interface KnowledgeArticleDetail extends KnowledgeArticleSummary {
  content: string;
  relatedArticles: KnowledgeArticleSummary[];
  relatedLabs: LabSummary[];
}

// ── Glossary Types ──

export interface GlossaryTermSummary {
  id: string;
  slug: string;
  term: string;
  definition: string;
  category: string;
}

export interface GlossaryTermDetail extends GlossaryTermSummary {
  relatedTerms: GlossaryTermSummary[];
}

// ── Search Types ──

export interface SearchResults {
  courses: CourseSummary[];
  lessons: LessonSummary[];
  labs: LabSummary[];
  articles: KnowledgeArticleSummary[];
  glossary: GlossaryTermSummary[];
  total: number;
}

// ── Activity Types ──

export interface ActivityItem {
  id: string;
  type: 'lesson_complete' | 'lab_complete' | 'ctf_solve' | 'achievement' | 'quiz_pass';
  title: string;
  description: string;
  xpEarned: number;
  timestamp: string;
}

export interface RecommendedItem {
  type: 'lesson' | 'lab' | 'ctf';
  id: string;
  slug: string;
  title: string;
  description: string;
  reason: string;
}

// ── API Response Types ──

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ── Auth Types ──

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  displayName: string;
}

export interface AuthResponse {
  user: UserProfile;
  message: string;
}

// ── Notification Types ──

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  link: string | null;
  isRead: boolean;
  createdAt: string;
}
