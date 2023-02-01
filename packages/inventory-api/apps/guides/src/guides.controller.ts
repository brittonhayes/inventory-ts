import { ClassSerializerInterceptor, Controller, Inject, UseInterceptors } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { GuidesService } from './guides.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { Guide } from './entities/guide.entity';
import { GuideRequest, GUIDE_SERVICE_NAME, ListGuidesRequest } from '@app/grpc/proto/guide.pb';
import { Prisma } from '@prisma/client';

@Controller('guides')
@UseInterceptors(ClassSerializerInterceptor)
export class GuidesController {
  @Inject(GuidesService)
  private readonly service: GuidesService;

  @GrpcMethod(GUIDE_SERVICE_NAME, 'CreateGuide')
  @ApiOkResponse({ description: 'Returns the created maintenance guide', type: Guide })
  async createGuide(createGuideDto: CreateGuideDto) {
    return this.service.create(createGuideDto);
  }

  @GrpcMethod(GUIDE_SERVICE_NAME, 'FindGuide')
  @ApiOkResponse({ description: 'Returns the maintenance guide', type: Guide })
  async findGuideById(data: GuideRequest) {
    return this.service.findById(data.id);
  }

  @GrpcMethod(GUIDE_SERVICE_NAME, 'UpdateGuide')
  @ApiOkResponse({ description: 'Returns the updated maintenance guide', type: Guide })
  async updateGuide(id: string, updateMaintenanceGuideDto: UpdateGuideDto) {
    return this.service.update(id, updateMaintenanceGuideDto);
  }

  @GrpcMethod(GUIDE_SERVICE_NAME, 'DeleteGuide')
  @ApiOkResponse({ description: 'Returns the deleted maintenance guide', type: Guide })
  async deleteGuide(id: string) {
    return this.service.delete(id);
  }

  @GrpcMethod(GUIDE_SERVICE_NAME, 'ListGuides')
  @ApiOkResponse({ description: 'Returns the  guides', isArray: true, type: Guide })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiQuery({ name: 'orderBy', required: false, enum: Prisma.GuideScalarFieldEnum })
  async listGuides(data: ListGuidesRequest) {
    return {
      guides: await this.service.list(data),
    };
  }
}
