import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from 'src/common/interfaces/payload.interface';
import { TOKEN_NAME } from 'src/common/constants/base.constant';
import { AccountRepository } from 'src/database/repositories/account.repository';
import jwtConfig from 'src/config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(
    @Inject(jwtConfig.KEY)
    jwtCfg: ConfigType<typeof jwtConfig>,
    private readonly accountRepository: AccountRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (!req || !req.cookies) {
            return null;
          }

          const token = req.cookies[TOKEN_NAME] as string;
          return token || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtCfg.secret!,
    });
  }

  async validate(payload: JwtPayload) {
    const account = await this.accountRepository.getById(payload.sub);

    if (account) {
      account.lastSeen = new Date();
      await this.accountRepository.update(account);
    }

    return { userId: payload.sub, username: payload.name };
  }
}
