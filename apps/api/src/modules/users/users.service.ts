import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    // Mock user response
    return {
      id,
      username: 'student1',
      xp: 1500,
      level: 4,
    };
  }

  async getProgress(id: string) {
    return {
      completedCourses: [],
      completedLabs: [],
      ctfSolves: [],
    };
  }

  async update(id: string, data: any) {
    return { id, ...data };
  }
}
