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
import { Prisma } from '@prisma/client';
import { CreateToolDto, Tool, UpdateToolDto } from './dto/tools.dto';
import { ToolsService } from './tools.service';

@ApiTags('tools')
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post()
  @ApiOkResponse({ description: 'Returns the created tool', type: Tool })
  async createTool(@Body() createToolDto: CreateToolDto) {
    return this.toolsService.createTool(createToolDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns the tool', type: Tool })
  async findToolById(@Param('id') id: string) {
    return this.toolsService.findTool(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Returns the updated tool', type: Tool })
  async updateTool(@Param('id') id: string, @Body() updateToolDto: UpdateToolDto) {
    return this.toolsService.updateTool(id, updateToolDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Returns the deleted tool', type: Tool })
  async deleteTool(@Param('id') id: string) {
    return this.toolsService.deleteTool(id);
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiQuery({ name: 'orderBy', required: false, enum: Prisma.ToolScalarFieldEnum })
  async listTools(
    @Query('name') name?: string,
    @Query('sort', new DefaultValuePipe(Prisma.SortOrder.asc)) sort?: Prisma.SortOrder,
    @Query(
      'orderBy',
      new DefaultValuePipe(Prisma.ToolScalarFieldEnum.name),
      new ParseEnumPipe(Prisma.ToolScalarFieldEnum),
    )
    orderBy?: Prisma.ToolScalarFieldEnum,
  ): Promise<Tool[]> {
    return this.toolsService.listTools({
      orderBy: { [orderBy]: sort },
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }
}
