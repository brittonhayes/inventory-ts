import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Condition } from '@prisma/client';
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

  @ApiPropertyOptional({ enum: Condition, enumName: 'Condition' })
  condition?: Condition;

  @ApiPropertyOptional({ type: Number })
  hours?: number;

  @ApiPropertyOptional({ type: String })
  notes?: string;

  @ApiPropertyOptional({ type: () => Vehicle })
  vehicle?: Vehicle;

  @ApiPropertyOptional({ type: String })
  vehicleId?: string;
}

export class CreateVehiclePartDto extends OmitType(VehiclePart, ['id', 'createdAt', 'updatedAt', 'vehicle'] as const) {}

export class UpdateVehiclePartDto extends PartialType(CreateVehiclePartDto) {}
