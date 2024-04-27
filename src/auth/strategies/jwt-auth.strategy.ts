import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { STRATEGY_JWT_AUTH } from '../constants/strategy.constant';
import { UserAccessTokenClaims } from '../dtos/res/auth-token-res.dto';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(
  Strategy,
  STRATEGY_JWT_AUTH,
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  async validate(payload: any): Promise<UserAccessTokenClaims> {
    return {
      id: payload.sub,
    };
  }
}
