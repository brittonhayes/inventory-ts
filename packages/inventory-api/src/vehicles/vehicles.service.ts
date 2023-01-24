import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicles.dto';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async listVehicles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.VehicleWhereUniqueInput;
    orderBy?: Prisma.VehicleOrderByWithRelationInput;
    where?: Prisma.VehicleWhereInput;
    include?: Prisma.VehicleInclude;
  }) {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.vehicle.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  async findVehicleById(id: string, params: { include?: Prisma.VehicleInclude } = {}) {
    return this.prisma.vehicle.findUnique({ where: { id }, ...params });
  }

  async createVehicle(createVehicleDto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: createVehicleDto,
    });
  }

  async updateVehicle(id: string, updateVehicleDto: UpdateVehicleDto) {
    return this.prisma.vehicle.update({
      where: {
        id,
      },
      data: updateVehicleDto,
    });
  }

  async listCompatibleImplements(id: string) {
    return this.prisma.vehicle.findUnique({ where: { id } }).compatibleImplements();
  }

  async listCompatibleParts(id: string) {
    return this.prisma.vehicle.findUnique({ where: { id } }).compatibleParts();
  }

  async deleteVehicle(id: string) {
    return this.prisma.vehicle.delete({
      where: { id },
    });
  }
}
