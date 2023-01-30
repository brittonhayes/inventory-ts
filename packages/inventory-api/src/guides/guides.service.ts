import { Injectable } from '@nestjs/common';
import { MaintenanceGuide, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateMaintenanceGuideDto } from './dto/create-guide.dto';

@Injectable()
export class MaintenanceGuidesService {
  constructor(private prisma: PrismaService) {}

  async listMaintenanceGuides(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MaintenanceGuideWhereUniqueInput;
    where?: Prisma.MaintenanceGuideWhereInput;
    orderBy?: Prisma.MaintenanceGuideOrderByWithRelationInput;
  }): Promise<MaintenanceGuide[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.maintenanceGuide.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findMaintenanceGuide(id: string) {
    return this.prisma.maintenanceGuide.findUnique({
      where: {
        id,
      },
      include: {
        vehicle: true,
      },
    });
  }

  async findMaintenanceGuideTasks(id: string) {
    return this.prisma.maintenanceGuide
      .findUnique({
        where: {
          id,
        },
      })
      .tasks();
  }

  async createMaintenanceGuide(createMaintenanceGuideDto: CreateMaintenanceGuideDto) {
    return this.prisma.maintenanceGuide.create({
      data: createMaintenanceGuideDto,
    });
  }

  async updateMaintenanceGuide(id: string, updateMaintenanceGuideDto: CreateMaintenanceGuideDto) {
    return this.prisma.maintenanceGuide.update({
      where: { id },
      data: updateMaintenanceGuideDto,
    });
  }

  async findMaintenanceGuideByVehicle(id: string) {
    return this.prisma.maintenanceGuide.findMany({
      where: {
        vehicleId: id,
      },
    });
  }

  async deleteMaintenanceGuide(id: string) {
    return this.prisma.maintenanceGuide.delete({
      where: {
        id,
      },
    });
  }
}
