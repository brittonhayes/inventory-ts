import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { Employee } from './dto/employees.dto';
import { EmployeesService } from './employees.service';

@Resolver(() => Employee)
@UseGuards(GqlAuthGuard)
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
