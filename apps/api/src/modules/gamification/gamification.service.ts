import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class GamificationService {
  constructor(private prisma: PrismaService) {}

  async awardXp(userId: string, amount: number, reason: string) {
    // In real app, write XP transaction and update user total XP
    // Formula: level = floor(0.1 * sqrt(totalXp)) + 1
    const user = { xp: 1000 }; // Mock
    const newXp = user.xp + amount;
    const newLevel = Math.floor(0.1 * Math.sqrt(newXp)) + 1;
    
    return {
      awardedXp: amount,
      newTotal: newXp,
      level: newLevel,
      leveledUp: newLevel > Math.floor(0.1 * Math.sqrt(user.xp)) + 1
    };
  }
}
