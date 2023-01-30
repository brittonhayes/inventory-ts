import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';

@Injectable()
export class ToolsService {
  constructor(private prisma: PrismaService) {}

  async list(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ToolWhereUniqueInput;
    where?: Prisma.ToolWhereInput;
    orderBy?: Prisma.ToolOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.tool.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findById(id: string) {
    return this.prisma.tool.findUnique({ where: { id } });
  }

  async create(createToolDto: CreateToolDto) {
    return this.prisma.tool.create({ data: createToolDto });
  }

  async update(id: string, updateToolDto: UpdateToolDto) {
    return this.prisma.tool.update({
      data: updateToolDto,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.tool.delete({ where: { id } });
  }
}
