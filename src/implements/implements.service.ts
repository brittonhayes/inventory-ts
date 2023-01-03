import { Injectable } from '@nestjs/common';
import { Implement, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ImplementsService {
  constructor(private prisma: PrismaService) {}

  async implements(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ImplementWhereUniqueInput;
    where?: Prisma.ImplementWhereInput;
    orderBy?: Prisma.ImplementOrderByWithRelationInput;
  }): Promise<Implement[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.implement.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async implement(where: Prisma.ImplementWhereUniqueInput): Promise<Implement | null> {
    return this.prisma.implement.findUnique({ where });
  }

  async createImplement(data: Prisma.ImplementCreateInput) {
    return this.prisma.implement.create({ data });
  }

  async updateImplement(params: { where: Prisma.ImplementWhereUniqueInput; data: Prisma.ImplementUpdateInput }) {
    const { where, data } = params;
    return this.prisma.implement.update({ data, where });
  }

  async deleteImplement(where: Prisma.ImplementWhereUniqueInput): Promise<Implement> {
    return this.prisma.implement.delete({ where });
  }
}
