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
import { Prisma } from '@prisma/client';
import { CreateVehiclePartDto, UpdateVehiclePartDto, VehiclePart } from 'src/vehicles/dto/parts.dto';
import { CreateVehicleDto, UpdateVehicleDto, VehicleResponse } from 'src/vehicles/dto/vehicles.dto';
import { VehiclePartsService } from './parts.service';
import { VehiclesService } from './vehicles.service';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly vehiclePartsService: VehiclePartsService,
  ) {}

  @Post()
  @ApiOkResponse({ description: 'Returns the created vehicle', type: VehicleResponse })
  async createVehicle(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.createVehicle(createVehicleDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns the vehicle', type: VehicleResponse })
  async findVehicleById(@Param('id') id: string) {
    return this.vehiclesService.vehicle(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Returns the updated vehicle', type: VehicleResponse })
  async updateVehicle(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.updateVehicle(id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Returns the deleted vehicle', type: VehicleResponse })
  async deleteVehicle(@Param('id') id: string) {
    return this.vehiclesService.deleteVehicle(id);
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiQuery({ name: 'orderBy', required: false, enum: Prisma.VehicleScalarFieldEnum })
  @ApiOkResponse({
    description: 'Returns the vehicles',
    isArray: true,
    type: VehicleResponse,
  })
  async listVehicles(
    @Query('name') name?: string,
    @Query('sort', new DefaultValuePipe(Prisma.SortOrder.asc)) sort?: Prisma.SortOrder,
    @Query(
      'orderBy',
      new DefaultValuePipe(Prisma.VehicleScalarFieldEnum.updatedAt),
      new ParseEnumPipe(Prisma.VehicleScalarFieldEnum),
    )
    orderBy?: Prisma.VehicleScalarFieldEnum,
  ) {
    return this.vehiclesService.vehicles({
      orderBy: { [orderBy]: sort },
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }

  @Post('parts')
  @ApiOkResponse({ description: 'Returns the created part', type: VehiclePart })
  async createPart(@Body() createVehiclePartDto: CreateVehiclePartDto) {
    return this.vehiclePartsService.createVehiclePart(createVehiclePartDto);
  }

  @Get('parts/:id')
  @ApiOkResponse({ description: 'Returns the part', type: VehiclePart })
  async findPartById(@Param('id') id: string) {
    return this.vehiclePartsService.findVehiclePart(id);
  }

  @Patch('parts/:id')
  @ApiOkResponse({ description: 'Returns the updated part', type: VehiclePart })
  async updatePart(@Param('id') id: string, @Body() updatePartDto: UpdateVehiclePartDto) {
    return this.vehiclePartsService.updateVehiclePart(id, updatePartDto);
  }

  @Delete('parts/:id')
  @ApiOkResponse({ description: 'Returns the deleted part', type: VehiclePart })
  async deletePart(@Param('id') id: string) {
    return this.vehiclePartsService.deleteVehiclePart(id);
  }

  @Get('parts')
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiQuery({ name: 'orderBy', required: false, enum: Prisma.VehiclePartScalarFieldEnum })
  @ApiOkResponse({ type: VehiclePart, isArray: true, description: 'Returns the parts' })
  async listParts(
    @Query('name') name?: string,
    @Query('sort', new DefaultValuePipe(Prisma.SortOrder.asc)) sort?: Prisma.SortOrder,
    @Query(
      'orderBy',
      new DefaultValuePipe(Prisma.VehiclePartScalarFieldEnum.updatedAt),
      new ParseEnumPipe(Prisma.VehiclePartScalarFieldEnum),
    )
    orderBy?: Prisma.VehiclePartScalarFieldEnum,
  ) {
    return this.vehiclePartsService.listVehicleParts({
      orderBy: { [orderBy]: sort },
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }
}
