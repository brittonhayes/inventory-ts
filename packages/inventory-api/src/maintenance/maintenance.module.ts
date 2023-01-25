import { Module } from '@nestjs/common';
import { MaintenanceGuidesResolver } from './guides.resolver';
import { MaintenanceGuidesService } from './guides.service';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceTasksResolver } from './tasks.resolver';
import { MaintenanceTasksService } from './tasks.service';

@Module({
  providers: [MaintenanceTasksResolver, MaintenanceGuidesResolver, MaintenanceTasksService, MaintenanceGuidesService],
  controllers: [MaintenanceController],
})
export class MaintenanceModule {}
