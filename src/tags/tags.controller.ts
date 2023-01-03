import { Body, Controller, DefaultValuePipe, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Prisma, Tag } from '@prisma/client';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async create(@Body() data: Prisma.TagCreateInput): Promise<Tag> {
    return this.tagsService.createTag(data);
  }

  @Get(':name')
  async findById(@Param('name') name: string): Promise<Tag | null> {
    return this.tagsService.tag({ name });
  }

  @Patch(':name')
  async update(@Param('name') name: string, @Body() tag: Prisma.TagCreateInput): Promise<Tag> {
    return this.tagsService.updateTag({ where: { name }, data: tag });
  }

  @Delete(':name')
  async delete(@Param('name') name: string): Promise<Tag> {
    return this.tagsService.deleteTag({ name });
  }

  @Get()
  async list(
    @Query('name') name?: string,
    @Query('sort', new DefaultValuePipe(Prisma.SortOrder.asc)) sort?: Prisma.SortOrder,
  ): Promise<Tag[]> {
    return this.tagsService.tags({
      orderBy: { name: sort },
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }
}
