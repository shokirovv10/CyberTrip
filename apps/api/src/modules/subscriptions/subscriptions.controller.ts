import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('subscriptions')
@UseGuards(JwtAuthGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('plans')
  @Public()
  getPlans(@Query('type') type?: 'INDIVIDUAL' | 'BUSINESS') {
    return this.subscriptionsService.getPlans(type);
  }

  @Get('me')
  getMySubscription(@CurrentUser() user: any) {
    const userId = user?.id || 'demo-user-id';
    return this.subscriptionsService.getUserSubscription(userId);
  }

  @Get('entitlements')
  getMyEntitlements(@CurrentUser() user: any) {
    const userId = user?.id || 'demo-user-id';
    return this.subscriptionsService.getUserEntitlements(userId);
  }

  @Post('subscribe')
  subscribe(
    @CurrentUser() user: any,
    @Body() body: { planCode: string; billingCycle: 'MONTHLY' | 'ANNUAL' },
  ) {
    const userId = user?.id || 'demo-user-id';
    return this.subscriptionsService.initiateSubscription(userId, body.planCode, body.billingCycle || 'MONTHLY');
  }

  @Post('checkout/confirm')
  @Public()
  confirmPayment(
    @Body()
    body: {
      checkoutId: string;
      cardBrand: string;
      cardLast4: string;
      cardExp: string;
    },
  ) {
    return this.subscriptionsService.confirmCardPayment(body);
  }

  // === ADMIN SUBSCRIPTION & PAYMENT MANAGEMENT ===
  @Get('admin/overview')
  getAdminOverview() {
    return this.subscriptionsService.getAdminOverview();
  }

  @Get('admin/payments')
  getAdminPayments() {
    return this.subscriptionsService.getAdminPayments();
  }

  @Get('admin/invoices')
  getAdminInvoices() {
    return this.subscriptionsService.getAdminInvoices();
  }
}
