import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class GlossaryService {
  constructor(private prisma: PrismaService) {}

  async getTerms() {
    return [];
  }

  async getTerm(slug: string) {
    return { slug, definition: 'Sample definition' };
  }
}
