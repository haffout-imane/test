import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { ClientModule } from './modules/client/client.module';
import { DomainModule } from './modules/domain/domain.module';

@Module({
  imports: [AuthModule, ClientModule, DomainModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
