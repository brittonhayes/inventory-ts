import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from '@app/common/guards/google.guard';
import { AuthService } from '../auth.service';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req) {
    // Guard redirects
  }

  // @Get('callback')
  // @UseGuards(GoogleOauthGuard)
  // @ApiOkResponse({
  //   description: 'User logged in successfully',
  // })
  // async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
  //   const { accessToken } = this.authService.refreshTokens(req.user as User);
  //   return res.status(HttpStatus.OK).json({ token: accessToken });
  // }
}
