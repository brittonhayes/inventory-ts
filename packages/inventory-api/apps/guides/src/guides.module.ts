import config from '@app/common/config/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { GuidesController } from './guides.controller';
import { GuidesResolver } from './guides.resolver';
import { GuidesService } from './guides.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [GuidesResolver, GuidesService],
  controllers: [GuidesController],
})
export class GuidesModule {}
