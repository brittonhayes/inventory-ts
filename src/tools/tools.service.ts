import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateToolDto, UpdateToolDto } from './dto/tools.dto';

@Injectable()
export class ToolsService {
  constructor(private prisma: PrismaService) {}

  async listTools(params: {
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

  async findTool(id: string) {
    return this.prisma.tool.findUnique({ where: { id } });
  }

  async createTool(createToolDto: CreateToolDto) {
    return this.prisma.tool.create({ data: createToolDto });
  }

  async updateTool(id: string, updateToolDto: UpdateToolDto) {
    return this.prisma.tool.update({
      data: updateToolDto,
      where: {
        id,
      },
    });
  }

  async deleteTool(id: string) {
    return this.prisma.tool.delete({ where: { id } });
  }
}
