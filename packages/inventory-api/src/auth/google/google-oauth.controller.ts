import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from './google-oauth.guard';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from '../../common/config/config.interface';
import { User } from 'src/users/dto/user.dto';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(private configService: ConfigService, private jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req) {
    // Guard redirects
  }

  @Get('callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = this.jwtAuthService.login(req.user as User);
    const cookieKey = this.configService.get<SecurityConfig>('security').sessionCookieKey;
    res.cookie(cookieKey, accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    return res.redirect('/profile');
  }
}
