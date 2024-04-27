import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './repositories/user.repository';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { KakaoService } from 'src/externals/kakao/kakao.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    JwtAuthStrategy,
    KakaoService,
    JwtService,
  ],
})
export class AuthModule {}
