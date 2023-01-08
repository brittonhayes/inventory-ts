import { Injectable } from '@nestjs/common';
import { MaintenanceTask, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class MaintenanceTasksService {
  constructor(private prisma: PrismaService) {}

  async maintenanceTasks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MaintenanceTaskWhereUniqueInput;
    where?: Prisma.MaintenanceTaskWhereInput;
    orderBy?: Prisma.MaintenanceTaskOrderByWithRelationInput;
  }): Promise<MaintenanceTask[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.maintenanceTask.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async maintenanceTask(where: Prisma.MaintenanceTaskWhereUniqueInput): Promise<MaintenanceTask | null> {
    return this.prisma.maintenanceTask.findUnique({ where });
  }

  async createMaintenanceTask(data: Prisma.MaintenanceTaskCreateInput): Promise<MaintenanceTask> {
    return this.prisma.maintenanceTask.create({ data });
  }

  async updateMaintenanceTask(params: {
    where: Prisma.MaintenanceTaskWhereUniqueInput;
    data: Prisma.MaintenanceTaskUpdateInput;
  }): Promise<MaintenanceTask> {
    const { where, data } = params;
    data.updatedAt = new Date();
    return this.prisma.maintenanceTask.update({ data, where });
  }

  async deleteMaintenanceTask(where: Prisma.MaintenanceTaskWhereUniqueInput): Promise<MaintenanceTask> {
    return this.prisma.maintenanceTask.delete({ where });
  }
}
