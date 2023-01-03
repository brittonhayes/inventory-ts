import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  DefaultValuePipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { Prisma, Tool } from '@prisma/client';
import { ToolsService } from './tools.service';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post()
  async create(@Body() data: Prisma.ToolCreateInput): Promise<Tool> {
    return this.toolsService.createTool(data);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Tool | null> {
    return this.toolsService.tool({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() tool: Prisma.ToolCreateInput): Promise<Tool> {
    return this.toolsService.updateTool({ where: { id }, data: tool });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Tool> {
    return this.toolsService.deleteTool({ id });
  }

  @Get()
  async list(
    @Query('name') name?: string,
    @Query('sort', new DefaultValuePipe(Prisma.SortOrder.asc)) sort?: Prisma.SortOrder,
    @Query(
      'orderBy',
      new DefaultValuePipe(Prisma.ToolScalarFieldEnum.updatedAt),
      new ParseEnumPipe(Prisma.ToolScalarFieldEnum),
    )
    orderBy?: Prisma.ToolScalarFieldEnum,
  ): Promise<Tool[]> {
    return this.toolsService.tools({
      orderBy: { [orderBy]: sort },
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }
}
