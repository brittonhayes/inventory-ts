import { OmitType } from '@nestjs/swagger';
import { Employee } from './employee.entity';

export class EmployeeResponse extends OmitType(Employee, ['tasks'] as const) {}
