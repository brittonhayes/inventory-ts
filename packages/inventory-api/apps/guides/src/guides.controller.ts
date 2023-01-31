import { Body, Controller, DefaultValuePipe, Logger, Param, ParseEnumPipe, Query } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { Guide } from './entities/guide.entity';
import { GuidesService } from './guides.service';

@ApiTags('guides')
@ApiBearerAuth()
@Controller('guides')
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}

  @MessagePattern('createGuide')
  @ApiOkResponse({ description: 'Returns the created maintenance guide', type: Guide })
  async createGuide(@Body() createGuideDto: CreateGuideDto) {
    return this.guidesService.create(createGuideDto);
  }

  @MessagePattern('findGuideById')
  @ApiOkResponse({ description: 'Returns the maintenance guide', type: Guide })
  async findGuideById(@Param('id') id: string) {
    return this.guidesService.findById(id);
  }

  @MessagePattern('updateGuide')
  @ApiOkResponse({ description: 'Returns the updated maintenance guide', type: Guide })
  async updateGuide(@Param('id') id: string, @Body() updateMaintenanceGuideDto: UpdateGuideDto) {
    return this.guidesService.update(id, updateMaintenanceGuideDto);
  }

  @MessagePattern('deleteGuide')
  @ApiOkResponse({ description: 'Returns the deleted maintenance guide', type: Guide })
  async deleteGuide(@Param('id') id: string) {
    return this.guidesService.delete(id);
  }

  @EventPattern('guide_list_requested')
  async listGuides() {
    Logger.log('requested list guides');
    return this.guidesService.list({});
  }
}
