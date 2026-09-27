import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class LabValidatorService {
  
  async validateEvidence(labType: string, evidence: any): Promise<boolean> {
    switch (labType) {
      case 'SQLI':
        return this.validateSqliEvidence(evidence);
      case 'XSS':
        return this.validateXssEvidence(evidence);
      default:
        throw new BadRequestException('Unknown lab type');
    }
  }

  private validateSqliEvidence(evidence: any): boolean {
    // Server-side check if user extracted correct data
    const expectedData = 'super_secret_admin_password_hash_123';
    return evidence.extractedData === expectedData;
  }

  private validateXssEvidence(evidence: any): boolean {
    // Server-side check if reflected payload was triggered
    return evidence.payloadTriggered === true && typeof evidence.cookieStolen === 'string';
  }
}
