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
import { Prisma, MaintenanceTask, MaintenanceGuide } from '@prisma/client';
import { CreateMaintenanceGuideDto, MaintenanceGuideResponse, UpdateMaintenanceGuideDto } from './guides.dto';
import { MaintenanceGuidesService } from './guides.service';
import { CreateMaintenanceTaskDto, MaintenanceTaskResponse, UpdateMaintenanceTaskDto } from './tasks.dto';
import { MaintenanceTasksService } from './tasks.service';

@ApiTags('maintenance')
@Controller('maintenance')
export class MaintenanceController {
  constructor(
    private readonly maintenanceTasksService: MaintenanceTasksService,
    private readonly maintenanceGuidesService: MaintenanceGuidesService,
  ) {}

  @Post('/guides')
  @ApiOkResponse({ description: 'Returns the created maintenance guide', type: MaintenanceGuideResponse })
  async createGuide(@Body() createMaintenanceGuideDto: CreateMaintenanceGuideDto): Promise<MaintenanceGuide> {
    return this.maintenanceGuidesService.createMaintenanceGuide(createMaintenanceGuideDto);
  }

  @Get('/guides/:id')
  @ApiOkResponse({ description: 'Returns the maintenance guide', type: MaintenanceGuideResponse })
  async findGuideById(@Param('id') id: string): Promise<MaintenanceGuide | null> {
    return this.maintenanceGuidesService.maintenanceGuide({ id });
  }

  @Patch('/guides/:id')
  @ApiOkResponse({ description: 'Returns the updated maintenance guide', type: MaintenanceGuideResponse })
  async updateGuide(
    @Param('id') id: string,
    @Body() updateMaintenanceGuideDto: UpdateMaintenanceGuideDto,
  ): Promise<MaintenanceGuide> {
    return this.maintenanceGuidesService.updateMaintenanceGuide({ where: { id }, data: updateMaintenanceGuideDto });
  }

  @Delete('/guides/:id')
  @ApiOkResponse({ description: 'Returns the deleted maintenance guide', type: MaintenanceGuideResponse })
  async deleteGuide(@Param('id') id: string): Promise<MaintenanceGuide> {
    return this.maintenanceGuidesService.deleteMaintenanceGuide({ id });
  }

  @Get('/guides')
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiQuery({ name: 'orderBy', required: false, enum: Prisma.MaintenanceGuideScalarFieldEnum })
  async list(
    @Query('name') name?: string,
    @Query('sort', new DefaultValuePipe(Prisma.SortOrder.asc)) sort?: Prisma.SortOrder,
    @Query(
      'orderBy',
      new DefaultValuePipe(Prisma.MaintenanceGuideScalarFieldEnum),
      new ParseEnumPipe(Prisma.MaintenanceGuideScalarFieldEnum),
    )
    orderBy?: Prisma.MaintenanceGuideScalarFieldEnum,
  ): Promise<MaintenanceGuide[]> {
    return this.maintenanceGuidesService.maintenanceGuides({
      orderBy: { [orderBy]: sort },
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }

  @Post('/tasks')
  @ApiOkResponse({ description: 'Returns the created maintenance task', type: MaintenanceTaskResponse })
  async createTask(@Body() createMaintenanceTaskDto: CreateMaintenanceTaskDto): Promise<MaintenanceTask> {
    return this.maintenanceTasksService.createMaintenanceTask(createMaintenanceTaskDto);
  }

  @Get('/tasks/:id')
  @ApiOkResponse({ description: 'Returns the maintenance', type: MaintenanceTaskResponse })
  async findByTaskId(@Param('id') id: string): Promise<MaintenanceTask | null> {
    return this.maintenanceTasksService.maintenanceTask({ id });
  }

  @Patch('/tasks/:id')
  @ApiOkResponse({ description: 'Returns the updated maintenance', type: MaintenanceTaskResponse })
  async updateTask(
    @Param('id') id: string,
    @Body() updateMaintenanceTaskDto: UpdateMaintenanceTaskDto,
  ): Promise<MaintenanceTask> {
    return this.maintenanceTasksService.updateMaintenanceTask({ where: { id }, data: updateMaintenanceTaskDto });
  }

  @Delete('/tasks/:id')
  @ApiOkResponse({ description: 'Returns the deleted maintenance', type: MaintenanceTaskResponse })
  async deleteTask(@Param('id') id: string): Promise<MaintenanceTask> {
    return this.maintenanceTasksService.deleteMaintenanceTask({ id });
  }

  @Get('/tasks')
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiQuery({ name: 'orderBy', required: false, enum: Prisma.MaintenanceTaskScalarFieldEnum })
  async listTask(
    @Query('name') name?: string,
    @Query('sort', new DefaultValuePipe(Prisma.SortOrder.asc)) sort?: Prisma.SortOrder,
    @Query(
      'orderBy',
      new DefaultValuePipe(Prisma.MaintenanceTaskScalarFieldEnum),
      new ParseEnumPipe(Prisma.MaintenanceTaskScalarFieldEnum),
    )
    orderBy?: Prisma.MaintenanceTaskScalarFieldEnum,
  ): Promise<MaintenanceTask[]> {
    return this.maintenanceTasksService.maintenanceTasks({
      orderBy: { [orderBy]: sort },
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }
}
