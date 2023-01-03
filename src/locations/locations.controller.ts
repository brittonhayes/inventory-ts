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
import { Prisma, Location } from '@prisma/client';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  async create(@Body() data: Prisma.LocationCreateInput): Promise<Location> {
    return this.locationsService.createLocation(data);
  }

  @Get(':name')
  async findByName(@Param('name') name: string): Promise<Location | null> {
    return this.locationsService.location({ name });
  }

  @Patch(':name')
  async update(@Param('name') name: string, @Body() location: Prisma.LocationCreateInput): Promise<Location> {
    return this.locationsService.updateLocation({ where: { name }, data: location });
  }

  @Delete(':name')
  async delete(@Param('name') name: string): Promise<Location> {
    return this.locationsService.deleteLocation({ name });
  }

  @Get()
  async list(
    @Query('name') name?: string,
    @Query('sort', new DefaultValuePipe(Prisma.SortOrder.asc)) sort?: Prisma.SortOrder,
    @Query(
      'orderBy',
      new DefaultValuePipe(Prisma.LocationScalarFieldEnum.updatedAt),
      new ParseEnumPipe(Prisma.LocationScalarFieldEnum),
    )
    orderBy?: Prisma.LocationScalarFieldEnum,
  ): Promise<Location[]> {
    return this.locationsService.locations({
      orderBy: { [orderBy]: sort },
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }
}
