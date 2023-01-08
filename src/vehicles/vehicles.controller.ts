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
import { Prisma, Vehicle, VehiclePart } from '@prisma/client';
import { CreateVehicleDto, UpdateVehicleDto, VehicleResponse } from './vehicles.dto';
import { VehiclesService } from './vehicles.service';
import { VehiclePartsService } from './parts.service';
import { VehiclePartResponse, CreateVehiclePartDto, UpdateVehiclePartDto } from './parts.dto';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly vehiclePartsService: VehiclePartsService,
  ) {}

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

  @Post('parts')
  @ApiOkResponse({ description: 'Returns the created part', type: VehiclePartResponse })
  async createPart(@Body() createVehiclePartDto: CreateVehiclePartDto): Promise<VehiclePart> {
    return this.vehiclePartsService.createVehiclePart(createVehiclePartDto);
  }

  @Get('parts/:id')
  @ApiOkResponse({ description: 'Returns the part', type: VehiclePartResponse })
  async findPartById(@Param('id') id: string): Promise<VehiclePart | null> {
    return this.vehiclePartsService.vehiclePart({ id });
  }

  @Patch('parts/:id')
  @ApiOkResponse({ description: 'Returns the updated part', type: VehiclePartResponse })
  async updatePart(@Param('id') id: string, @Body() updatePartDto: UpdateVehiclePartDto): Promise<VehiclePart> {
    return this.vehiclePartsService.updateVehiclePart({ where: { id }, data: updatePartDto });
  }

  @Delete('parts/:id')
  @ApiOkResponse({ description: 'Returns the deleted part', type: VehiclePartResponse })
  async deletePart(@Param('id') id: string): Promise<VehiclePart> {
    return this.vehiclePartsService.deleteVehiclePart({ id });
  }

  @Get('parts')
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiQuery({ name: 'orderBy', required: false, enum: Prisma.VehiclePartScalarFieldEnum })
  async listParts(
    @Query('name') name?: string,
    @Query('sort', new DefaultValuePipe(Prisma.SortOrder.asc)) sort?: Prisma.SortOrder,
    @Query(
      'orderBy',
      new DefaultValuePipe(Prisma.VehiclePartScalarFieldEnum.updatedAt),
      new ParseEnumPipe(Prisma.VehiclePartScalarFieldEnum),
    )
    orderBy?: Prisma.VehiclePartScalarFieldEnum,
  ): Promise<VehiclePart[]> {
    return this.vehiclePartsService.listVehiclePart({
      orderBy: { [orderBy]: sort },
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }
}
