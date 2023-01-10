import { ApiProperty, ApiPropertyOptional, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { MaintenanceTask } from 'src/maintenance/dto/tasks.dto';
import { Vehicle } from 'src/vehicles/dto/vehicles.dto';

export class MaintenanceGuide {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  @Length(1, 255)
  name: string;

  @ApiProperty({ type: String })
  @Length(1, 2000)
  content: string;

  @ApiProperty({ isArray: true, type: () => MaintenanceTask })
  tasks: MaintenanceTask[];

  @ApiPropertyOptional({ type: () => Vehicle })
  vehicle?: Vehicle;

  @ApiPropertyOptional({ type: String })
  vehicleId?: string;
}

export class CreateMaintenanceGuideDto extends OmitType(MaintenanceGuide, [
  'id',
  'createdAt',
  'updatedAt',
  'tasks',
  'vehicle',
] as const) {}

export class UpdateMaintenanceGuideDto extends PartialType(
  OmitType(CreateMaintenanceGuideDto, ['name', 'content'] as const),
) {
  name: string;
  content: string;
}

export class ConnectMaintenanceGuideDto extends PickType(MaintenanceGuide, ['id'] as const) {}

export class ConnectMaintenanceGuideRelationInputDto {
  create?: CreateMaintenanceGuideDto;
  connect?: ConnectMaintenanceGuideDto;
}
