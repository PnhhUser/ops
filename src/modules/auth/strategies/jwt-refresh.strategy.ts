import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IJwtPayload } from 'src/modules/auth/interface/IJwtPayload';
import { REFRESH_NAME } from 'src/common/constants/base.constant';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null => {
          if (!req || !req.cookies) {
            return null;
          }

          const token = req.cookies[REFRESH_NAME] as string;
          return token || null;
        },
      ]),
      secretOrKey: configService.get<string>('jwt.refreshSecret')!,
      ignoreExpiration: false,
    });
  }

  validate(payload: IJwtPayload): IJwtPayload {
    return { sub: payload.sub, name: payload.name };
  }
}
