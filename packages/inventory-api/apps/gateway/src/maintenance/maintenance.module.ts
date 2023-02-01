import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MaintenanceTasksResolver } from '../tasks/tasks.resolver';
import { MaintenanceTasksService } from '../tasks/tasks.service';
import { MaintenanceController } from './maintenance.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GUIDES_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 5001,
        },
      },
    ]),
  ],
  providers: [MaintenanceTasksResolver, MaintenanceTasksService],
  controllers: [MaintenanceController],
})
export class MaintenanceModule {}
