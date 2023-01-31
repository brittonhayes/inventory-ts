import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MaintenanceTasksResolver } from '../tasks/tasks.resolver';
import { MaintenanceTasksService } from '../tasks/tasks.service';
import { MaintenanceController } from './maintenance.controller';

@Module({
  imports: [ClientsModule.register([{ name: 'GUIDES_SERVICE', transport: Transport.TCP }])],
  providers: [MaintenanceTasksResolver, MaintenanceTasksService],
  controllers: [MaintenanceController],
})
export class MaintenanceModule {}
