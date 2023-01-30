import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { MaintenanceTask } from '../../maintenance/dto/tasks.dto';

@ObjectType()
export class Employee {
  @Field(() => String)
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
  @Length(1, 100)
  name: string;

  @Field(() => [MaintenanceTask], { nullable: true })
  @ApiPropertyOptional({ isArray: true, type: () => MaintenanceTask })
  tasks?: MaintenanceTask[];
}
