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
import { CreateMaintenanceGuideDto, MaintenanceGuide, UpdateMaintenanceGuideDto } from './dto/guides.dto';
import { CreateMaintenanceTaskDto, MaintenanceTask, UpdateMaintenanceTaskDto } from './dto/tasks.dto';
import { MaintenanceGuidesService } from './guides.service';
import { MaintenanceTasksService } from './tasks.service';

@ApiTags('maintenance')
@Controller('maintenance')
export class MaintenanceController {
  constructor(
    private readonly maintenanceTasksService: MaintenanceTasksService,
    private readonly maintenanceGuidesService: MaintenanceGuidesService,
  ) {}

  @Post('/guides')
  @ApiOkResponse({ description: 'Returns the created maintenance guide', type: MaintenanceGuide })
  async createGuide(@Body() createMaintenanceGuideDto: CreateMaintenanceGuideDto) {
    return this.maintenanceGuidesService.createMaintenanceGuide(createMaintenanceGuideDto);
  }

  @Get('/guides/vehicle/:id')
  @ApiOkResponse({
    description: 'Returns the maintenance guides for the vehicle',
    type: MaintenanceGuide,
    isArray: true,
  })
  async findGuideByVehicle(@Param('id') id: string) {
    return this.maintenanceGuidesService.findMaintenanceGuideByVehicle(id);
  }

  @Get('/guides/:id/tasks')
  @ApiOkResponse({ description: 'Returns the maintenance tasks for the guide', type: MaintenanceTask, isArray: true })
  async findGuideTasks(@Param('id') id: string) {
    return this.maintenanceGuidesService.findMaintenanceGuideTasks(id);
  }

  @Get('/guides/:id')
  @ApiOkResponse({ description: 'Returns the maintenance guide', type: MaintenanceGuide })
  async findGuideById(@Param('id') id: string) {
    return this.maintenanceGuidesService.findMaintenanceGuide(id);
  }

  @Patch('/guides/:id')
  @ApiOkResponse({ description: 'Returns the updated maintenance guide', type: MaintenanceGuide })
  async updateGuide(@Param('id') id: string, @Body() updateMaintenanceGuideDto: UpdateMaintenanceGuideDto) {
    return this.maintenanceGuidesService.updateMaintenanceGuide(id, updateMaintenanceGuideDto);
  }

  @Delete('/guides/:id')
  @ApiOkResponse({ description: 'Returns the deleted maintenance guide', type: MaintenanceGuide })
  async deleteGuide(@Param('id') id: string) {
    return this.maintenanceGuidesService.deleteMaintenanceGuide(id);
  }

  @Get('/guides')
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiQuery({ name: 'orderBy', required: false, enum: Prisma.MaintenanceGuideScalarFieldEnum })
  @ApiOkResponse({ description: 'Returns the maintenance guides', type: MaintenanceGuide, isArray: true })
  async listGuides(
    @Query('name') name?: string,
    @Query('sort', new DefaultValuePipe(Prisma.SortOrder.asc)) sort?: Prisma.SortOrder,
    @Query(
      'orderBy',
      new DefaultValuePipe(Prisma.MaintenanceGuideScalarFieldEnum.updatedAt),
      new ParseEnumPipe(Prisma.MaintenanceGuideScalarFieldEnum),
    )
    orderBy?: Prisma.MaintenanceGuideScalarFieldEnum,
  ) {
    return this.maintenanceGuidesService.listMaintenanceGuides({
      orderBy: { [orderBy]: sort },
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }

  @Post('/tasks')
  @ApiOkResponse({ description: 'Returns the created maintenance task', type: MaintenanceTask })
  async createTask(@Body() createMaintenanceTaskDto: CreateMaintenanceTaskDto) {
    return this.maintenanceTasksService.createMaintenanceTask(createMaintenanceTaskDto);
  }

  @Get('/tasks/:id')
  @ApiOkResponse({ description: 'Returns the maintenance', type: MaintenanceTask })
  async findByTaskId(@Param('id') id: string) {
    return this.maintenanceTasksService.findMaintenanceTask({ id });
  }

  @Patch('/tasks/:id')
  @ApiOkResponse({ description: 'Returns the updated maintenance', type: MaintenanceTask })
  async updateTask(@Param('id') id: string, @Body() updateMaintenanceTaskDto: UpdateMaintenanceTaskDto) {
    return this.maintenanceTasksService.updateMaintenanceTask(id, updateMaintenanceTaskDto);
  }

  @Delete('/tasks/:id')
  @ApiOkResponse({ description: 'Returns the deleted maintenance', type: MaintenanceTask })
  async deleteTask(@Param('id') id: string) {
    return this.maintenanceTasksService.deleteMaintenanceTask(id);
  }

  @Get('/tasks')
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiQuery({ name: 'orderBy', required: false, enum: Prisma.MaintenanceTaskScalarFieldEnum })
  @ApiOkResponse({ description: 'Returns the maintenance tasks', type: MaintenanceTask, isArray: true })
  async listTasks(
    @Query('name') name?: string,
    @Query('sort', new DefaultValuePipe(Prisma.SortOrder.asc)) sort?: Prisma.SortOrder,
    @Query(
      'orderBy',
      new DefaultValuePipe(Prisma.MaintenanceTaskScalarFieldEnum.updatedAt),
      new ParseEnumPipe(Prisma.MaintenanceTaskScalarFieldEnum),
    )
    orderBy?: Prisma.MaintenanceTaskScalarFieldEnum,
  ) {
    return this.maintenanceTasksService.listMaintenanceTasks({
      orderBy: { [orderBy]: sort },
      include: {
        tools: true,
        assignee: true,
      },
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }
}
