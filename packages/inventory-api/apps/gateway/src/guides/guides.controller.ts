import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseEnumPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  CreateGuideRequest,
  GuideServiceClient,
  GUIDE_SERVICE_NAME,
  OrderBy,
  SortDirection,
} from '@app/grpc/proto/guide.pb';
import { Guide } from 'apps/guides/src/entities/guide.entity';

@ApiTags('guides')
@Controller('guides')
export class GuidesController implements OnModuleInit {
  private service: GuideServiceClient;

  @Inject(GUIDE_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.service = this.client.getService<GuideServiceClient>(GUIDE_SERVICE_NAME);
  }

  @Post()
  @ApiOkResponse({ description: 'Returns the created  guide', type: Guide })
  async create(@Body() body: CreateGuideRequest) {
    return this.service.createGuide(body);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns the  guide', type: Guide })
  async findById(@Param('id') id: string) {
    return this.service.findGuide({
      id,
    });
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Returns the updated  guide', type: Guide })
  async update(@Param('id') id: string, @Body() body: CreateGuideRequest) {
    return this.service.updateGuide({
      id,
      ...body,
    });
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Returns the deleted  guide' })
  async delete(@Param('id') id: string) {
    return this.service.deleteGuide({
      id,
    });
  }

  @Get()
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'sortBy', required: false, enum: Prisma.SortOrder })
  @ApiQuery({ name: 'orderBy', required: false, enum: Prisma.GuideScalarFieldEnum })
  @ApiOkResponse({ description: 'Returns the  guides', isArray: true, type: Guide })
  async list(
    @Query('search') search?: string,
    @Query('sortBy', new DefaultValuePipe(SortDirection.asc), new ParseEnumPipe(SortDirection)) sort?: SortDirection,
    @Query('orderBy', new DefaultValuePipe(OrderBy.createdAt), new ParseEnumPipe(OrderBy))
    orderBy?: OrderBy,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.service.listGuides({
      skip: skip,
      take: take,
      sortBy: sort,
      orderBy: orderBy,
      search: search,
    });
  }
}
