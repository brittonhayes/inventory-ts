import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { AccessTokenGuard } from '../common/guards/token.guard';
import { ImplementResponse } from './dto/implements.dto';
import { CreateVehiclePartDto, UpdateVehiclePartDto, VehiclePart, VehiclePartResponse } from './dto/parts.dto';
import { CreateVehicleDto, UpdateVehicleDto, VehicleResponse } from './dto/vehicles.dto';
import { VehiclePartsService } from './parts/parts.service';
import { VehiclesService } from './vehicles.service';

@ApiTags('vehicles')
@ApiBearerAuth()
@Controller('vehicles')
@UseGuards(AccessTokenGuard)
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
    return this.vehiclesService.findVehicleById(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Returns the updated vehicle', type: VehicleResponse, status: HttpStatus.OK })
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
  @ApiQuery({ name: 'limit', required: false, type: Number })
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
    @Query('limit', new DefaultValuePipe(15), new ParseIntPipe()) limit?: number,
  ) {
    return this.vehiclesService.listVehicles({
      orderBy: { [orderBy]: sort },
      take: limit ? limit : 15,
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }

  @Get(':id/implements')
  @ApiOkResponse({
    description: 'Returns the compatible implements for the vehicle',
    isArray: true,
    type: ImplementResponse,
  })
  async getCompatibleImplements(@Param('id') id: string) {
    return this.vehiclesService.listCompatibleImplements(id);
  }

  @Get(':id/parts')
  @ApiOkResponse({
    description: 'Returns the compatible parts for the vehicle',
    isArray: true,
    type: VehiclePartResponse,
  })
  async getCompatibleParts(@Param('id') id: string) {
    return this.vehiclesService.listCompatibleParts(id);
  }

  @Post('parts')
  @ApiOkResponse({ description: 'Returns the created part', type: VehiclePart })
  async createVehiclePart(@Body() createVehiclePartDto: CreateVehiclePartDto) {
    return this.vehiclePartsService.createVehiclePart(createVehiclePartDto);
  }

  @Get('parts/:id')
  @ApiOkResponse({ description: 'Returns the part', type: VehiclePart })
  async findVehiclePartById(@Param('id') id: string) {
    return this.vehiclePartsService.findVehiclePartById(id);
  }

  @Patch('parts/:id')
  @ApiOkResponse({ description: 'Returns the updated part', type: VehiclePart })
  async updateVehiclePart(@Param('id') id: string, @Body() updatePartDto: UpdateVehiclePartDto) {
    return this.vehiclePartsService.updateVehiclePart(id, updatePartDto);
  }

  @Delete('parts/:id')
  @ApiOkResponse({ description: 'Returns the deleted part', type: VehiclePart })
  async deleteVehiclePart(@Param('id') id: string) {
    return this.vehiclePartsService.deleteVehiclePart(id);
  }

  @Get('parts')
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiQuery({ name: 'orderBy', required: false, enum: Prisma.VehiclePartScalarFieldEnum })
  @ApiOkResponse({ type: VehiclePart, isArray: true, description: 'Returns the parts' })
  async listVehicleParts(
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
