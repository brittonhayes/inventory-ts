import { Injectable } from '@nestjs/common';
import { Prisma, Vehicle } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async vehicles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.VehicleWhereUniqueInput;
    where?: Prisma.VehicleWhereInput;
    orderBy?: Prisma.VehicleOrderByWithRelationInput;
  }): Promise<Vehicle[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.vehicle.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async vehicle(where: Prisma.VehicleWhereUniqueInput): Promise<Vehicle | null> {
    return this.prisma.vehicle.findUnique({ where });
  }

  async createVehicle(data: Prisma.VehicleCreateInput) {
    return this.prisma.vehicle.create({ data });
  }

  async updateVehicle(params: { where: Prisma.VehicleWhereUniqueInput; data: Prisma.VehicleUpdateInput }) {
    const { where, data } = params;
    return this.prisma.vehicle.update({ data, where });
  }

  async deleteVehicle(where: Prisma.VehicleWhereUniqueInput): Promise<Vehicle> {
    return this.prisma.vehicle.delete({ where });
  }
}
