import { ApiProperty, ApiPropertyOptional, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Power, VehicleType } from '@prisma/client';
import { MaintenanceGuide } from 'src/maintenance/dto/guides.dto';
import { MaintenanceTask } from 'src/maintenance/dto/tasks.dto';
import { VehiclePart } from './parts.dto';

export class Vehicle {
  @ApiProperty({ type: String })
  id: string;

  @ApiPropertyOptional({ type: String })
  name?: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: String })
  vin?: string;

  @ApiProperty({ enum: VehicleType, enumName: 'VehicleType' })
  vehicleType: VehicleType = VehicleType.VEHICLE;

  @ApiProperty({ type: String })
  make: string;

  @ApiProperty({ type: String })
  model: string;

  @ApiPropertyOptional({ type: Number })
  machineHours?: number;

  @ApiPropertyOptional({ type: String })
  link?: string;

  @ApiProperty({ enum: Power, enumName: 'Power' })
  power: Power = Power.GAS;

  @ApiProperty({ isArray: true, type: () => MaintenanceTask })
  tasks: MaintenanceTask[];

  @ApiProperty({ isArray: true, type: () => MaintenanceGuide })
  guides: MaintenanceGuide[];

  @ApiProperty({ isArray: true, type: () => VehiclePart })
  parts: VehiclePart[];
}

export class VehicleResponse extends OmitType(Vehicle, ['tasks', 'parts', 'guides'] as const) {}

export class CreateVehicleDto extends OmitType(Vehicle, ['id', 'tasks', 'guides', 'parts'] as const) {}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}

export class ConnectVehicleDto extends PickType(Vehicle, ['id'] as const) {}

export class ConnectVehicleRelationInputDto {
  create?: CreateVehicleDto;
  connect?: ConnectVehicleDto;
}
