import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('companies')
@UseGuards(JwtAuthGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get('my')
  getMyCompany() {
    return this.companiesService.getCompanyBySlug('cyberbank-corp');
  }

  @Get(':slug')
  getCompany(@Param('slug') slug: string) {
    return this.companiesService.getCompanyBySlug(slug);
  }

  @Post()
  createCompany(
    @CurrentUser() user: any,
    @Body() body: { name: string; slug: string; industry?: string; billingEmail: string },
  ) {
    const userId = user?.id || 'demo-user-id';
    return this.companiesService.createCompany(userId, body);
  }

  @Post(':id/invite')
  inviteEmployee(
    @Param('id') id: string,
    @Body() body: { email: string; role?: string },
  ) {
    return this.companiesService.inviteEmployee(id, body.email, body.role);
  }

  @Get(':id/billing')
  getBilling(@Param('id') id: string) {
    return this.companiesService.getBillingAndSeats(id);
  }

  @Post(':id/assignments')
  assignLearning(
    @Param('id') id: string,
    @Body() body: { title: string; courseId?: string; labId?: string },
  ) {
    return this.companiesService.assignLearning(id, body);
  }
}
