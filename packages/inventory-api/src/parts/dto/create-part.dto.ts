import { OmitType } from '@nestjs/swagger';
import { VehiclePart } from '../entities/part.entity';

export class CreateVehiclePartDto extends OmitType(VehiclePart, [
  'id',
  'createdAt',
  'updatedAt',
  'compatibleVehicles',
] as const) {}
