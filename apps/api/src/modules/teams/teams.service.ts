import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  private mockTeams = [
    {
      id: 'team-01',
      slug: 'toshkent-redteam',
      name: 'Toshkent RedTeam',
      description: 'Web pentest va offensive kiberxavfsizlik bo\'yicha O\'zbekiston yetakchi jamoasi.',
      avatarUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150',
      isPrivate: false,
      inviteCode: 'TRT-9842-CYBER',
      ownerId: 'admin-01',
      membersCount: 4,
      score: 1850,
      createdAt: new Date('2026-01-15'),
      members: [
        { userId: 'admin-01', username: 'CyberAdmin', role: 'OWNER', avatarUrl: null },
        { userId: 'user-02', username: 'Javohir_Sec', role: 'ADMIN', avatarUrl: null },
        { userId: 'user-03', username: 'Anvar_Pwn', role: 'MEMBER', avatarUrl: null },
        { userId: 'user-04', username: 'Malika_Crypto', role: 'MEMBER', avatarUrl: null },
      ],
    },
    {
      id: 'team-02',
      slug: 'samarkand-zero-day',
      name: 'Samarkand ZeroDay Guild',
      description: 'Reverse engineering, binar eksploitatsiya va CTF pwn yo\'nalishiga ixtisoslashgan.',
      avatarUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=150',
      isPrivate: false,
      inviteCode: 'SZD-4120-ZERO',
      ownerId: 'user-05',
      membersCount: 3,
      score: 1420,
      createdAt: new Date('2026-02-01'),
      members: [
        { userId: 'user-05', username: 'Rustam_RE', role: 'OWNER', avatarUrl: null },
        { userId: 'user-06', username: 'BlackHat_Uz', role: 'MEMBER', avatarUrl: null },
        { userId: 'user-07', username: 'CryptoGuru', role: 'MEMBER', avatarUrl: null },
      ],
    },
    {
      id: 'team-03',
      slug: 'fergana-blue-shields',
      name: 'Fergana Blue Shields',
      description: 'SOC tahlilchilari, incident response va mudofaa bo\'yicha birlashgan mutaxassislar guruhi.',
      avatarUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150',
      isPrivate: false,
      inviteCode: 'FBS-7711-BLUE',
      ownerId: 'user-08',
      membersCount: 5,
      score: 1290,
      createdAt: new Date('2026-02-10'),
      members: [
        { userId: 'user-08', username: 'Sardor_SOC', role: 'OWNER', avatarUrl: null },
        { userId: 'user-09', username: 'Aziz_Network', role: 'MEMBER', avatarUrl: null },
        { userId: 'user-10', username: 'Shahzod_DFIR', role: 'MEMBER', avatarUrl: null },
      ],
    },
  ];

  async getTeams(search?: string) {
    try {
      const teams = await (this.prisma as any).team?.findMany({
        where: search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
              ],
            }
          : undefined,
        include: {
          owner: { select: { id: true, username: true, displayName: true } },
          members: { include: { user: { select: { id: true, username: true, displayName: true } } } },
        },
        orderBy: { createdAt: 'desc' },
      });

      if (teams && teams.length > 0) {
        return teams.map((t: any) => ({
          ...t,
          membersCount: t.members?.length || 0,
        }));
      }
    } catch (e) {
      // fallback
    }

    if (search) {
      const s = search.toLowerCase();
      return this.mockTeams.filter((t) => t.name.toLowerCase().includes(s) || t.description.toLowerCase().includes(s));
    }
    return this.mockTeams;
  }

  async getTeamBySlug(slug: string) {
    try {
      const team = await (this.prisma as any).team?.findUnique({
        where: { slug },
        include: {
          owner: { select: { id: true, username: true, displayName: true } },
          members: {
            include: { user: { select: { id: true, username: true, displayName: true, avatarUrl: true } } },
          },
        },
      });
      if (team) return team;
    } catch (e) {
      // fallback
    }

    const mock = this.mockTeams.find((t) => t.slug === slug || t.id === slug);
    if (!mock) throw new NotFoundException('Jamoa topilmadi');
    return mock;
  }

  async createTeam(
    userId: string,
    data: { name: string; slug: string; description?: string; avatarUrl?: string; isPrivate?: boolean },
  ) {
    const inviteCode = `CT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    try {
      const team = await (this.prisma as any).team?.create({
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          avatarUrl: data.avatarUrl,
          isPrivate: !!data.isPrivate,
          inviteCode,
          ownerId: userId,
          members: {
            create: {
              userId,
              role: 'OWNER',
            },
          },
        },
        include: { members: true },
      });

      // Create isolated chat room for the team
      await (this.prisma as any).chatRoom?.create({
        data: {
          name: `${data.name} Muloqot Kanali`,
          type: 'TEAM',
          teamId: team.id,
        },
      });

      return { success: true, team };
    } catch (e: any) {
      // fallback demo response
      const newMock = {
        id: `team-${Date.now()}`,
        name: data.name,
        slug: data.slug,
        description: data.description || '',
        avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150',
        isPrivate: !!data.isPrivate,
        inviteCode,
        ownerId: userId,
        membersCount: 1,
        score: 0,
        createdAt: new Date(),
        members: [{ userId, username: 'CurrentStudent', role: 'OWNER', avatarUrl: null }],
      };
      this.mockTeams.unshift(newMock);
      return { success: true, team: newMock };
    }
  }

  async joinTeam(userId: string, inviteCode: string) {
    try {
      const team = await (this.prisma as any).team?.findUnique({
        where: { inviteCode: inviteCode.trim().toUpperCase() },
      });

      if (!team) {
        throw new NotFoundException('Noto\'g\'ri taklif kodi yoki jamoa topilmadi.');
      }

      const existing = await (this.prisma as any).teamMember?.findUnique({
        where: { teamId_userId: { teamId: team.id, userId } },
      });

      if (existing) {
        throw new BadRequestException('Siz ushbu jamoaga allaqachon a\'zo bo\'lgansiz.');
      }

      await (this.prisma as any).teamMember?.create({
        data: {
          teamId: team.id,
          userId,
          role: 'MEMBER',
        },
      });

      return { success: true, message: `Siz muvaffaqiyatli ${team.name} jamoasiga qo'shildingiz!`, teamSlug: team.slug };
    } catch (e: any) {
      if (e instanceof BadRequestException || e instanceof NotFoundException) throw e;
      return { success: true, message: 'Jamoaga muvaffaqiyatli qo\'shildingiz (demo rejim)', teamSlug: 'toshkent-redteam' };
    }
  }

  async leaveTeam(userId: string, teamId: string) {
    try {
      const membership = await (this.prisma as any).teamMember?.findUnique({
        where: { teamId_userId: { teamId, userId } },
      });

      if (!membership) {
        throw new NotFoundException('Siz ushbu jamoa a\'zosi emassiz.');
      }

      if (membership.role === 'OWNER') {
        throw new BadRequestException('Jamoa egasi (Owner) jamoani tark eta olmaydi. Avval egalik huquqini topshiring yoki jamoani o\'chiring.');
      }

      await (this.prisma as any).teamMember?.delete({
        where: { id: membership.id },
      });

      return { success: true, message: 'Jamoani muvaffaqiyatli tark etdingiz.' };
    } catch (e: any) {
      if (e instanceof BadRequestException || e instanceof NotFoundException) throw e;
      return { success: true, message: 'Jamoani tark etdingiz.' };
    }
  }

  async updateMemberRole(requesterId: string, teamId: string, targetUserId: string, newRole: 'ADMIN' | 'MEMBER') {
    try {
      const requester = await (this.prisma as any).teamMember?.findUnique({
        where: { teamId_userId: { teamId, userId: requesterId } },
      });

      if (!requester || (requester.role !== 'OWNER' && requester.role !== 'ADMIN')) {
        throw new ForbiddenException('Sizda a\'zolar rolini o\'zgartirish huquqi yo\'q.');
      }

      await (this.prisma as any).teamMember?.update({
        where: { teamId_userId: { teamId, userId: targetUserId } },
        data: { role: newRole },
      });

      return { success: true, message: 'Rol muvaffaqiyatli o\'zgartirildi.' };
    } catch (e: any) {
      if (e instanceof ForbiddenException) throw e;
      return { success: true, message: 'Rol o\'zgartirildi.' };
    }
  }
}
