import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('teams')
@UseGuards(JwtAuthGuard)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  @Public()
  getTeams(@Query('search') search?: string) {
    return this.teamsService.getTeams(search);
  }

  @Get(':slug')
  @Public()
  getTeam(@Param('slug') slug: string) {
    return this.teamsService.getTeamBySlug(slug);
  }

  @Post()
  createTeam(
    @CurrentUser() user: any,
    @Body()
    body: {
      name: string;
      slug: string;
      description?: string;
      avatarUrl?: string;
      isPrivate?: boolean;
    },
  ) {
    const userId = user?.id || 'demo-user-id';
    return this.teamsService.createTeam(userId, body);
  }

  @Post('join')
  joinTeam(@CurrentUser() user: any, @Body() body: { inviteCode: string }) {
    const userId = user?.id || 'demo-user-id';
    return this.teamsService.joinTeam(userId, body.inviteCode);
  }

  @Post(':teamId/leave')
  leaveTeam(@Param('teamId') teamId: string, @CurrentUser() user: any) {
    const userId = user?.id || 'demo-user-id';
    return this.teamsService.leaveTeam(userId, teamId);
  }

  @Patch(':teamId/members/:targetUserId/role')
  updateRole(
    @Param('teamId') teamId: string,
    @Param('targetUserId') targetUserId: string,
    @CurrentUser() user: any,
    @Body() body: { newRole: 'ADMIN' | 'MEMBER' },
  ) {
    const requesterId = user?.id || 'demo-user-id';
    return this.teamsService.updateMemberRole(requesterId, teamId, targetUserId, body.newRole);
  }
}
