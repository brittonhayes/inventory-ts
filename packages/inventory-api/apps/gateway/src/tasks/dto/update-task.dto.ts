import { InputType, PartialType } from '@nestjs/graphql';
import { CreateMaintenanceTaskDto } from './create-task.dto';

@InputType()
export class UpdateMaintenanceTaskDto extends PartialType(CreateMaintenanceTaskDto) {}
