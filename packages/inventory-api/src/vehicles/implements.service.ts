import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateImplementDto, UpdateImplementDto } from './dto/implements.dto';

@Injectable()
export class ImplementsService {
  constructor(private prisma: PrismaService) {}

  async listImplements(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ImplementWhereUniqueInput;
    orderBy?: Prisma.ImplementOrderByWithRelationInput;
    where?: Prisma.ImplementWhereInput;
    include?: Prisma.ImplementInclude;
  }) {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.implement.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  async findImplementById(id: string) {
    return this.prisma.implement.findUnique({ where: { id } });
  }

  async createImplement(createImplementDto: CreateImplementDto) {
    return this.prisma.implement.create({
      data: createImplementDto,
    });
  }

  async updateImplement(id: string, updateImplementDto: UpdateImplementDto) {
    return this.prisma.implement.update({
      where: {
        id,
      },
      data: updateImplementDto,
    });
  }

  async deleteImplement(id: string) {
    return this.prisma.implement.delete({
      where: { id },
    });
  }
}