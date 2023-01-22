import { Module } from '@nestjs/common';
import { ImplementsController } from './implements.controller';
import { ImplementsService } from './implements.service';
import { VehiclePartsService } from './parts.service';
import { VehiclesController } from './vehicles.controller';
import { VehiclesResolver } from './vehicles.resolver';
import { VehiclesService } from './vehicles.service';

@Module({
  controllers: [VehiclesController, ImplementsController],
  providers: [VehiclesResolver, VehiclesService, VehiclePartsService, ImplementsService],
})
export class VehiclesModule {}
