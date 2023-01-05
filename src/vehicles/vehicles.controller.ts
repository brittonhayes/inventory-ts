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
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Prisma, Vehicle } from '@prisma/client';
import { CreateVehicleDto, UpdateVehicleDto, VehicleResponse } from './vehicles.dto';
import { VehiclesService } from './vehicles.service';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @ApiOkResponse({ description: 'Returns the created vehicle', type: VehicleResponse })
  async create(@Body() createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehiclesService.createVehicle(createVehicleDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns the vehicle', type: VehicleResponse })
  async findById(@Param('id') id: string): Promise<Vehicle | null> {
    return this.vehiclesService.vehicle({ id });
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Returns the updated vehicle', type: VehicleResponse })
  async update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    return this.vehiclesService.updateVehicle({ where: { id }, data: updateVehicleDto });
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Returns the deleted vehicle', type: VehicleResponse })
  async delete(@Param('id') id: string): Promise<Vehicle> {
    return this.vehiclesService.deleteVehicle({ id });
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiQuery({ name: 'orderBy', required: false, enum: Prisma.VehicleScalarFieldEnum })
  @ApiOkResponse({ description: 'Returns the vehicles', type: [VehicleResponse] })
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
