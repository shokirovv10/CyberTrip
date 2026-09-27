import { Module } from '@nestjs/common';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LearningModule } from './modules/learning/learning.module';
import { LabsModule } from './modules/labs/labs.module';
import { CtfModule } from './modules/ctf/ctf.module';
import { GamificationModule } from './modules/gamification/gamification.module';
import { KnowledgeModule } from './modules/knowledge/knowledge.module';
import { GlossaryModule } from './modules/glossary/glossary.module';
import { CertificatesModule } from './modules/certificates/certificates.module';
import { RankingModule } from './modules/ranking/ranking.module';
import { SearchModule } from './modules/search/search.module';
import { HealthModule } from './modules/health/health.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { ChatModule } from './modules/chat/chat.module';
import { TeamsModule } from './modules/teams/teams.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { InstructorModule } from './modules/instructor/instructor.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    LearningModule,
    LabsModule,
    CtfModule,
    GamificationModule,
    KnowledgeModule,
    GlossaryModule,
    CertificatesModule,
    RankingModule,
    SearchModule,
    HealthModule,
    SubscriptionsModule,
    TournamentsModule,
    ChatModule,
    TeamsModule,
    CompaniesModule,
    InstructorModule,
    AdminModule,
  ],
})
export class AppModule {}
