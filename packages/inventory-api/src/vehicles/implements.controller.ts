import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CreateImplementDto, UpdateImplementDto, ImplementResponse } from './dto/implements.dto';
import { ImplementsService } from './implements.service';

@ApiTags('implements')
@Controller('implements')
export class ImplementsController {
  constructor(private readonly implementsService: ImplementsService) {}

  @Post()
  @ApiOkResponse({ description: 'Returns the created implement', type: ImplementResponse })
  async createImplement(@Body() createImplementDto: CreateImplementDto) {
    return this.implementsService.createImplement(createImplementDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns the implement', type: ImplementResponse })
  async findImplementById(@Param('id') id: string) {
    return this.implementsService.findImplementById(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Returns the updated implement', type: ImplementResponse })
  async updateImplement(@Param('id') id: string, @Body() updateImplementDto: UpdateImplementDto) {
    return this.implementsService.updateImplement(id, updateImplementDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Returns the deleted implement', type: ImplementResponse })
  async deleteImplement(@Param('id') id: string) {
    return this.implementsService.deleteImplement(id);
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiQuery({ name: 'orderBy', required: false, enum: Prisma.ImplementScalarFieldEnum })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOkResponse({
    description: 'Returns the implements',
    isArray: true,
    type: ImplementResponse,
  })
  async listImplements(
    @Query('name') name?: string,
    @Query('sort', new DefaultValuePipe(Prisma.SortOrder.asc)) sort?: Prisma.SortOrder,
    @Query(
      'orderBy',
      new DefaultValuePipe(Prisma.ImplementScalarFieldEnum.updatedAt),
      new ParseEnumPipe(Prisma.ImplementScalarFieldEnum),
    )
    orderBy?: Prisma.ImplementScalarFieldEnum,
    @Query('limit', new DefaultValuePipe(15), ParseIntPipe) limit?: number,
  ) {
    return this.implementsService.listImplements({
      orderBy: { [orderBy]: sort },
      take: limit ? limit : 15,
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }
}
