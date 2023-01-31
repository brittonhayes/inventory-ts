import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Inject,
  Param,
  ParseEnumPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Guide, Prisma } from '@prisma/client';
import { AccessTokenGuard } from '@app/common/guards/token.guard';
import { CreateMaintenanceTaskDto } from '../tasks/dto/create-task.dto';
import { UpdateMaintenanceTaskDto } from '../tasks/dto/update-task.dto';
import { MaintenanceTask } from '../tasks/entities/task.entity';
import { MaintenanceTasksService } from '../tasks/tasks.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@ApiTags('maintenance')
@ApiBearerAuth()
@Controller('maintenance')
// @UseGuards(AccessTokenGuard)
export class MaintenanceController {
  constructor(
    @Inject('GUIDES_SERVICE') private readonly client: ClientProxy,
    private readonly maintenanceTasksService: MaintenanceTasksService,
  ) {}

  @Post('/tasks')
  @ApiOkResponse({ description: 'Returns the created maintenance task', type: MaintenanceTask })
  async createTask(@Body() createMaintenanceTaskDto: CreateMaintenanceTaskDto) {
    return this.maintenanceTasksService.create(createMaintenanceTaskDto);
  }

  @Get('/tasks/:id')
  @ApiOkResponse({ description: 'Returns the maintenance', type: MaintenanceTask })
  async findByTaskId(@Param('id') id: string) {
    return this.maintenanceTasksService.findById(id);
  }

  @Patch('/tasks/:id')
  @ApiOkResponse({ description: 'Returns the updated maintenance', type: MaintenanceTask })
  async updateTask(@Param('id') id: string, @Body() updateMaintenanceTaskDto: UpdateMaintenanceTaskDto) {
    return this.maintenanceTasksService.update(id, updateMaintenanceTaskDto);
  }

  @Delete('/tasks/:id')
  @ApiOkResponse({ description: 'Returns the deleted maintenance', type: MaintenanceTask })
  async deleteTask(@Param('id') id: string) {
    return this.maintenanceTasksService.delete(id);
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
    return this.maintenanceTasksService.list({
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

  @Get('guides')
  async listGuides() {
    return await firstValueFrom(this.client.emit('guide_list_requested', {}));
  }
}
