import { Controller, Get, Param } from '@nestjs/common';
import { GlossaryService } from './glossary.service';
import { Public } from '../../common/decorators/public.decorator';

@Controller('glossary')
export class GlossaryController {
  constructor(private readonly glossaryService: GlossaryService) {}

  @Get()
  @Public()
  getTerms() {
    return this.glossaryService.getTerms();
  }

  @Get(':slug')
  @Public()
  getTerm(@Param('slug') slug: string) {
    return this.glossaryService.getTerm(slug);
  }
}
