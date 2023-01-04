import {
  Body,
  Controller,
  Query,
  Param,
  Post,
  Get,
  Patch,
  Delete,
  DefaultValuePipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Implement, Prisma } from '@prisma/client';
import { CreateImplementDto, ImplementResponse, UpdateImplementDto } from './implements.dto';
import { ImplementsService } from './implements.service';

@ApiTags('implements')
@Controller('implements')
export class ImplementsController {
  constructor(private readonly implementsService: ImplementsService) {}

  @Post()
  @ApiOkResponse({ description: 'Returns the created implement', type: ImplementResponse })
  async create(@Body() createImplementDto: CreateImplementDto): Promise<Implement> {
    return this.implementsService.createImplement(createImplementDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns the implement', type: ImplementResponse })
  async findById(@Param('id') id: string): Promise<Implement | null> {
    return this.implementsService.implement({ id });
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Returns the updated location', type: ImplementResponse })
  async update(@Param('id') id: string, @Body() updateImplementDto: UpdateImplementDto): Promise<Implement> {
    return this.implementsService.updateImplement({ where: { id }, data: updateImplementDto });
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Returns the deleted location', type: ImplementResponse })
  async delete(@Param('id') id: string): Promise<Implement> {
    return this.implementsService.deleteImplement({ id });
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiQuery({ name: 'orderBy', required: false, enum: Prisma.ImplementScalarFieldEnum })
  @ApiOkResponse({ description: 'Returns all implements', type: ImplementResponse, isArray: true })
  async list(
    @Query('name') name?: string,
    @Query('sort', new DefaultValuePipe(Prisma.SortOrder.asc)) sort?: Prisma.SortOrder,
    @Query(
      'orderBy',
      new DefaultValuePipe(Prisma.ImplementScalarFieldEnum.updatedAt),
      new ParseEnumPipe(Prisma.ImplementScalarFieldEnum),
    )
    orderBy?: Prisma.ImplementScalarFieldEnum,
  ): Promise<Implement[]> {
    return this.implementsService.implements({
      orderBy: { [orderBy]: sort },
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }
}
