import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import { MaintenanceTask } from '../entities/task.entity';

@InputType()
export class CreateMaintenanceTaskDto extends OmitType(MaintenanceTask, [
  'id',
  'createdAt',
  'updatedAt',
  'tools',
  'assignee',
  'vehicle',
] as const) {}
