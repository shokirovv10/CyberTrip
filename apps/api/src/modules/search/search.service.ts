import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(query: string) {
    // Mock search across different models
    return {
      courses: [],
      lessons: [],
      labs: [],
      articles: [],
      glossary: [],
    };
  }
}
