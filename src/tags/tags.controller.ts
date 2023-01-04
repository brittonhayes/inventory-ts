import { Body, Controller, DefaultValuePipe, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Prisma, Tag } from '@prisma/client';
import { CreateTagDto, TagResponse, UpdateTagDto } from './tags.dto';
import { TagsService } from './tags.service';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOkResponse({ description: 'Returns the created tag', type: TagResponse })
  async create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagsService.createTag(createTagDto);
  }

  @Get(':name')
  @ApiOkResponse({ description: 'Returns the tag', type: TagResponse })
  async findById(@Param('name') name: string): Promise<Tag | null> {
    return this.tagsService.tag({ name });
  }

  @Patch(':name')
  @ApiOkResponse({ description: 'Returns the updated tag', type: TagResponse })
  async update(@Param('name') name: string, @Body() updateTagDto: UpdateTagDto): Promise<Tag> {
    return this.tagsService.updateTag({ where: { name }, data: updateTagDto });
  }

  @Delete(':name')
  @ApiOkResponse({ description: 'Returns the deleted tag', type: TagResponse })
  async delete(@Param('name') name: string): Promise<Tag> {
    return this.tagsService.deleteTag({ name });
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiOkResponse({ description: 'Returns the tags', type: [TagResponse] })
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
