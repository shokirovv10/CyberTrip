import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class KnowledgeService {
  constructor(private prisma: PrismaService) {}

  async getArticles() {
    return [];
  }

  async getArticle(slug: string) {
    return { slug, content: 'Sample article content' };
  }
}
