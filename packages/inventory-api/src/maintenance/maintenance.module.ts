import { Module } from '@nestjs/common';
import { MaintenanceGuidesResolver } from '../guides/guides.resolver';
import { MaintenanceGuidesService } from '../guides/guides.service';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceTasksResolver } from '../tasks/tasks.resolver';
import { MaintenanceTasksService } from '../tasks/tasks.service';

@Module({
  providers: [MaintenanceTasksResolver, MaintenanceGuidesResolver, MaintenanceTasksService, MaintenanceGuidesService],
  controllers: [MaintenanceController],
})
export class MaintenanceModule {}
