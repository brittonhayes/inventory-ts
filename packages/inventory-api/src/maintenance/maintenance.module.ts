import { Module } from '@nestjs/common';
import { MaintenanceTasksService } from './tasks.service';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceGuidesService } from './guides.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
  providers: [MaintenanceTasksService, MaintenanceGuidesService, PrismaService],
  controllers: [MaintenanceController],
})
export class MaintenanceModule {}
