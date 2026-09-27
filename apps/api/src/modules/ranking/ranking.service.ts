import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class RankingService {
  constructor(private prisma: PrismaService) {}

  async getGlobalRanking() {
    return [];
  }

  async getWeeklyRanking() {
    return [];
  }

  async getCtfRanking() {
    return [];
  }
}
