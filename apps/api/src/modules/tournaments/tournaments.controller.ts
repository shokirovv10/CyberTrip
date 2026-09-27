import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('tournaments')
@UseGuards(JwtAuthGuard)
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Get()
  @Public()
  getTournaments(@Query('status') status?: string) {
    return this.tournamentsService.getTournaments(status);
  }

  @Get('my')
  getMyTournaments(@CurrentUser() user: any) {
    const userId = user?.id || 'demo-user-id';
    return this.tournamentsService.getUserTournaments(userId);
  }

  @Get(':id')
  @Public()
  getTournament(@Param('id') id: string) {
    return this.tournamentsService.getTournamentById(id);
  }

  @Post(':id/register')
  register(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() body: { teamName?: string; inviteCode?: string },
  ) {
    const userId = user?.id || 'demo-user-id';
    return this.tournamentsService.register(id, userId, body);
  }

  @Get(':id/scoreboard')
  @Public()
  getScoreboard(@Param('id') id: string) {
    return this.tournamentsService.getScoreboard(id);
  }

  @Post(':id/submit')
  submitFlag(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() body: { challengeId: string; flag: string },
  ) {
    const userId = user?.id || 'demo-user-id';
    return this.tournamentsService.submitFlag(id, body.challengeId, userId, body.flag);
  }

  @Get(':id/announcements')
  @Public()
  getAnnouncements(@Param('id') id: string) {
    return this.tournamentsService.getAnnouncements(id);
  }
}
