import { 
  Controller, Get, Patch, Post, Param, Query, Body, UseGuards 
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('overview')
  async getOverview() {
    return this.adminService.getOverview();
  }

  @Get('users')
  async getUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('role') role?: Role,
  ) {
    return this.adminService.getUsers(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
      search,
      role,
    );
  }

  @Patch('users/:id/role')
  async updateUserRole(
    @CurrentUser() adminUser: any,
    @Param('id') targetUserId: string,
    @Body('role') newRole: Role,
  ) {
    return this.adminService.updateUserRole(adminUser.id, targetUserId, newRole);
  }

  @Patch('users/:id/status')
  async updateUserStatus(
    @CurrentUser() adminUser: any,
    @Param('id') targetUserId: string,
    @Body('isActive') isActive: boolean,
  ) {
    return this.adminService.updateUserStatus(adminUser.id, targetUserId, isActive);
  }

  @Get('plans')
  async getPlans() {
    return this.adminService.getPlans();
  }

  @Patch('plans/:id')
  async updatePlan(
    @CurrentUser() adminUser: any,
    @Param('id') planId: string,
    @Body() body: { priceMonthly?: number; priceAnnual?: number; isActive?: boolean },
  ) {
    return this.adminService.updatePlan(adminUser.id, planId, body);
  }

  @Get('subscriptions')
  async getSubscriptions(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminService.getSubscriptions(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
    );
  }

  @Get('payments')
  async getPayments(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminService.getPayments(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
    );
  }

  @Get('audit-logs')
  async getAuditLogs(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminService.getAuditLogs(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 50,
    );
  }

  @Get('labs')
  async getLabs(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminService.getLabs(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 50,
    );
  }

  @Get('challenges')
  async getChallenges(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminService.getChallenges(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 50,
    );
  }

  @Get('courses')
  async getCourses(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminService.getCourses(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 50,
    );
  }

  @Get('certificates')
  async getCertificates(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminService.getCertificates(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 50,
    );
  }

  @Get('submissions')
  async getSubmissions(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminService.getSubmissions(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 50,
    );
  }

  @Get('statistics')
  async getStatistics() {
    return this.adminService.getStatistics();
  }
}
