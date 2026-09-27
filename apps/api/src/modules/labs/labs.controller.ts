import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { LabsService } from './labs.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('labs')
@UseGuards(JwtAuthGuard)
export class LabsController {
  constructor(private readonly labsService: LabsService) {}

  @Get()
  @Public()
  getLabs(@Query('category') category?: string, @Query('difficulty') difficulty?: string) {
    return this.labsService.getLabs(category, difficulty);
  }

  @Get(':slug')
  @Public()
  getLab(@Param('slug') slug: string, @CurrentUser() user: any) {
    const userId = user?.id || 'demo-user-id';
    return this.labsService.getLab(slug, userId);
  }

  @Get(':slug/hints')
  @Public()
  getHints(@Param('slug') slug: string, @CurrentUser() user: any) {
    const userId = user?.id || 'demo-user-id';
    return this.labsService.getHints(slug, userId);
  }

  @Post(':slug/hints/:hintNum/unlock')
  @Public()
  unlockHint(
    @Param('slug') slug: string,
    @Param('hintNum') hintNum: string,
    @CurrentUser() user: any,
  ) {
    const userId = user?.id || 'demo-user-id';
    return this.labsService.unlockHint(slug, parseInt(hintNum, 10), userId);
  }

  @Post(':slug/submit')
  @Public()
  submitFlag(
    @Param('slug') slug: string,
    @Body('flag') flag: string,
    @Body('sessionId') sessionId: string,
    @CurrentUser() user: any,
    @Req() req: any,
  ) {
    const userId = user?.id || req?.ip || 'demo-user-id';
    return this.labsService.submitLabFlag(slug, flag, userId, sessionId);
  }

  @Post(':id/sessions')
  @Public()
  startSession(@Param('id') labId: string, @CurrentUser() user: any) {
    const userId = user?.id || 'demo-user-id';
    return this.labsService.startSession(labId, userId);
  }

  @Get(':id/session')
  @Public()
  getSession(@Param('id') labId: string, @CurrentUser() user: any) {
    const userId = user?.id || 'demo-user-id';
    return this.labsService.getSession(labId, userId);
  }

  @Post('sessions/:id/evidence')
  @Public()
  submitEvidence(
    @Param('id') sessionId: string,
    @CurrentUser() user: any,
    @Body() body: { objectiveId: string; evidenceData: string },
  ) {
    const userId = user?.id || 'demo-user-id';
    return this.labsService.submitEvidence(sessionId, body.objectiveId, body.evidenceData, userId);
  }

  @Post('sessions/:id/validate')
  @Public()
  validateSession(@Param('id') sessionId: string, @CurrentUser() user: any) {
    const userId = user?.id || 'demo-user-id';
    return this.labsService.validateSession(sessionId, userId);
  }

  @Post('sessions/:id/reset')
  @Public()
  resetSession(@Param('id') sessionId: string) {
    return this.labsService.resetSession(sessionId);
  }
}
