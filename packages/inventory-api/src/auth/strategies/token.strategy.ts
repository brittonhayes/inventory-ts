import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecurityConfig } from 'src/common/config/config.interface';

export type JwtPayload = { sub: string; username: string };

@Injectable()
export class JwtTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<SecurityConfig>('security').jwt.secret,
    });
  }

  async validate(payload: JwtPayload) {
    return { id: payload.sub, username: payload.username };
  }
}
