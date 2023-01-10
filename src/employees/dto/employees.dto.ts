import { MaintenanceTask } from 'src/maintenance/dto/tasks.dto';
import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class Employee {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  @Length(1, 100)
  name: string;

  @ApiProperty({ isArray: true, type: () => MaintenanceTask })
  tasks: MaintenanceTask[];
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
