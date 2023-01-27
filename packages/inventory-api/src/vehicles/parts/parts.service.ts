import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateVehiclePartDto, UpdateVehiclePartDto } from '../dto/parts.dto';

@Injectable()
export class VehiclePartsService {
  constructor(private prisma: PrismaService) {}

  async listVehicleParts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.VehiclePartWhereUniqueInput;
    where?: Prisma.VehiclePartWhereInput;
    orderBy?: Prisma.VehiclePartOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.vehiclePart.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findVehiclePartById(id: string) {
    return this.prisma.vehiclePart.findUnique({ where: { id } });
  }

  async createVehiclePart(createVehiclePartDto: CreateVehiclePartDto) {
    return this.prisma.vehiclePart.create({
      data: createVehiclePartDto,
    });
  }

  async updateVehiclePart(id: string, updateVehiclePartDto: UpdateVehiclePartDto) {
    return this.prisma.vehiclePart.update({
      where: { id },
      data: updateVehiclePartDto,
    });
  }

  async deleteVehiclePart(id: string) {
    return this.prisma.vehiclePart.delete({
      where: { id },
    });
  }
}
