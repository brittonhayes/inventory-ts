import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Condition, MaintenanceTask, Prisma, TaskStatus } from '@prisma/client';
import { IsDateString, MaxDate } from 'class-validator';

export class MaintenanceTaskResponse implements MaintenanceTask {
  @ApiProperty({ example: 'clch9rxw90000p718qrofjcqd' })
  id: string;

  @ApiProperty({ example: 'Barn' })
  name: string;

  @ApiProperty({ description: 'Hours of on-the-job machine use' })
  machineHours: number;

  guideId: string;
  vehicleId: string;
  assigneeId: string;

  notes: string;

  @IsDateString()
  dueDate: Date;

  @IsDateString()
  startedAt: Date;

  @IsDateString()
  @MaxDate(new Date())
  completedAt: Date;

  @ApiProperty()
  status: TaskStatus;

  @ApiPropertyOptional({ example: 'MINT' })
  condition: Condition;

  @ApiPropertyOptional()
  locationId: string;

  @ApiPropertyOptional({ example: 'mower' })
  tagName: string;

  @ApiProperty()
  maintenanceTaskId: string;

  @ApiProperty({ example: '2021-05-01T00:00:00.000Z' })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ example: '2021-05-01T00:00:00.000Z' })
  @IsDateString()
  updatedAt: Date;
}

export class ListMaintenanceTasksDto implements Pick<Prisma.MaintenanceTaskFindManyArgs, 'skip' | 'where' | 'orderBy'> {
  @ApiPropertyOptional()
  skip?: number;

  @ApiPropertyOptional()
  where?: Prisma.MaintenanceTaskWhereInput;

  @ApiPropertyOptional()
  orderBy?: Prisma.MaintenanceTaskOrderByWithRelationInput;
}

export class FindMaintenanceTasksDto implements Pick<Prisma.MaintenanceTaskWhereUniqueInput, 'id'> {
  @ApiProperty()
  id: string;
}

export class CreateMaintenanceTaskDto implements Omit<Prisma.MaintenanceTaskCreateInput, 'id' | 'createdAt'> {
  name: string;

  @IsDateString()
  dueDate: Date;
}

export class UpdateMaintenanceTaskDto implements Omit<Prisma.MaintenanceTaskUpdateInput, 'id' | 'createdAt'> {
  name: string;
}
