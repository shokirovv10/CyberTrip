import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class InstructorService {
  constructor(private prisma: PrismaService) {}

  private mockCohorts = [
    {
      id: 'cohort-01',
      name: 'Kiber Xavfsizlik 2026 (Guruh A-1)',
      code: 'CYBER-2026-A1',
      description: 'Axborot xavfsizligi fakulteti 3-bosqich talabalari uchun amaliy Web Pentest guruhi.',
      studentsCount: 28,
      avgProgress: 74,
      students: [
        { id: 's1', username: 'student_aziz', name: 'Azizbek Rahimov', completedLessons: 32, completedLabs: 14, quizScore: 92, lastActive: 'Bugun 11:20' },
        { id: 's2', username: 'student_dilnoza', name: 'Dilnoza Karimova', completedLessons: 28, completedLabs: 12, quizScore: 88, lastActive: 'Kecha 18:45' },
        { id: 's3', username: 'student_jasur', name: 'Jasur Bekmurodov', completedLessons: 38, completedLabs: 20, quizScore: 98, lastActive: 'Bugun 09:15' },
        { id: 's4', username: 'student_kamola', name: 'Kamola Yusupova', completedLessons: 18, completedLabs: 6, quizScore: 70, lastActive: '3 kun oldin' },
      ],
      assignments: [
        { id: 'as-01', title: 'SQL Injection: CyberBooks Bazasini Tahlil Qilish', dueAt: '2026-10-15', submissionsCount: 24, totalStudents: 28 },
        { id: 'as-02', title: 'Reflected & Stored XSS Zaifliklarini Aniqlash', dueAt: '2026-10-22', submissionsCount: 18, totalStudents: 28 },
      ],
    },
    {
      id: 'cohort-02',
      name: 'Bank Xavfsizlik Ofitserlari (CyberBank)',
      code: 'CORP-BANK-2026',
      description: 'CyberBank AT xodimlari uchun korporativ kiber-gigiyena va insidentlar tahlili kursi.',
      studentsCount: 15,
      avgProgress: 88,
      students: [
        { id: 's5', username: 'bank_shohruh', name: 'Shohruh Aliyev', completedLessons: 42, completedLabs: 22, quizScore: 96, lastActive: 'Bugun 13:00' },
      ],
      assignments: [
        { id: 'as-03', title: 'Tarmoq Paketlari va Wireshark Tahlili', dueAt: '2026-10-30', submissionsCount: 15, totalStudents: 15 },
      ],
    },
  ];

  async getDashboard(instructorId: string) {
    return {
      instructorId,
      totalStudents: 43,
      activeCohorts: 2,
      pendingReviews: 6,
      averageProgress: 79,
      recentActivity: [
        { student: 'Jasur Bekmurodov', action: 'SQL Injection laboratoriyasini muvaffaqiyatli yakunladi', time: '15 daqiqa oldin' },
        { student: 'Dilnoza Karimova', action: 'XSS testini topshirdi (92 ball)', time: '1 soat oldin' },
        { student: 'Azizbek Rahimov', action: 'Yangi dalil faylini yukladi (Evidence)', time: '2 soat oldin' },
      ],
    };
  }

  async getCohorts(instructorId: string) {
    return this.mockCohorts;
  }

  async createCohort(instructorId: string, data: { name: string; description?: string }) {
    const code = `CYBER-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const newCohort = {
      id: `cohort-${Date.now()}`,
      name: data.name,
      code,
      description: data.description || '',
      studentsCount: 0,
      avgProgress: 0,
      students: [],
      assignments: [],
    };
    this.mockCohorts.push(newCohort);
    return { success: true, message: 'Yangi o\'quv guruhi yaratildi.', cohort: newCohort };
  }

  async createAssignment(instructorId: string, cohortId: string, data: { title: string; courseId?: string; labId?: string; dueAt?: string }) {
    const cohort = this.mockCohorts.find((c) => c.id === cohortId);
    if (!cohort) throw new NotFoundException('Guruh topilmadi');

    const newAssignment = {
      id: `as-${Date.now()}`,
      title: data.title,
      dueAt: data.dueAt || '2026-11-01',
      submissionsCount: 0,
      totalStudents: cohort.studentsCount,
    };
    cohort.assignments.push(newAssignment);

    return {
      success: true,
      message: `Vazifa muvaffaqiyatli guruhga biriktirildi: "${data.title}"`,
      assignment: newAssignment,
    };
  }

  async reviewSubmission(instructorId: string, submissionId: string, score: number, feedback: string) {
    return {
      success: true,
      message: `Talaba topshirig'i baholandi: ${score} ball. Fikr-mulohaza yuborildi.`,
      submissionId,
      score,
      feedback,
    };
  }
}
