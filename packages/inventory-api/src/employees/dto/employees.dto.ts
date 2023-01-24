import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional, OmitType, PartialType, PickType } from '@nestjs/swagger';
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

export class EmployeeResponse extends OmitType(Employee, ['tasks'] as const) {}

export class CreateEmployeeDto extends PickType(Employee, ['name'] as const) {}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}

export class DeleteEmployeeDto extends PickType(Employee, ['id'] as const) {}

export class ConnectEmployeeDto extends PickType(Employee, ['id'] as const) {}

export class ConnectEmployeeRelationInputDto {
  create?: CreateEmployeeDto;
  connect?: ConnectEmployeeDto;
}
