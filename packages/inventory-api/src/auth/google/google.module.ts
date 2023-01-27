import { Module } from '@nestjs/common';
import { UsersModule } from '../../users/users.module';
import { AuthModule } from '../auth.module';
import { GoogleOauthStrategy } from '../strategies/google.strategy';
import { GoogleOauthController } from './google.controller';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [GoogleOauthController],
  providers: [GoogleOauthStrategy],
})
export class GoogleOauthModule {}
