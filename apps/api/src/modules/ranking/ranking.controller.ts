import { Controller, Get } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Public } from '../../common/decorators/public.decorator';

@Controller('ranking')
@Public()
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  getGlobalRanking() {
    return this.rankingService.getGlobalRanking();
  }

  @Get('weekly')
  getWeeklyRanking() {
    return this.rankingService.getWeeklyRanking();
  }

  @Get('ctf')
  getCtfRanking() {
    return this.rankingService.getCtfRanking();
  }
}
