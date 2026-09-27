import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class CertificatesService {
  constructor(private prisma: PrismaService) {}

  async getUserCertificates(userId: string) {
    return [];
  }

  async verifyCertificate(id: string) {
    return { valid: true, id, owner: 'mock user', date: new Date() };
  }
}
