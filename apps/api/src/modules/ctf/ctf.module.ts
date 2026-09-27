import { Module } from '@nestjs/common';
import { CtfController } from './ctf.controller';
import { CtfService } from './ctf.service';
import { GamificationModule } from '../gamification/gamification.module';

@Module({
  imports: [GamificationModule],
  controllers: [CtfController],
  providers: [CtfService],
})
export class CtfModule {}
