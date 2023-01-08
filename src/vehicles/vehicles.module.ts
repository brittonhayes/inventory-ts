import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { VehiclePartsService } from './parts.service';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService, VehiclePartsService, PrismaService],
})
export class VehiclesModule {}
