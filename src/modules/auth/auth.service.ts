import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'src/modules/auth/interface/IJwtPayload';
import { ExceptionSerializer } from 'src/common/serializers/exception.serializers';
import { AccountEntity } from 'src/database/entities/account.entity';
import * as bcrypt from 'bcrypt';
import jwtConfig from 'src/config/jwt.config';
import { ErrorMessages } from 'src/common/constants/error-message.constant';
import { IAccountRepository } from 'src/database/repositories/interfaces/IAccountRepository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtType: ConfigType<typeof jwtConfig>,
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository<AccountEntity>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Đăng nhập bằng username và password, trả về access_token
   */
  async loginAsync(
    username: string,
    password: string,
  ): Promise<{
    accessToken: string;
    userId: number;
    name: string;
  }> {
    const account = await this.validate(username, password);

    if (!account) {
      throw ExceptionSerializer.unauthorized(
        ErrorMessages.account.ACCOUNT_FALSE,
      );
    }

    if (account.isActive === false) {
      throw ExceptionSerializer.unauthorized(
        'Tài khoản ' + account.username + ' đã bị khóa',
      );
    }

    const accessToken = await this.generateAccessToken(
      account.id,
      account.username,
    );

    return {
      accessToken,
      userId: account.id,
      name: account.username,
    };
  }

  /*
   * Kiểm tra xác thực tài khoản
   */

  private async validate(
    username: string,
    password: string,
  ): Promise<AccountEntity | null> {
    const account = await this.accountRepository.getByUsername(username);

    if (!account) return null;

    const isPasswordValid = await bcrypt.compare(password, account.password);
    return isPasswordValid ? account : null;
  }

  /**
   * Tạo access_token từ userId + username
   */
  async generateAccessToken(userId: number, username: string): Promise<string> {
    const payload: IJwtPayload = { sub: userId, name: username };

    return this.jwtService.signAsync(payload, {
      expiresIn: this.jwtType.expiresIn,
      secret: this.jwtType.secret,
    });
  }

  /**
   * Tạo refresh_token từ userId + username
   */
  async generateRefreshToken(
    userId: number,
    username: string,
  ): Promise<string> {
    const payload: IJwtPayload = { sub: userId, name: username };

    return this.jwtService.signAsync(payload, {
      expiresIn: this.jwtType.refreshIn,
      secret: this.jwtType.refreshSecret,
    });
  }
}
