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
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Prisma, Tool } from '@prisma/client';
import { CreateToolDto, ToolResponse, UpdateToolDto } from './tools.dto';
import { ToolsService } from './tools.service';

@ApiTags('tools')
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post()
  @ApiOkResponse({ description: 'Returns the created tool', type: ToolResponse })
  async create(@Body() createToolDto: CreateToolDto): Promise<Tool> {
    return this.toolsService.createTool(createToolDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns the tool', type: ToolResponse })
  async findById(@Param('id') id: string): Promise<Tool | null> {
    return this.toolsService.tool({ id });
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Returns the updated tool', type: ToolResponse })
  async update(@Param('id') id: string, @Body() updateToolDto: UpdateToolDto): Promise<Tool> {
    return this.toolsService.updateTool({ where: { id }, data: updateToolDto });
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Returns the deleted tool', type: ToolResponse })
  async delete(@Param('id') id: string): Promise<Tool> {
    return this.toolsService.deleteTool({ id });
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiQuery({ name: 'orderBy', required: false, enum: Prisma.ToolScalarFieldEnum })
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
