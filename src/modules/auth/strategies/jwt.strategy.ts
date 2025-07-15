import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { IJwtPayload } from 'src/modules/auth/interface/IJwtPayload';
import { TOKEN_NAME } from 'src/common/constants/base.constant';
import jwtConfig from 'src/config/jwt.config';
import { IAccountRepository } from 'src/database/repositories/interfaces/IAccountRepository';
import { AccountEntity } from 'src/database/entities/account.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(
    @Inject(jwtConfig.KEY)
    jwtCfg: ConfigType<typeof jwtConfig>,
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository<AccountEntity>,
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

  async validate(payload: IJwtPayload): Promise<IJwtPayload> {
    const account = await this.accountRepository.getById(payload.sub);

    if (account) {
      account.lastSeen = new Date();
      await this.accountRepository.update(account);
    }

    return { sub: payload.sub, name: payload.name };
  }
}
