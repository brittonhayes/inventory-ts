import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  DefaultValuePipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Prisma, Equipment } from '@prisma/client';
import { CreateEquipmentDto, EquipmentResponse, UpdateEquipmentDto } from './equipment.dto';
import { EquipmentService } from './equipment.service';

@ApiTags('equipment')
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post()
  @ApiOkResponse({ description: 'Returns the created equipment', type: EquipmentResponse })
  async create(@Body() createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
    return this.equipmentService.createEquipment(createEquipmentDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns the equipment', type: EquipmentResponse })
  async findById(@Param('id') id: string): Promise<Equipment | null> {
    return this.equipmentService.equipment({ id });
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Returns the updated equipment', type: EquipmentResponse })
  async update(@Param('id') id: string, @Body() updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment> {
    return this.equipmentService.updateEquipment({ where: { id }, data: updateEquipmentDto });
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Returns the deleted equipment', type: EquipmentResponse })
  async delete(@Param('id') id: string): Promise<Equipment> {
    return this.equipmentService.deleteEquipment({ id });
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiQuery({ name: 'orderBy', required: false, enum: Prisma.EquipmentScalarFieldEnum })
  async list(
    @Query('name') name?: string,
    @Query('sort', new DefaultValuePipe(Prisma.SortOrder.asc)) sort?: Prisma.SortOrder,
    @Query(
      'orderBy',
      new DefaultValuePipe(Prisma.EquipmentScalarFieldEnum.updatedAt),
      new ParseEnumPipe(Prisma.EquipmentScalarFieldEnum),
    )
    orderBy?: Prisma.EquipmentScalarFieldEnum,
  ): Promise<Equipment[]> {
    return this.equipmentService.listEquipment({
      orderBy: { [orderBy]: sort },
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }
}
