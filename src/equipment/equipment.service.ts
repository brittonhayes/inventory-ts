import { Injectable } from '@nestjs/common';
import { Equipment, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class EquipmentService {
  constructor(private prisma: PrismaService) {}

  async listEquipment(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EquipmentWhereUniqueInput;
    where?: Prisma.EquipmentWhereInput;
    orderBy?: Prisma.EquipmentOrderByWithRelationInput;
  }): Promise<Equipment[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.equipment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async equipment(where: Prisma.EquipmentWhereUniqueInput): Promise<Equipment | null> {
    return this.prisma.equipment.findUnique({ where });
  }

  async createEquipment(data: Prisma.EquipmentCreateInput) {
    return this.prisma.equipment.create({ data });
  }

  async updateEquipment(params: { where: Prisma.EquipmentWhereUniqueInput; data: Prisma.EquipmentUpdateInput }) {
    const { where, data } = params;
    return this.prisma.equipment.update({ data, where });
  }

  async deleteEquipment(where: Prisma.EquipmentWhereUniqueInput): Promise<Equipment> {
    return this.prisma.equipment.delete({ where });
  }
}
