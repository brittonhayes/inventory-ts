import { ObjectType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';
import { Employee } from '../../employees/dto/employees.dto';
import { MaintenanceGuide } from './guides.dto';
import { Tool } from '../../tools/dto/tools.dto';
import { Vehicle } from '../../vehicles/dto/vehicles.dto';

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});

@ObjectType()
export class MaintenanceTask {
  @Field((type) => String)
  @ApiProperty({ type: String })
  id: string;

  @Field(() => String)
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Field(() => String)
  @ApiProperty({ type: Date })
  updatedAt: Date;

  @Field(() => TaskStatus)
  @ApiProperty({ enum: TaskStatus, enumName: 'TaskStatus' })
  status: TaskStatus = TaskStatus.INCOMPLETE;

  @Field(() => Date)
  @ApiPropertyOptional({ type: Date })
  dueDate?: Date;

  @Field(() => String)
  @ApiProperty({ type: String })
  name: string;

  @Field(() => String, { nullable: true })
  @ApiPropertyOptional({ type: String })
  description?: string;

  @Field(() => Number, { nullable: true })
  @ApiPropertyOptional({ type: Number })
  machineHours?: number;

  @Field(() => [Tool], { nullable: true })
  @ApiPropertyOptional({ isArray: true, type: () => Tool })
  tools?: Tool[];

  @Field(() => String, { nullable: true })
  @ApiPropertyOptional({ type: String })
  assigneeId?: string;

  @Field(() => Employee, { nullable: true })
  @ApiPropertyOptional({ type: () => Employee })
  assignee?: Employee;

  @Field(() => Vehicle, { nullable: true })
  @ApiPropertyOptional({ type: () => Vehicle })
  vehicle?: Vehicle;

  @Field(() => String, { nullable: true })
  @ApiPropertyOptional({ type: String })
  vehicleId?: string;

  @Field(() => MaintenanceGuide, { nullable: true })
  @ApiPropertyOptional({ type: () => MaintenanceGuide })
  guide?: MaintenanceGuide;

  @Field(() => String, { nullable: true })
  @ApiPropertyOptional({ type: String })
  guideId?: string;
}

@InputType()
export class CreateMaintenanceTaskDto extends OmitType(MaintenanceTask, [
  'id',
  'createdAt',
  'updatedAt',
  'tools',
  'assignee',
  'vehicle',
  'guide',
] as const) {}

@InputType()
export class UpdateMaintenanceTaskDto extends PartialType(CreateMaintenanceTaskDto) {}

export class ConnectMaintenanceTaskDto extends PickType(MaintenanceTask, ['id'] as const) {}

export class ConnectMaintenanceTaskRelationInputDto {
  create?: CreateMaintenanceTaskDto;
  connect?: ConnectMaintenanceTaskDto;
}
