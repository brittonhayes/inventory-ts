import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateMaintenanceTaskDto } from './dto/create-task.dto';
import { UpdateMaintenanceTaskDto } from './dto/update-task.dto';

@Injectable()
export class MaintenanceTasksService {
  constructor(private prisma: PrismaService) {}

  async list(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MaintenanceTaskWhereUniqueInput;
    where?: Prisma.MaintenanceTaskWhereInput;
    orderBy?: Prisma.MaintenanceTaskOrderByWithRelationInput;
    include?: Prisma.MaintenanceTaskInclude;
  }) {
    const { skip, take, cursor, where, orderBy, include } = params;

    return this.prisma.maintenanceTask.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  async findById(id: string) {
    return this.prisma.maintenanceTask.findUnique({
      where: {
        id,
      },
    });
  }

  async create(createMaintenanceTaskDto: CreateMaintenanceTaskDto) {
    return this.prisma.maintenanceTask.create({
      data: createMaintenanceTaskDto,
    });
  }

  async update(id: string, updateMaintenanceTaskDto: UpdateMaintenanceTaskDto) {
    return this.prisma.maintenanceTask.update({
      where: { id },
      data: updateMaintenanceTaskDto,
    });
  }

  async delete(id: string) {
    return this.prisma.maintenanceTask.delete({
      where: { id },
    });
  }
}
