import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('instructor')
@UseGuards(JwtAuthGuard)
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Get('dashboard')
  getDashboard(@CurrentUser() user: any) {
    const instructorId = user?.id || 'demo-instructor';
    return this.instructorService.getDashboard(instructorId);
  }

  @Get('cohorts')
  getCohorts(@CurrentUser() user: any) {
    const instructorId = user?.id || 'demo-instructor';
    return this.instructorService.getCohorts(instructorId);
  }

  @Post('cohorts')
  createCohort(
    @CurrentUser() user: any,
    @Body() body: { name: string; description?: string },
  ) {
    const instructorId = user?.id || 'demo-instructor';
    return this.instructorService.createCohort(instructorId, body);
  }

  @Post('cohorts/:cohortId/assignments')
  createAssignment(
    @CurrentUser() user: any,
    @Param('cohortId') cohortId: string,
    @Body() body: { title: string; courseId?: string; labId?: string; dueAt?: string },
  ) {
    const instructorId = user?.id || 'demo-instructor';
    return this.instructorService.createAssignment(instructorId, cohortId, body);
  }

  @Post('submissions/:id/review')
  reviewSubmission(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() body: { score: number; feedback: string },
  ) {
    const instructorId = user?.id || 'demo-instructor';
    return this.instructorService.reviewSubmission(instructorId, id, body.score, body.feedback);
  }
}
