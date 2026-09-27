import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { GamificationService } from '../gamification/gamification.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CtfService {
  constructor(
    private prisma: PrismaService,
    private gamification: GamificationService,
  ) {}

  async getChallenges() {
    return [];
  }

  async getChallenge(id: string) {
    return { id, name: 'Sample Challenge', points: 100 };
  }

  async submitFlag(challengeId: string, flag: string, userId: string) {
    // Mock: fetch challenge details and stored flag hash from DB
    const storedFlagHash = await bcrypt.hash('CTF{mock_flag}', 10); // Mock stored hash
    
    const isValid = await bcrypt.compare(flag, storedFlagHash);
    
    if (!isValid) {
      throw new BadRequestException('Invalid flag');
    }

    // Dynamic scoring formula: points = max(minPoints, initialPoints - ((initialPoints - minPoints) / decay^2) * (solves-1)^2)
    const initialPoints = 500;
    const minPoints = 50;
    const decay = 20;
    const solves = 5; // Mock number of previous solves

    const currentPoints = Math.max(
      minPoints, 
      Math.floor(initialPoints - ((initialPoints - minPoints) / Math.pow(decay, 2)) * Math.pow(solves - 1, 2))
    );

    await this.gamification.awardXp(userId, currentPoints, `CTF Challenge ${challengeId} Solved`);

    return { success: true, points: currentPoints };
  }

  async getScoreboard() {
    return [];
  }
}
