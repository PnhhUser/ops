import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/interfaces/payload.interface';
import { ExceptionSerializer } from 'src/common/serializers/exception.serializers';
import { AccountEntity } from 'src/database/entities/account.entity';
import { AccountRepository } from 'src/database/repositories/account.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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
      throw ExceptionSerializer.unauthorized('Invalid username or password');
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
    const account = await this.accountRepository.accountExist(username);

    if (!account) return null;

    const isPasswordValid = await bcrypt.compare(password, account.password);
    return isPasswordValid ? account : null;
  }

  /**
   * Tạo access_token từ userId + username
   */
  async generateAccessToken(userId: number, username: string): Promise<string> {
    const payload: JwtPayload = { sub: userId, name: username };

    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('jwt.expiresIn'),
      secret: this.configService.get<string>('jwt.secret'),
    });
  }

  /**
   * Tạo refresh_token từ userId + username
   */
  async generateRefreshToken(
    userId: number,
    username: string,
  ): Promise<string> {
    const payload: JwtPayload = { sub: userId, name: username };

    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('jwt.refreshIn'),
      secret: this.configService.get<string>('jwt.refreshSecret'),
    });
  }
}
