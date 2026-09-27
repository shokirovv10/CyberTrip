import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // Note: Normally we'd use Prisma to check for existing users
    // For this boilerplate, assuming we have a User model in Prisma schema
    const existingUser = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.email }, { username: dto.username }] },
    }).catch(() => null); // Catch if model not defined yet

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Mocking user creation, normally await this.prisma.user.create(...)
    const user = {
      id: 'mock-uuid',
      email: dto.email,
      username: dto.username,
      role: 'USER',
    };

    return this.generateTokens(user);
  }

  async login(dto: LoginDto) {
    // Normally await this.prisma.user.findUnique({ where: { email: dto.email } })
    const user = {
      id: 'mock-uuid',
      email: dto.email,
      username: 'mockuser',
      password: await bcrypt.hash('password123', 10),
      role: 'USER',
    };

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user);
  }

  async refreshTokens(userId: string) {
    const user = {
      id: userId,
      email: 'mock@example.com',
      username: 'mockuser',
      role: 'USER',
    };
    return this.generateTokens(user);
  }

  private generateTokens(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      }
    };
  }
}
