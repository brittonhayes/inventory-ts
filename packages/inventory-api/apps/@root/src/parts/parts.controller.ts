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
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { AccessTokenGuard } from '@app/common/guards/token.guard';
import { CreateVehiclePartDto } from './dto/create-part.dto';
import { UpdateVehiclePartDto } from './dto/update-part.dto';
import { VehiclePart } from './entities/part.entity';
import { VehiclePartsService } from './parts.service';

@ApiTags('parts')
@ApiBearerAuth()
@Controller('parts')
@UseGuards(AccessTokenGuard)
export class VehiclePartsController {
  constructor(private readonly vehiclePartsService: VehiclePartsService) {}

  @Post()
  @ApiOkResponse({ description: 'Returns the created part', type: VehiclePart })
  async createVehiclePart(@Body() createVehiclePartDto: CreateVehiclePartDto) {
    return this.vehiclePartsService.create(createVehiclePartDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns the part', type: VehiclePart })
  async findVehiclePartById(@Param('id') id: string) {
    return this.vehiclePartsService.findById(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Returns the updated part', type: VehiclePart })
  async updateVehiclePart(@Param('id') id: string, @Body() updatePartDto: UpdateVehiclePartDto) {
    return this.vehiclePartsService.update(id, updatePartDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Returns the deleted part', type: VehiclePart })
  async deleteVehiclePart(@Param('id') id: string) {
    return this.vehiclePartsService.delete(id);
  }

  @Get()
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
    return this.vehiclePartsService.list({
      orderBy: { [orderBy]: sort },
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }
}
