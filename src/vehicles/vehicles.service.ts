import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicles.dto';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async vehicles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.VehicleWhereUniqueInput;
    where?: Prisma.VehicleWhereInput;
    orderBy?: Prisma.VehicleOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.vehicle.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async vehicle(id: string) {
    return this.prisma.vehicle.findUnique({ where: { id } });
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

  async deleteVehicle(id: string) {
    return this.prisma.vehicle.delete({
      where: { id },
    });
  }
}
