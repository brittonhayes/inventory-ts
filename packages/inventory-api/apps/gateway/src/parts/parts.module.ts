import { Module } from '@nestjs/common';
import { VehiclePartsController } from './parts.controller';
import { VehiclePartsService } from './parts.service';

@Module({
  providers: [VehiclePartsService],
  controllers: [VehiclePartsController],
  exports: [VehiclePartsService],
})
export class VehiclePartsModule {}
