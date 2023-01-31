import { PickType } from '@nestjs/swagger';
import { Employee } from '../entities/employee.entity';

export class DeleteEmployeeDto extends PickType(Employee, ['id'] as const) {}
