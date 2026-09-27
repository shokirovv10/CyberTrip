import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { CtfService } from './ctf.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';

@Controller('ctf')
@UseGuards(JwtAuthGuard)
export class CtfController {
  constructor(private readonly ctfService: CtfService) {}

  @Get('challenges')
  @Public()
  getChallenges() {
    return this.ctfService.getChallenges();
  }

  @Get('challenges/:id')
  @Public()
  getChallenge(@Param('id') id: string) {
    return this.ctfService.getChallenge(id);
  }

  @Post('challenges/:id/submit')
  submitFlag(
    @Param('id') id: string,
    @Body('flag') flag: string,
    @CurrentUser() user: any,
  ) {
    return this.ctfService.submitFlag(id, flag, user.id);
  }

  @Get('scoreboard')
  @Public()
  getScoreboard() {
    return this.ctfService.getScoreboard();
  }
}
