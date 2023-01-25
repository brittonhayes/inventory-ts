import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CreateEmployeeDto, Employee } from './dto/employees.dto';
import { EmployeesService } from './employees.service';

@Resolver(() => Employee)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Query(() => Employee, { name: 'employee' })
  async employee(@Args('id') id: string): Promise<Employee> {
    const employee = await this.employeesService.findEmployee(id);
    if (!employee) {
      throw new NotFoundException(id);
    }
    return employee;
  }

  @Query(() => [Employee], { name: 'employees' })
  employees(): Promise<Employee[]> {
    return this.employeesService.listEmployees({
      orderBy: { name: Prisma.SortOrder.asc },
    });
  }
}
