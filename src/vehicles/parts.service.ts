import { Injectable } from '@nestjs/common';
import { VehiclePart, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class VehiclePartsService {
  constructor(private prisma: PrismaService) {}

  async listVehiclePart(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.VehiclePartWhereUniqueInput;
    where?: Prisma.VehiclePartWhereInput;
    orderBy?: Prisma.VehiclePartOrderByWithRelationInput;
  }): Promise<VehiclePart[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.vehiclePart.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async vehiclePart(where: Prisma.VehiclePartWhereUniqueInput): Promise<VehiclePart | null> {
    return this.prisma.vehiclePart.findUnique({ where });
  }

  async createVehiclePart(data: Prisma.VehiclePartCreateInput) {
    return this.prisma.vehiclePart.create({ data });
  }

  async updateVehiclePart(params: { where: Prisma.VehiclePartWhereUniqueInput; data: Prisma.VehiclePartUpdateInput }) {
    const { where, data } = params;
    return this.prisma.vehiclePart.update({ data, where });
  }

  async deleteVehiclePart(where: Prisma.VehiclePartWhereUniqueInput): Promise<VehiclePart> {
    return this.prisma.vehiclePart.delete({ where });
  }
}
