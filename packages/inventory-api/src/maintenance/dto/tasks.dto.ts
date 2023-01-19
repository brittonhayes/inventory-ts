import { ApiProperty, ApiPropertyOptional, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';
import { Employee } from '../../employees/dto/employees.dto';
import { MaintenanceGuide } from './guides.dto';
import { Tool } from '../../tools/dto/tools.dto';
import { Vehicle } from '../../vehicles/dto/vehicles.dto';

export class MaintenanceTask {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ enum: TaskStatus, enumName: 'TaskStatus' })
  status: TaskStatus = TaskStatus.INCOMPLETE;

  @ApiPropertyOptional({ type: Date })
  dueDate?: Date;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiPropertyOptional({ type: Number })
  machineHours?: number;

  @ApiPropertyOptional({ isArray: true, type: () => Tool })
  tools?: Tool[];

  @ApiPropertyOptional({ type: String })
  assigneeId?: string;

  @ApiPropertyOptional({ type: () => Employee })
  assignee?: Employee;

  @ApiPropertyOptional({ type: () => Vehicle })
  vehicle?: Vehicle;

  @ApiPropertyOptional({ type: String })
  vehicleId?: string;

  @ApiPropertyOptional({ type: () => MaintenanceGuide })
  guide?: MaintenanceGuide;

  @ApiPropertyOptional({ type: String })
  guideId?: string;
}

export class CreateMaintenanceTaskDto extends OmitType(MaintenanceTask, [
  'id',
  'createdAt',
  'updatedAt',
  'tools',
  'assignee',
  'vehicle',
  'guide',
] as const) {}

export class UpdateMaintenanceTaskDto extends PartialType(CreateMaintenanceTaskDto) {}

export class ConnectMaintenanceTaskDto extends PickType(MaintenanceTask, ['id'] as const) {}

export class ConnectMaintenanceTaskRelationInputDto {
  create?: CreateMaintenanceTaskDto;
  connect?: ConnectMaintenanceTaskDto;
}
