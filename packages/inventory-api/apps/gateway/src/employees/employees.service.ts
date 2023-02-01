import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async list(params: {
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

  async findById(id: string) {
    return this.prisma.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: createEmployeeDto,
    });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return this.prisma.employee.update({
      data: updateEmployeeDto,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.employee.delete({
      where: {
        id,
      },
    });
  }
}
