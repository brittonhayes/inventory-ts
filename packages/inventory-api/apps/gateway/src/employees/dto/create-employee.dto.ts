import { PickType } from '@nestjs/swagger';
import { Employee } from '../entities/employee.entity';

export class CreateEmployeeDto extends PickType(Employee, ['name'] as const) {}
