import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtTokenStrategy } from './strategies/token.strategy';
import { JwtRefreshStrategy } from './strategies/refresh.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtTokenStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
