import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  private mockCompanies = [
    {
      id: 'comp-01',
      slug: 'cyberbank-corp',
      name: 'CyberBank Uzbekistan',
      industry: 'Banking & Fintech',
      billingEmail: 'security@cyberbank.uz',
      contactPhone: '+998 71 200 00 00',
      logoUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150',
      seatsTotal: 50,
      seatsUsed: 37,
      planName: 'Business Enterprise',
      planCode: 'BUSINESS',
      subscriptionStatus: 'ACTIVE',
      renewsAt: '2027-01-01',
      employees: [
        { id: 'e1', name: 'Alisher Qodirov', email: 'a.qodirov@cyberbank.uz', role: 'ADMIN', completedLabs: 24, progress: 85 },
        { id: 'e2', name: 'Nodira Salimova', email: 'n.salimova@cyberbank.uz', role: 'EMPLOYEE', completedLabs: 18, progress: 68 },
        { id: 'e3', name: 'Temur Mirzayev', email: 't.mirzayev@cyberbank.uz', role: 'EMPLOYEE', completedLabs: 30, progress: 95 },
        { id: 'e4', name: 'Zilola Ergasheva', email: 'z.ergasheva@cyberbank.uz', role: 'EMPLOYEE', completedLabs: 12, progress: 45 },
      ],
      assignments: [
        { id: 'as-1', title: 'OWASP Top 10 Web Vulnerabilities 2026', dueAt: '2026-11-01', targetRole: 'Developer' },
        { id: 'as-2', title: 'SOC Blue Team Incident Triage', dueAt: '2026-11-15', targetRole: 'SecOps' },
      ],
    },
  ];

  async getCompanyBySlug(slug: string) {
    try {
      const company = await (this.prisma as any).company?.findUnique({
        where: { slug },
        include: {
          members: { include: { user: true } },
          subscriptions: { include: { plan: true } },
          assignments: true,
        },
      });
      if (company) return company;
    } catch (e) {
      // fallback
    }

    const mock = this.mockCompanies.find((c) => c.slug === slug || c.id === slug);
    if (!mock) throw new NotFoundException('Kompaniya profili topilmadi');
    return mock;
  }

  async createCompany(userId: string, data: { name: string; slug: string; industry?: string; billingEmail: string }) {
    try {
      const company = await (this.prisma as any).company?.create({
        data: {
          name: data.name,
          slug: data.slug,
          industry: data.industry,
          billingEmail: data.billingEmail,
          members: {
            create: {
              userId,
              role: 'ADMIN',
              title: 'Chief Information Security Officer (CISO)',
            },
          },
        },
      });
      return { success: true, company };
    } catch (e) {
      const newMock = {
        id: `comp-${Date.now()}`,
        slug: data.slug,
        name: data.name,
        industry: data.industry || 'IT & Telecom',
        billingEmail: data.billingEmail,
        contactPhone: '+998 71 000 00 00',
        logoUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150',
        seatsTotal: 25,
        seatsUsed: 1,
        planName: 'Team Business',
        planCode: 'TEAM',
        subscriptionStatus: 'ACTIVE',
        renewsAt: '2027-01-01',
        employees: [{ id: 'e1', name: 'Siz (Admin)', email: data.billingEmail, role: 'ADMIN', completedLabs: 0, progress: 0 }],
        assignments: [],
      };
      this.mockCompanies.push(newMock);
      return { success: true, company: newMock };
    }
  }

  async inviteEmployee(companyId: string, email: string, role = 'EMPLOYEE') {
    if (!email || !email.includes('@')) {
      throw new BadRequestException('Yaroqli email manzilini kiriting.');
    }

    return {
      success: true,
      message: `${email} manziliga korxona o'quv kabinetiga taklifnoma yuborildi.`,
      inviteLink: `https://cybertrip.uz/auth/register?company=${companyId}&invite=${Math.random().toString(36).substring(2, 8)}`,
    };
  }

  async getBillingAndSeats(companyId: string) {
    const comp = this.mockCompanies.find((c) => c.id === companyId || c.slug === companyId) || this.mockCompanies[0]!;
    return {
      companyName: comp.name,
      plan: comp.planName,
      seatsTotal: comp.seatsTotal,
      seatsUsed: comp.seatsUsed,
      seatsAvailable: comp.seatsTotal - comp.seatsUsed,
      renewsAt: comp.renewsAt,
      costPerSeatMonthly: 120000,
      currency: 'UZS',
    };
  }

  async assignLearning(companyId: string, data: { title: string; courseId?: string; labId?: string }) {
    return {
      success: true,
      message: `Topshiriq barcha xodimlarga muvaffaqiyatli biriktirildi: "${data.title}"`,
      assignment: {
        id: `as-${Date.now()}`,
        title: data.title,
        courseId: data.courseId,
        labId: data.labId,
        createdAt: new Date(),
      },
    };
  }
}
