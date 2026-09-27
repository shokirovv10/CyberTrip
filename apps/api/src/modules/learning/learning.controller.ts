import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { LearningService } from './learning.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';

@Controller('learning')
@UseGuards(JwtAuthGuard)
export class LearningController {
  constructor(private readonly learningService: LearningService) {}

  @Get('paths')
  @Public()
  getPaths() {
    return this.learningService.getPaths();
  }

  @Get('paths/:slug')
  @Public()
  getPath(@Param('slug') slug: string) {
    return this.learningService.getPath(slug);
  }

  @Get('courses/:slug')
  @Public()
  getCourse(@Param('slug') slug: string) {
    return this.learningService.getCourse(slug);
  }

  @Get('lessons/:slug')
  @Public()
  getLesson(@Param('slug') slug: string) {
    return this.learningService.getLesson(slug);
  }

  @Post('lessons/:id/complete')
  completeLesson(@Param('id') id: string, @CurrentUser() user: any) {
    return this.learningService.completeLesson(id, user.id);
  }

  @Post('quizzes/:id/submit')
  submitQuiz(@Param('id') id: string, @Body('answers') answers: any, @CurrentUser() user: any) {
    return this.learningService.submitQuiz(id, answers, user.id);
  }
}
