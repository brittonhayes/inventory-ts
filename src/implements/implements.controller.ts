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
import { Implement, Prisma } from '@prisma/client';
import { ImplementsService } from './implements.service';

@Controller('implements')
export class ImplementsController {
  constructor(private readonly implementsService: ImplementsService) {}

  @Post()
  async create(@Body() data: Prisma.ImplementCreateInput): Promise<Implement> {
    return this.implementsService.createImplement(data);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Implement | null> {
    return this.implementsService.implement({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() implement: Prisma.ImplementCreateInput): Promise<Implement> {
    return this.implementsService.updateImplement({ where: { id }, data: implement });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Implement> {
    return this.implementsService.deleteImplement({ id });
  }

  @Get()
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
