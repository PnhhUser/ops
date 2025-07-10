import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtPayload } from 'src/common/interfaces/payload.interface';
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

  validate(payload: JwtPayload) {
    return { userId: payload.sub, username: payload.name };
  }
}
