import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Vehicle } from './vehicles.dto';

export class VehiclePart {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ isArray: true, type: () => Vehicle })
  compatibleVehicles?: Vehicle[];
}

export class VehiclePartResponse extends OmitType(VehiclePart, ['compatibleVehicles'] as const) {}

export class CreateVehiclePartDto extends OmitType(VehiclePart, [
  'id',
  'createdAt',
  'updatedAt',
  'compatibleVehicles',
] as const) {}

export class UpdateVehiclePartDto extends PartialType(CreateVehiclePartDto) {}
