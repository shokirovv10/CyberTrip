import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getOverview() {
    const [
      totalUsers,
      totalStudents,
      totalInstructors,
      totalAdmins,
      totalCourses,
      totalLessons,
      totalLabs,
      activeSessions,
      completedLabs,
      totalCtfChallenges,
      totalTournaments,
      totalTeams,
      totalSubscriptions,
      paymentsSummary,
      recentAuditLogs,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { role: Role.STUDENT } }),
      this.prisma.user.count({ where: { role: Role.INSTRUCTOR } }),
      this.prisma.user.count({ where: { role: Role.ADMIN } }),
      this.prisma.course.count(),
      this.prisma.lesson.count(),
      this.prisma.lab.count(),
      this.prisma.labSession.count({ where: { status: 'RUNNING' } }),
      this.prisma.labSession.count({ where: { status: 'COMPLETED' } }),
      this.prisma.cTFChallenge.count(),
      this.prisma.cTFEvent.count(),
      this.prisma.team.count(),
      this.prisma.subscription.count({ where: { status: 'ACTIVE' } }),
      this.prisma.payment.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amount: true },
        _count: { id: true },
      }),
      this.prisma.auditLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              role: true,
            },
          },
        },
      }),
    ]);

    return {
      users: {
        total: totalUsers,
        students: totalStudents,
        instructors: totalInstructors,
        admins: totalAdmins,
      },
      content: {
        courses: totalCourses,
        lessons: totalLessons,
        labs: totalLabs,
        activeSessions,
        completedLabs,
        ctfChallenges: totalCtfChallenges,
      },
      events: {
        tournaments: totalTournaments,
        teams: totalTeams,
      },
      finances: {
        activeSubscriptions: totalSubscriptions,
        completedTransactions: paymentsSummary._count.id,
        totalRevenueUzs: paymentsSummary._sum.amount || 0,
      },
      system: {
        status: 'HEALTHY',
        database: 'CONNECTED',
        uptimeSeconds: Math.floor(process.uptime()),
        memoryUsageMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      },
      recentActivity: recentAuditLogs,
    };
  }

  async getUsers(page = 1, limit = 20, search?: string, role?: Role) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (role) {
      where.role = role;
    }

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } },
        { displayName: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, users] = await Promise.all([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          username: true,
          displayName: true,
          role: true,
          isActive: true,
          emailVerified: true,
          lastLoginAt: true,
          createdAt: true,
          gamification: {
            select: {
              totalXp: true,
              level: true,
              currentStreak: true,
            },
          },
          _count: {
            select: {
              labSessions: true,
              ctfSubmissions: true,
              certificates: true,
            },
          },
        },
      }),
    ]);

    return {
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateUserRole(adminUserId: string, targetUserId: string, newRole: Role) {
    const user = await this.prisma.user.findUnique({ where: { id: targetUserId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${targetUserId} not found`);
    }

    const oldRole = user.role;
    const updatedUser = await this.prisma.user.update({
      where: { id: targetUserId },
      data: { role: newRole },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        updatedAt: true,
      },
    });

    // Write audit log
    await this.prisma.auditLog.create({
      data: {
        userId: adminUserId,
        action: 'UPDATE_USER_ROLE',
        resource: 'USER',
        resourceId: targetUserId,
        metadata: {
          oldRole,
          newRole,
          targetUsername: user.username,
        },
      },
    });

    return updatedUser;
  }

  async updateUserStatus(adminUserId: string, targetUserId: string, isActive: boolean) {
    const user = await this.prisma.user.findUnique({ where: { id: targetUserId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${targetUserId} not found`);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: targetUserId },
      data: { isActive },
      select: {
        id: true,
        email: true,
        username: true,
        isActive: true,
        updatedAt: true,
      },
    });

    // Write audit log
    await this.prisma.auditLog.create({
      data: {
        userId: adminUserId,
        action: isActive ? 'ENABLE_USER' : 'DISABLE_USER',
        resource: 'USER',
        resourceId: targetUserId,
        metadata: {
          targetUsername: user.username,
          isActive,
        },
      },
    });

    return updatedUser;
  }

  async getPlans() {
    return this.prisma.plan.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: {
            subscriptions: true,
          },
        },
      },
    });
  }

  async updatePlan(adminUserId: string, planId: string, data: { priceMonthly?: number; priceAnnual?: number; isActive?: boolean }) {
    const plan = await this.prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) {
      throw new NotFoundException(`Plan with ID ${planId} not found`);
    }

    const updatedPlan = await this.prisma.plan.update({
      where: { id: planId },
      data,
    });

    await this.prisma.auditLog.create({
      data: {
        userId: adminUserId,
        action: 'UPDATE_PLAN',
        resource: 'PLAN',
        resourceId: planId,
        metadata: {
          planCode: plan.code,
          changes: data,
        },
      },
    });

    return updatedPlan;
  }

  async getSubscriptions(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [total, subscriptions] = await Promise.all([
      this.prisma.subscription.count(),
      this.prisma.subscription.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              username: true,
              displayName: true,
            },
          },
          plan: {
            select: {
              id: true,
              code: true,
              name: true,
              priceMonthly: true,
            },
          },
        },
      }),
    ]);

    return {
      data: subscriptions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getPayments(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [total, payments] = await Promise.all([
      this.prisma.payment.count(),
      this.prisma.payment.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              username: true,
              displayName: true,
            },
          },
        },
      }),
    ]);

    return {
      data: payments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getAuditLogs(page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    const [total, logs] = await Promise.all([
      this.prisma.auditLog.count(),
      this.prisma.auditLog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              username: true,
              role: true,
            },
          },
        },
      }),
    ]);

    return {
      data: logs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
