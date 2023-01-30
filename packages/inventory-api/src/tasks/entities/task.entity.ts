import { Field, GraphQLISODateTime, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';
import { Tool } from '../../tools/entities/tool.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { MaintenanceGuide } from '../../guides/entities/guide.entity';

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});

@ObjectType()
export class MaintenanceTask {
  @Field((type) => String)
  @ApiProperty({ type: String })
  id: string;

  @Field(() => GraphQLISODateTime)
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
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
