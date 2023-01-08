import { Injectable } from '@nestjs/common';
import { Prisma, MaintenanceGuide } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class MaintenanceGuidesService {
  constructor(private prisma: PrismaService) {}

  async maintenanceGuides(params: {
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

  async maintenanceGuide(where: Prisma.MaintenanceGuideWhereUniqueInput): Promise<MaintenanceGuide | null> {
    return this.prisma.maintenanceGuide.findUnique({ where });
  }

  async createMaintenanceGuide(data: Prisma.MaintenanceGuideCreateInput): Promise<MaintenanceGuide> {
    return this.prisma.maintenanceGuide.create({ data });
  }

  async updateMaintenanceGuide(params: {
    where: Prisma.MaintenanceGuideWhereUniqueInput;
    data: Prisma.MaintenanceGuideUpdateInput;
  }): Promise<MaintenanceGuide> {
    const { where, data } = params;
    data.updatedAt = new Date();
    return this.prisma.maintenanceGuide.update({ data, where });
  }

  async deleteMaintenanceGuide(where: Prisma.MaintenanceGuideWhereUniqueInput): Promise<MaintenanceGuide> {
    return this.prisma.maintenanceGuide.delete({ where });
  }
}
