import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

export interface PlanDto {
  id: string;
  name: string;
  code: 'FREE' | 'PRO' | 'PREMIUM' | 'TEAM' | 'BUSINESS' | 'ENTERPRISE';
  type: 'INDIVIDUAL' | 'BUSINESS';
  seatCount: number;
  priceMonthly: number;
  priceAnnual: number;
  features: string[];
  entitlements: Record<string, any>;
}

export interface PaymentProvider {
  createCardCheckout(params: {
    orderId: string;
    amount: number;
    currency: string;
    description: string;
    customerEmail: string;
  }): Promise<{ checkoutId: string; checkoutUrl: string }>;

  confirmCardPayment(params: {
    checkoutId: string;
    cardBrand: string;
    cardLast4: string;
    cardExp: string;
  }): Promise<{ success: boolean; transactionId: string }>;
}

@Injectable()
export class SubscriptionsService implements PaymentProvider {
  constructor(private prisma: PrismaService) {}

  private defaultPlans: PlanDto[] = [
    // === INDIVIDUAL PLANS ===
    {
      id: 'plan-free',
      name: 'Boshlang\'ich (Free)',
      code: 'FREE',
      type: 'INDIVIDUAL',
      seatCount: 1,
      priceMonthly: 0,
      priceAnnual: 0,
      features: [
        'Web Pentest Asoslari (10 ta dars)',
        'Linux Terminal: Oyiga 2 soat',
        '3 ta Boshlang\'ich Laboratoriya',
        'Umumiy Hamjamiyat Chatiga kirish',
        'Ommaviy CTF musobaqalar',
      ],
      entitlements: {
        maxActiveLabs: 1,
        monthlyTerminalHours: 2,
        unlimitedLabs: false,
        proTournaments: false,
        prioritySupport: false,
        officialCertificates: false,
      },
    },
    {
      id: 'plan-pro',
      name: 'Pentester (Pro)',
      code: 'PRO',
      type: 'INDIVIDUAL',
      seatCount: 1,
      priceMonthly: 149000,
      priceAnnual: 1490000,
      features: [
        'Barcha 20+ Ta\'lim Yo\'laklari',
        'Linux Terminal: Cheksiz kirish',
        '50+ Amaliy Kiber-Laboratoriyalar',
        'Eksklyuziv Pro Turnirlar',
        'QR-kodli Rasmiy Sertifikatlar',
        'Jamoalar (Teams) va Jamoa Chatiga to\'liq kirish',
      ],
      entitlements: {
        maxActiveLabs: 3,
        monthlyTerminalHours: 9999,
        unlimitedLabs: true,
        proTournaments: true,
        prioritySupport: true,
        officialCertificates: true,
      },
    },
    {
      id: 'plan-premium',
      name: 'Kiber Elita (Premium)',
      code: 'PREMIUM',
      type: 'INDIVIDUAL',
      seatCount: 1,
      priceMonthly: 349000,
      priceAnnual: 3490000,
      features: [
        'Barcha Pro imkoniyatlari',
        'Shaxsiy 1-ga-1 Mentorlik / Ustoz ko\'rigi',
        '0-Day va Bug Bounty maxsus poligonlari',
        'Ishga tavsiyanoma va rezyume auditi',
        'Yopiq Red Team kiber-mashg\'ulotlari',
      ],
      entitlements: {
        maxActiveLabs: 10,
        monthlyTerminalHours: 9999,
        unlimitedLabs: true,
        proTournaments: true,
        prioritySupport: true,
        officialCertificates: true,
        mentorship: true,
      },
    },

    // === BUSINESS / COMPANY PLANS ===
    {
      id: 'plan-biz-team',
      name: 'Korxona: Jamoa (Team)',
      code: 'TEAM',
      type: 'BUSINESS',
      seatCount: 10,
      priceMonthly: 490000,
      priceAnnual: 4900000,
      features: [
        '10 tagacha xodim hisoblari',
        'Korporativ o\'quv guruhi va progress monitoringi',
        '50+ Laboratoriyalar va umumiy hisobotlar',
        'Bank kartasi orqali markazlashgan to\'lov',
        'PDF invoys va buxgalteriya hisobotlari',
      ],
      entitlements: {
        maxActiveLabs: 10,
        monthlyTerminalHours: 9999,
        unlimitedLabs: true,
        businessAnalytics: true,
      },
    },
    {
      id: 'plan-biz-corp',
      name: 'Korxona: Biznes (Business)',
      code: 'BUSINESS',
      type: 'BUSINESS',
      seatCount: 30,
      priceMonthly: 1290000,
      priceAnnual: 12900000,
      features: [
        '30 tagacha xodim hisoblari',
        'Maxsus korporativ kiber-mashg\'ulotlar (Blue Team)',
        'Xodimlar zaifliklarini avtomatik testlash',
        'Shaxsiy Ustoz / Mentor biriktirilishi',
        'Cheksiz sertifikatlashtirish va API audit',
      ],
      entitlements: {
        maxActiveLabs: 30,
        monthlyTerminalHours: 9999,
        unlimitedLabs: true,
        businessAnalytics: true,
        dedicatedInstructor: true,
      },
    },
    {
      id: 'plan-biz-enterprise',
      name: 'Korxona: Enterprise',
      code: 'ENTERPRISE',
      type: 'BUSINESS',
      seatCount: 100,
      priceMonthly: 3900000,
      priceAnnual: 39000000,
      features: [
        'Cheksiz yoki 100+ xodim hisoblari',
        'Maxsus izolyatsiyalangan kiber-poligon (Dedicated Cloud / On-Prem)',
        '24/7 SLA xizmati va kiber-insidentlar bo\'yicha konsalting',
        'Xodimlarning kiber-xavfsizlik malaka darajasi auditi',
      ],
      entitlements: {
        maxActiveLabs: 100,
        monthlyTerminalHours: 9999,
        unlimitedLabs: true,
        businessAnalytics: true,
        dedicatedInstructor: true,
        customSla: true,
      },
    },
  ];

  // In-memory safe payment transaction records (admin viewable)
  private mockPayments = [
    {
      id: 'pay-001',
      userId: 'user-02',
      username: 'Javohir_Sec',
      planCode: 'PRO',
      planName: 'Pentester (Pro)',
      amount: 149000,
      currency: 'UZS',
      provider: 'bank_card',
      cardBrand: 'Visa',
      cardLast4: '4920',
      status: 'COMPLETED',
      createdAt: new Date('2026-09-20T10:14:00Z'),
    },
    {
      id: 'pay-002',
      userId: 'comp-01',
      username: 'CyberBank Uzbekistan',
      planCode: 'BUSINESS',
      planName: 'Korxona: Biznes (Business)',
      amount: 1290000,
      currency: 'UZS',
      provider: 'bank_card',
      cardBrand: 'Mastercard',
      cardLast4: '8814',
      status: 'COMPLETED',
      createdAt: new Date('2026-09-18T14:30:00Z'),
    },
    {
      id: 'pay-003',
      userId: 'user-03',
      username: 'Anvar_Pwn',
      planCode: 'PRO',
      planName: 'Pentester (Pro)',
      amount: 149000,
      currency: 'UZS',
      provider: 'bank_card',
      cardBrand: 'Uzcard',
      cardLast4: '1092',
      status: 'COMPLETED',
      createdAt: new Date('2026-09-15T09:12:00Z'),
    },
  ];

  async getPlans(type?: 'INDIVIDUAL' | 'BUSINESS') {
    if (type) {
      return this.defaultPlans.filter((p) => p.type === type);
    }
    return this.defaultPlans;
  }

  async getUserSubscription(userId: string) {
    return {
      userId,
      status: 'ACTIVE',
      plan: this.defaultPlans[1]!, // Pro for preview/demo
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      cancelAtPeriodEnd: false,
    };
  }

  async getUserEntitlements(userId: string) {
    const sub = await this.getUserSubscription(userId);
    const planCode = sub?.plan?.code || 'FREE';
    const plan = this.defaultPlans.find((p) => p.code === planCode) || this.defaultPlans[0]!;

    return {
      planCode,
      entitlements: plan.entitlements,
      quotas: {
        terminalHoursUsed: 1.2,
        terminalHoursTotal: plan.entitlements.monthlyTerminalHours,
        activeLabsCount: 1,
        maxActiveLabs: plan.entitlements.maxActiveLabs,
      },
    };
  }

  async canAccess(userId: string, featureKey: string): Promise<boolean> {
    const entitlementsData = await this.getUserEntitlements(userId);
    const { entitlements } = entitlementsData;

    switch (featureKey) {
      case 'UNLIMITED_LABS':
        return !!entitlements.unlimitedLabs;
      case 'PRO_TOURNAMENTS':
        return !!entitlements.proTournaments;
      case 'OFFICIAL_CERTIFICATES':
        return !!entitlements.officialCertificates;
      case 'TERMINAL_SESSION':
        return entitlementsData.quotas.terminalHoursUsed < entitlementsData.quotas.terminalHoursTotal;
      default:
        return true;
    }
  }

  /**
   * Payment Provider Abstraction:
   * Initiates a card payment checkout session.
   * Zero sensitive card data (PAN, PIN, CVV) is received or stored here.
   */
  async createCardCheckout(params: {
    orderId: string;
    amount: number;
    currency: string;
    description: string;
    customerEmail: string;
  }): Promise<{ checkoutId: string; checkoutUrl: string }> {
    const checkoutId = `chk_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    return {
      checkoutId,
      checkoutUrl: `/checkout?id=${checkoutId}&amount=${params.amount}&desc=${encodeURIComponent(params.description)}`,
    };
  }

  async confirmCardPayment(params: {
    checkoutId: string;
    cardBrand: string;
    cardLast4: string;
    cardExp: string;
  }): Promise<{ success: boolean; transactionId: string }> {
    const transactionId = `tx_${Date.now()}_card`;

    // Record safe metadata without raw PAN/CVV
    this.mockPayments.unshift({
      id: transactionId,
      userId: 'current-user-id',
      username: 'Siz (Foydalanuvchi)',
      planCode: 'PRO',
      planName: 'Pentester (Pro)',
      amount: 149000,
      currency: 'UZS',
      provider: 'bank_card',
      cardBrand: params.cardBrand || 'Bank Card',
      cardLast4: params.cardLast4 || '••••',
      status: 'COMPLETED',
      createdAt: new Date(),
    });

    return { success: true, transactionId };
  }

  async initiateSubscription(userId: string, planCode: string, billingCycle: 'MONTHLY' | 'ANNUAL') {
    const targetPlan = this.defaultPlans.find((p) => p.code === planCode);
    if (!targetPlan) {
      throw new BadRequestException('Noto\'g\'ri tarif rejasi tanlandi.');
    }

    const price = billingCycle === 'ANNUAL' ? targetPlan.priceAnnual : targetPlan.priceMonthly;

    const checkout = await this.createCardCheckout({
      orderId: `order-${Date.now()}`,
      amount: price,
      currency: 'UZS',
      description: `CyberTrip.uz - ${targetPlan.name} (${billingCycle === 'ANNUAL' ? 'Yillik' : 'Oylik'})`,
      customerEmail: 'student@test.uz',
    });

    return {
      success: true,
      message: `${targetPlan.name} uchun xavfsiz bank kartasi to'lovi ochildi.`,
      checkoutId: checkout.checkoutId,
      checkoutUrl: checkout.checkoutUrl,
      amount: price,
      currency: 'UZS',
      plan: targetPlan,
    };
  }

  // === ADMIN PAYMENT & SUBSCRIPTION MANAGEMENT ===
  async getAdminOverview() {
    return {
      mrr: 18450000, // Monthly Recurring Revenue in UZS
      arr: 221400000,
      activeSubscribers: 142,
      corporateAccounts: 18,
      churnRate: '1.4%',
      successfulTransactions30d: 312,
      failedTransactions30d: 4,
    };
  }

  async getAdminPayments() {
    return this.mockPayments;
  }

  async getAdminInvoices() {
    return [
      { id: 'inv-01', number: 'INV-2026-0901', customer: 'CyberBank Uzbekistan', amount: 1290000, status: 'PAID', date: '2026-09-18', pdfUrl: '/invoices/inv-01.pdf' },
      { id: 'inv-02', number: 'INV-2026-0902', customer: 'Javohir_Sec', amount: 149000, status: 'PAID', date: '2026-09-20', pdfUrl: '/invoices/inv-02.pdf' },
      { id: 'inv-03', number: 'INV-2026-0903', customer: 'Anvar_Pwn', amount: 149000, status: 'PAID', date: '2026-09-15', pdfUrl: '/invoices/inv-03.pdf' },
    ];
  }
}
