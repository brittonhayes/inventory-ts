import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { AccessTokenGuard } from '../common/guards/token.guard';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { Tool } from './entities/tool.entity';

import { ToolsService } from './tools.service';

@ApiTags('tools')
@ApiBearerAuth()
@Controller('tools')
@UseGuards(AccessTokenGuard)
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post()
  @ApiOkResponse({ description: 'Returns the created tool', type: Tool })
  async create(@Body() createToolDto: CreateToolDto) {
    return this.toolsService.create(createToolDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns the tool', type: Tool })
  async findById(@Param('id') id: string) {
    return this.toolsService.findById(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Returns the updated tool', type: Tool })
  async update(@Param('id') id: string, @Body() updateToolDto: UpdateToolDto) {
    return this.toolsService.update(id, updateToolDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Returns the deleted tool', type: Tool })
  async delete(@Param('id') id: string) {
    return this.toolsService.delete(id);
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiQuery({ name: 'orderBy', required: false, enum: Prisma.ToolScalarFieldEnum })
  @ApiOkResponse({ description: 'Returns the list of tools', type: Tool, isArray: true })
  async list(
    @Query('name') name?: string,
    @Query('sort', new DefaultValuePipe(Prisma.SortOrder.asc)) sort?: Prisma.SortOrder,
    @Query(
      'orderBy',
      new DefaultValuePipe(Prisma.ToolScalarFieldEnum.name),
      new ParseEnumPipe(Prisma.ToolScalarFieldEnum),
    )
    orderBy?: Prisma.ToolScalarFieldEnum,
  ) {
    return this.toolsService.list({
      orderBy: { [orderBy]: sort },
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }
}
