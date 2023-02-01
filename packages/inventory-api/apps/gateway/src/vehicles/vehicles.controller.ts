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
import { AccessTokenGuard } from '@app/common/guards/token.guard';
import { ImplementResponse } from '../implements/entities/implement-response.entity';
import { VehiclePart } from '../parts/entities/part.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { VehiclesService } from './vehicles.service';

@ApiTags('vehicles')
@ApiBearerAuth()
@Controller('vehicles')
@UseGuards(AccessTokenGuard)
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @ApiOkResponse({ description: 'Returns the created vehicle', type: Vehicle })
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.createVehicle(createVehicleDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns the vehicle', type: Vehicle })
  async findById(@Param('id') id: string) {
    return this.vehiclesService.findVehicleById(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Returns the updated vehicle', type: Vehicle, status: HttpStatus.OK })
  async update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.updateVehicle(id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Returns the deleted vehicle', type: Vehicle })
  async delete(@Param('id') id: string) {
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
    type: Vehicle,
  })
  async list(
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
  async listCompatibleImplements(@Param('id') id: string) {
    return this.vehiclesService.listCompatibleImplements(id);
  }

  @Get(':id/parts')
  @ApiOkResponse({
    description: 'Returns the compatible parts for the vehicle',
    isArray: true,
    type: VehiclePart,
  })
  async getCompatibleParts(@Param('id') id: string) {
    return this.vehiclesService.listCompatibleParts(id);
  }
}
