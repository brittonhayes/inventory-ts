import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { VehiclePartsService } from './parts.service';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { ImplementsService } from './implements.service';
import { ImplementsController } from './implements.controller';

@Module({
  controllers: [VehiclesController, ImplementsController],
  providers: [VehiclesService, VehiclePartsService, ImplementsService, PrismaService],
})
export class VehiclesModule {}
