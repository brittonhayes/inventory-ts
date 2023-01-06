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
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Location, Prisma } from '@prisma/client';
import { CreateLocationDto, LocationResponse, UpdateLocationDto } from './locations.dto';
import { LocationsService } from './locations.service';

@ApiTags('locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @ApiOkResponse({ description: 'Returns the created location', type: LocationResponse })
  async create(@Body() createLocationDto: CreateLocationDto): Promise<Location> {
    return this.locationsService.createLocation(createLocationDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns the location', type: LocationResponse })
  async findByName(@Param('id') id: string): Promise<Location | null> {
    return this.locationsService.location({ id });
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Returns the updated location', type: LocationResponse })
  async update(@Param('id') id: string, @Body() location: UpdateLocationDto): Promise<Location> {
    return this.locationsService.updateLocation({ where: { id }, data: location });
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Returns the deleted location', type: LocationResponse })
  async delete(@Param('id') id: string): Promise<Location> {
    return this.locationsService.deleteLocation({ id });
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiQuery({ name: 'orderBy', required: false, enum: Prisma.LocationScalarFieldEnum })
  @ApiOkResponse({ description: 'Returns all locations', type: LocationResponse, isArray: true })
  async list(
    @Query('name') name?: string,
    @Query('sort', new DefaultValuePipe(Prisma.SortOrder.asc)) sort?: Prisma.SortOrder,
    @Query(
      'orderBy',
      new DefaultValuePipe(Prisma.LocationScalarFieldEnum.updatedAt),
      new ParseEnumPipe(Prisma.LocationScalarFieldEnum),
    )
    orderBy?: Prisma.LocationScalarFieldEnum,
    @Query('cursor') cursor?: Prisma.LocationWhereUniqueInput,
  ): Promise<Location[]> {
    return this.locationsService.locations({
      orderBy: { [orderBy]: sort },
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }
}
