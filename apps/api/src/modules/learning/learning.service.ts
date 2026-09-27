import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { GamificationService } from '../gamification/gamification.service';

@Injectable()
export class LearningService {
  constructor(
    private prisma: PrismaService,
    private gamification: GamificationService,
  ) {}

  async getPaths() {
    return [];
  }

  async getPath(slug: string) {
    return { slug, title: 'Sample Path' };
  }

  async getCourse(slug: string) {
    return { slug, title: 'Sample Course' };
  }

  async getLesson(slug: string) {
    return { slug, title: 'Sample Lesson' };
  }

  async completeLesson(lessonId: string, userId: string) {
    await this.gamification.awardXp(userId, 10, 'Lesson Completed');
    return { success: true };
  }

  async submitQuiz(quizId: string, submittedAnswers: Record<string, string>, userId: string) {
    // SERVER-SIDE validation
    const correctAnswers: Record<string, string> = { 'q1': 'a', 'q2': 'c' }; // Mock db fetch
    let score = 0;
    const total = Object.keys(correctAnswers).length;

    for (const [qId, ans] of Object.entries(submittedAnswers)) {
      if (correctAnswers[qId] === ans) {
        score++;
      }
    }

    if (score === total) {
      await this.gamification.awardXp(userId, 50, 'Quiz Perfect Score');
    }

    return { score, total, passed: score / total >= 0.8 };
  }
}
