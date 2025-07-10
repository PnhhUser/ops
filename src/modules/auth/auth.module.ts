import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AccountEntity } from 'src/database/entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

import { PassportModule } from '@nestjs/passport';
import { jwtProvider } from 'src/providers/jwt.provider';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
    JwtModule.registerAsync(jwtProvider),
    AccountModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
