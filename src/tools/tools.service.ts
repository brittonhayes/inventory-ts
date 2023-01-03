import { Injectable } from '@nestjs/common';
import { Prisma, Tool } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ToolsService {
  constructor(private prisma: PrismaService) {}

  async tools(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ToolWhereUniqueInput;
    where?: Prisma.ToolWhereInput;
    orderBy?: Prisma.ToolOrderByWithRelationInput;
  }): Promise<Tool[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.tool.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async tool(where: Prisma.ToolWhereUniqueInput): Promise<Tool | null> {
    return this.prisma.tool.findUnique({ where });
  }

  async createTool(data: Prisma.ToolCreateInput): Promise<Tool> {
    return this.prisma.tool.create({ data });
  }

  async updateTool(params: { where: Prisma.ToolWhereUniqueInput; data: Prisma.ToolUpdateInput }): Promise<Tool> {
    const { where, data } = params;
    return this.prisma.tool.update({ data, where });
  }

  async deleteTool(where: Prisma.ToolWhereUniqueInput): Promise<Tool> {
    return this.prisma.tool.delete({ where });
  }
}
