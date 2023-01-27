import { Module } from '@nestjs/common';
import { ImplementsController } from './implements/implements.controller';
import { ImplementsResolver } from './implements/implements.resolver';
import { ImplementsService } from './implements/implements.service';
import { VehiclePartsResolver } from './parts/parts.resolver';
import { VehiclePartsService } from './parts/parts.service';
import { VehiclesController } from './vehicles.controller';
import { VehiclesResolver } from './vehicles.resolver';
import { VehiclesService } from './vehicles.service';

@Module({
  controllers: [VehiclesController, ImplementsController],
  providers: [
    VehiclesResolver,
    VehiclePartsResolver,
    ImplementsResolver,
    VehiclesService,
    VehiclePartsService,
    ImplementsService,
  ],
})
export class VehiclesModule {}
