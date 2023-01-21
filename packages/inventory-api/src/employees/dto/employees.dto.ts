import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { MaintenanceTask } from '../../maintenance/dto/tasks.dto';
import { ApiProperty, ApiPropertyOptional, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Length } from 'class-validator';

@ObjectType()
export class Employee {
  @Field((type) => String)
  @ApiProperty({ type: String })
  id: string;

  @Field(() => String)
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Field(() => String)
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

@InputType()
export class CreateEmployeeDto extends PickType(Employee, ['name'] as const) {}

@InputType()
export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}

@InputType()
export class DeleteEmployeeDto extends PickType(Employee, ['id'] as const) {}

export class ConnectEmployeeDto extends PickType(Employee, ['id'] as const) {}

export class ConnectEmployeeRelationInputDto {
  create?: CreateEmployeeDto;
  connect?: ConnectEmployeeDto;
}
