import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { SecurityConfig } from '../../common/config/config.interface';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService, private readonly usersService: UsersService) {
    super({
      clientID: configService.get<SecurityConfig>('security').google.clientID,
      clientSecret: configService.get<SecurityConfig>('security').google.clientSecret,
      callbackURL: configService.get<SecurityConfig>('security').google.callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
    const { id, name, emails } = profile;

    let user = await this.usersService.findUser({
      username: emails[0].value,
      providerId: id,
    });
    if (!user) {
      user = await this.usersService.createUser({
        provider: 'google',
        providerId: id,
        name: name.givenName,
        username: emails[0].value,
      });
    }

    return user;
  }
}
