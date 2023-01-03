import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService, PrismaService],
})
export class LocationsModule {}
