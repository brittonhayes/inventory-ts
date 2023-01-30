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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { AccessTokenGuard } from '../common/guards/token.guard';
import { CreateImplementDto } from './dto/create-implement.dto';
import { UpdateImplementDto } from './dto/update-implement.dto';
import { ImplementResponse } from './entities/implement-response.entity';
import { ImplementsService } from './implements.service';

@ApiTags('implements')
@ApiBearerAuth()
@Controller('implements')
@UseGuards(AccessTokenGuard)
export class ImplementsController {
  constructor(private readonly implementsService: ImplementsService) {}

  @Post()
  @ApiOkResponse({ description: 'Returns the created implement', type: ImplementResponse })
  async create(@Body() createImplementDto: CreateImplementDto) {
    return this.implementsService.create(createImplementDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns the implement', type: ImplementResponse })
  async findById(@Param('id') id: string) {
    return this.implementsService.findById(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Returns the updated implement', type: ImplementResponse })
  async update(@Param('id') id: string, @Body() updateImplementDto: UpdateImplementDto) {
    return this.implementsService.update(id, updateImplementDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Returns the deleted implement', type: ImplementResponse })
  async delete(@Param('id') id: string) {
    return this.implementsService.delete(id);
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
  async list(
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
    return this.implementsService.list({
      orderBy: { [orderBy]: sort },
      take: limit ? limit : 15,
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }
}
