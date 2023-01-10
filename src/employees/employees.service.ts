import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employees.dto';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async listEmployees(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EmployeeWhereUniqueInput;
    where?: Prisma.EmployeeWhereInput;
    orderBy?: Prisma.EmployeeOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.employee.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        tasks: true,
      },
    });
  }

  async findEmployee(id: string) {
    return this.prisma.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async createEmployee(createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: createEmployeeDto,
    });
  }

  async updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return this.prisma.employee.update({
      data: updateEmployeeDto,
      where: {
        id,
      },
    });
  }

  async deleteEmployee(id: string) {
    return this.prisma.employee.delete({
      where: {
        id,
      },
    });
  }
}
