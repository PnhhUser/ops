import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { parseDuration } from 'src/common/helpers/duration.helper';
import { responseSerialize } from 'src/common/serializers/response.serializer';
import { REFRESH_NAME, TOKEN_NAME } from 'src/common/constants/base.constant';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { IJwtPayload } from 'src/modules/auth/interface/IJwtPayload';
import { JwtRefreshGuard } from 'src/common/guards/jwt-refresh.guard';
import { IAccountService } from '../account/interface/IAccountService';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    @Inject('IAccountService')
    private readonly accountService: IAccountService,
  ) {}

  /**
   * Đăng nhập hệ thống
   * - Nhận username + password
   * - Sinh access_token và refresh_token
   * - Gắn vào cookie httpOnly
   */
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() login: LoginDTO,
  ) {
    const { username, password } = login;

    const env = this.configService.get<string>('app.env');

    // Validate thông tin đăng nhập
    const account = await this.authService.loginAsync(username, password);

    // Tạo refresh token
    const refreshToken = await this.authService.generateRefreshToken(
      account.userId,
      account.name,
    );

    // Ghi access token vào cookie
    res.cookie(TOKEN_NAME, account.accessToken, {
      httpOnly: true,
      maxAge: parseDuration(this.configService.get('jwt.expiresIn')!),
      sameSite: 'lax',
      secure: env === 'production',
    });

    // Ghi refresh token vào cookie
    res.cookie(REFRESH_NAME, refreshToken, {
      httpOnly: true,
      maxAge: parseDuration(this.configService.get('jwt.refreshIn')!),
      sameSite: 'lax',
      secure: env === 'production',
    });

    return responseSerialize({}, 'Login successfully');
  }

  /**
   * Kiểm tra người dùng đã đăng nhập hay chưa
   * - Xác thực bằng access_token (cookie)
   * - Trả lại thông tin người dùng từ JWT
   */
  @UseGuards(JwtAuthGuard)
  @Get('check-auth')
  checkAuth(@Req() req: Request) {
    const user = req.user as IJwtPayload;
    return responseSerialize({ user }, 'Authenticated');
  }

  /**
   * Làm mới access_token bằng refresh_token
   * - Truy cập bằng refresh_token (cookie)
   * - Trả lại access_token mới
   */
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user as IJwtPayload;

    const newAccessToken = await this.authService.generateAccessToken(
      user.sub,
      user.name,
    );

    const env = this.configService.get<string>('app.env');

    res.cookie(TOKEN_NAME, newAccessToken, {
      httpOnly: true,
      maxAge: parseDuration(this.configService.get('jwt.expiresIn')!),
      sameSite: 'lax',
      secure: env === 'production',
    });

    return responseSerialize({}, 'Access token refreshed');
  }

  /**
   * Đăng xuất người dùng
   * - Xóa access_token và refresh_token khỏi cookie
   */
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const tokenPayload = req.user as IJwtPayload;

    await this.accountService.setOffline(tokenPayload.sub);

    const env = this.configService.get<string>('app.env');

    res.clearCookie(TOKEN_NAME, {
      httpOnly: true,
      sameSite: 'lax',
      secure: env === 'production',
    });

    res.clearCookie('refresh_token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: env === 'production',
    });

    return responseSerialize({}, 'Logged out successfully');
  }
}
