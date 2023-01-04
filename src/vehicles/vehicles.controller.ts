import {
  Controller,
  Post,
  Get,
  Query,
  Patch,
  Body,
  Param,
  Delete,
  ParseEnumPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma, Vehicle } from '@prisma/client';
import { VehiclesService } from './vehicles.service';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  async create(@Body() data: Prisma.VehicleCreateInput): Promise<Vehicle> {
    return this.vehiclesService.createVehicle(data);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Vehicle | null> {
    return this.vehiclesService.vehicle({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() vehicle: Prisma.VehicleCreateInput): Promise<Vehicle> {
    return this.vehiclesService.updateVehicle({ where: { id }, data: vehicle });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Vehicle> {
    return this.vehiclesService.deleteVehicle({ id });
  }

  @Get()
  async list(
    @Query('name') name?: string,
    @Query('sort', new DefaultValuePipe(Prisma.SortOrder.asc)) sort?: Prisma.SortOrder,
    @Query(
      'orderBy',
      new DefaultValuePipe(Prisma.VehicleScalarFieldEnum.updatedAt),
      new ParseEnumPipe(Prisma.VehicleScalarFieldEnum),
    )
    orderBy?: Prisma.VehicleScalarFieldEnum,
  ): Promise<Vehicle[]> {
    return this.vehiclesService.vehicles({
      orderBy: { [orderBy]: sort },
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }
}
