import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { MaintenanceTask } from '../../tasks/entities/task.entity';

@ObjectType()
export class MaintenanceGuide {
  @Field((type) => String)
  @ApiProperty({ type: String })
  id: string;

  @Field(() => GraphQLISODateTime)
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @ApiProperty({ type: Date })
  updatedAt: Date;

  @Field(() => String)
  @ApiProperty({ type: String })
  @Length(1, 255)
  name: string;

  @Field(() => String)
  @ApiProperty({ type: String })
  @Length(1, 2000)
  content: string;

  @Field(() => [MaintenanceTask], { nullable: true })
  @ApiPropertyOptional({ isArray: true, type: () => MaintenanceTask })
  tasks?: MaintenanceTask[];

  @Field(() => Vehicle, { nullable: true })
  @ApiPropertyOptional({ type: () => Vehicle })
  vehicle?: Vehicle;

  @Field(() => String, { nullable: true })
  @ApiPropertyOptional({ type: String })
  vehicleId?: string;
}
