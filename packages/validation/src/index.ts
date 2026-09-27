// ============================================
// CYBERTRIP.UZ — Shared Validation Schemas (Zod)
// ============================================

import { z } from 'zod';

// ── Auth Validation ──

export const loginSchema = z.object({
  email: z
    .string()
    .email('Yaroqli email manzil kiriting')
    .min(1, 'Email kiritilishi shart'),
  password: z
    .string()
    .min(1, 'Parol kiritilishi shart'),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Foydalanuvchi nomi kamida 3 ta belgi bo\'lishi kerak')
    .max(30, 'Foydalanuvchi nomi 30 ta belgidan oshmasligi kerak')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Faqat harf, raqam, - va _ belgilar ruxsat etilgan'),
  email: z
    .string()
    .email('Yaroqli email manzil kiriting'),
  password: z
    .string()
    .min(8, 'Parol kamida 8 ta belgi bo\'lishi kerak')
    .regex(/[A-Z]/, 'Kamida bitta katta harf bo\'lishi kerak')
    .regex(/[a-z]/, 'Kamida bitta kichik harf bo\'lishi kerak')
    .regex(/[0-9]/, 'Kamida bitta raqam bo\'lishi kerak'),
  displayName: z
    .string()
    .min(2, 'Ism kamida 2 ta belgi bo\'lishi kerak')
    .max(50, 'Ism 50 ta belgidan oshmasligi kerak'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Joriy parolni kiriting'),
  newPassword: z
    .string()
    .min(8, 'Yangi parol kamida 8 ta belgi bo\'lishi kerak')
    .regex(/[A-Z]/, 'Kamida bitta katta harf bo\'lishi kerak')
    .regex(/[a-z]/, 'Kamida bitta kichik harf bo\'lishi kerak')
    .regex(/[0-9]/, 'Kamida bitta raqam bo\'lishi kerak'),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Parollar mos kelmaydi',
  path: ['confirmPassword'],
});

// ── Profile Validation ──

export const updateProfileSchema = z.object({
  displayName: z.string().min(2).max(50).optional(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional().nullable(),
});

// ── Quiz Submission ──

export const quizSubmissionSchema = z.object({
  quizId: z.string().uuid(),
  answers: z.record(
    z.string().uuid(), // questionId
    z.union([z.string(), z.array(z.string())]) // single or multiple answer IDs
  ),
});

// ── Lab Evidence ──

export const labEvidenceSchema = z.object({
  objectiveIndex: z.number().int().min(0),
  evidenceType: z.enum(['extracted_data', 'payload', 'screenshot', 'flag', 'command_output']),
  evidenceData: z.string().min(1, 'Dalil ma\'lumotlari kerak').max(10000),
});

// ── CTF Flag Submission ──

export const ctfFlagSubmissionSchema = z.object({
  flag: z
    .string()
    .min(1, 'Flag kiritilishi shart')
    .max(200, 'Flag juda uzun'),
});

// ── Contact Form ──

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Ismingizni kiriting').max(100),
  email: z.string().email('Yaroqli email kiriting'),
  subject: z.string().min(1, 'Mavzuni tanlang'),
  message: z.string().min(10, 'Xabar kamida 10 ta belgi bo\'lishi kerak').max(2000),
});

// ── Search ──

export const searchQuerySchema = z.object({
  q: z.string().min(2, 'Kamida 2 ta belgi kiriting').max(100),
  category: z.enum(['all', 'courses', 'lessons', 'labs', 'articles', 'glossary']).optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(50).optional().default(20),
});

// ── Pagination ──

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

// ── Admin Content ──

export const createCourseSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().min(10).max(2000),
  learningPathId: z.string().uuid(),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  estimatedHours: z.number().min(1).max(1000),
  prerequisites: z.string().optional(),
  order: z.number().int().min(0),
});

export const createLessonSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/),
  moduleId: z.string().uuid(),
  contentMdx: z.string().min(10),
  summary: z.string().max(500).optional(),
  estimatedMinutes: z.number().int().min(1).max(480),
  xpReward: z.number().int().min(0).max(1000).optional().default(50),
  order: z.number().int().min(0),
});

export const createLabSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().min(10),
  briefing: z.string().min(10),
  category: z.enum([
    'SQL_INJECTION', 'XSS', 'IDOR', 'SSRF', 'XXE', 'SSTI',
    'PATH_TRAVERSAL', 'FILE_UPLOAD', 'COMMAND_INJECTION',
    'AUTHENTICATION', 'JWT', 'BUSINESS_LOGIC', 'RACE_CONDITION',
    'GRAPHQL', 'WEBSOCKET', 'CORS', 'CSRF', 'OPEN_REDIRECT',
    'MISCONFIGURATION', 'LINUX', 'NETWORKING', 'FORENSICS',
    'OSINT', 'CRYPTOGRAPHY',
  ]),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  estimatedMinutes: z.number().int().min(5).max(480),
  xpReward: z.number().int().min(0).max(5000),
  targetApp: z.string().min(1),
  objectives: z.array(z.object({
    title: z.string(),
    description: z.string(),
  })).min(1),
  prerequisites: z.string().optional(),
});

export const createCTFChallengeSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().min(10),
  category: z.enum(['WEB', 'CRYPTO', 'FORENSICS', 'LINUX', 'NETWORK', 'OSINT', 'REVERSE_ENGINEERING', 'MISC']),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  initialPoints: z.number().int().min(50).max(5000),
  minPoints: z.number().int().min(10).max(1000),
  decayFactor: z.number().int().min(5).max(500),
  flag: z.string().min(1), // Will be hashed before storage
});

// ── Type Exports ──

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type QuizSubmissionInput = z.infer<typeof quizSubmissionSchema>;
export type LabEvidenceInput = z.infer<typeof labEvidenceSchema>;
export type CTFFlagSubmissionInput = z.infer<typeof ctfFlagSubmissionSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type SearchQueryInput = z.infer<typeof searchQuerySchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type CreateLessonInput = z.infer<typeof createLessonSchema>;
export type CreateLabInput = z.infer<typeof createLabSchema>;
export type CreateCTFChallengeInput = z.infer<typeof createCTFChallengeSchema>;
