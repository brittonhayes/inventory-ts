import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesResolver } from './employees.resolver';
import { EmployeesService } from './employees.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesResolver, EmployeesService],
})
export class EmployeesModule {}
