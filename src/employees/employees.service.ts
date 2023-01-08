import { Injectable } from '@nestjs/common';
import { Employee, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async employees(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EmployeeWhereUniqueInput;
    where?: Prisma.EmployeeWhereInput;
    orderBy?: Prisma.EmployeeOrderByWithRelationInput;
  }): Promise<Employee[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.employee.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async employee(where: Prisma.EmployeeWhereUniqueInput): Promise<Employee | null> {
    return this.prisma.employee.findUnique({ where });
  }

  async createEmployee(data: Prisma.EmployeeCreateInput) {
    return this.prisma.employee.create({ data });
  }

  async updateEmployee(params: { where: Prisma.EmployeeWhereUniqueInput; data: Prisma.EmployeeUpdateInput }) {
    const { where, data } = params;
    return this.prisma.employee.update({ data, where });
  }

  async deleteEmployee(where: Prisma.EmployeeWhereUniqueInput): Promise<Employee> {
    return this.prisma.employee.delete({ where });
  }
}
