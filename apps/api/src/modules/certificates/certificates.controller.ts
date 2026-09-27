import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('certificates')
@UseGuards(JwtAuthGuard)
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Get()
  getMyCertificates(@CurrentUser() user: any) {
    return this.certificatesService.getUserCertificates(user.id);
  }

  @Get('verify/:id')
  @Public()
  verifyCertificate(@Param('id') id: string) {
    return this.certificatesService.verifyCertificate(id);
  }
}
