import { Module } from '@nestjs/common';
import { MaintenanceGuidesService } from './guides.service';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceTasksService } from './tasks.service';

@Module({
  providers: [MaintenanceTasksService, MaintenanceGuidesService],
  controllers: [MaintenanceController],
})
export class MaintenanceModule {}
