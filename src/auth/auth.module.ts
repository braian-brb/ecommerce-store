import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './services/auth.service';
import { UserModule } from '../users/users/module/users.module';
import { AuthController } from './controllers/auth.controller';
@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
