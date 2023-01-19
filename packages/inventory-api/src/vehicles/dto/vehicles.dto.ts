import { ApiProperty, ApiPropertyOptional, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Condition, PowerType, VehicleType } from '@prisma/client';
import { MaintenanceGuide } from '../../maintenance/dto/guides.dto';
import { Implement } from './implements.dto';
import { VehiclePart } from './parts.dto';
import { Attachment } from './attachments.dto';

export class Vehicle {
  @ApiProperty({ type: String })
  id: string;

  @ApiPropertyOptional({ type: String })
  name?: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Boolean, default: true })
  isOwned?: boolean = true;

  @ApiPropertyOptional({ type: Number })
  year: number;

  @ApiPropertyOptional({ enum: Condition, enumName: 'Condition' })
  condition?: Condition = Condition.GOOD;

  @ApiProperty({ enum: VehicleType, enumName: 'VehicleType' })
  vehicleType: VehicleType;

  @ApiProperty({ type: String })
  make: string;

  @ApiProperty({ type: String })
  model: string;

  @ApiPropertyOptional({ type: Number })
  machineHours?: number;

  @ApiPropertyOptional({ type: String })
  link?: string;

  @ApiProperty({ enum: PowerType, enumName: 'PowerType' })
  power: PowerType = PowerType.GAS;

  @ApiPropertyOptional({ isArray: true, type: () => MaintenanceGuide })
  guides?: MaintenanceGuide[];

  @ApiPropertyOptional({ isArray: true, type: () => VehiclePart })
  compatibleParts?: VehiclePart[];

  @ApiPropertyOptional({ isArray: true, type: () => VehiclePart })
  compatibleAttachments?: Attachment[];

  @ApiPropertyOptional({ isArray: true, type: () => Implement })
  compatibleImplements?: Implement[];
}

export class VehicleResponse extends OmitType(Vehicle, [
  'guides',
  'compatibleParts',
  'compatibleAttachments',
] as const) {}

export class CreateVehicleDto extends OmitType(Vehicle, [
  'id',
  'guides',
  'compatibleParts',
  'compatibleAttachments',
  'compatibleImplements',
] as const) {}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}

export class ConnectVehicleDto extends PickType(Vehicle, ['id'] as const) {}

export class ConnectVehicleRelationInputDto {
  create?: CreateVehicleDto;
  connect?: ConnectVehicleDto;
}
