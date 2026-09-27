import { Controller, Get, Param } from '@nestjs/common';
import { KnowledgeService } from './knowledge.service';
import { Public } from '../../common/decorators/public.decorator';

@Controller('knowledge')
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  @Get('articles')
  @Public()
  getArticles() {
    return this.knowledgeService.getArticles();
  }

  @Get('articles/:slug')
  @Public()
  getArticle(@Param('slug') slug: string) {
    return this.knowledgeService.getArticle(slug);
  }
}
