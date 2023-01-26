import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { MaintenanceTask } from '../dto/tasks.dto';
import { MaintenanceTasksService } from './tasks.service';

@Resolver(() => MaintenanceTask)
export class MaintenanceTasksResolver {
  constructor(private readonly tasksService: MaintenanceTasksService) {}

  @Query(() => MaintenanceTask, { name: 'task' })
  async task(@Args('id') id: string): Promise<MaintenanceTask> {
    const task = await this.tasksService.findMaintenanceTask(id);
    if (!task) {
      throw new NotFoundException(id);
    }
    return task;
  }

  @Query(() => [MaintenanceTask], { name: 'tasks' })
  tasks(): Promise<MaintenanceTask[]> {
    return this.tasksService.listMaintenanceTasks({
      orderBy: { name: Prisma.SortOrder.asc },
    });
  }
}
