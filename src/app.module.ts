import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { ToolsModule } from './tools/tools.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { MaintenanceModule } from './maintenance/maintenance.module';

@Module({
  imports: [
    // CacheModule.register({
    //   ttl: 5, // seconds
    //   max: 100, // maximum number of items in cache
    // }),
    VehiclesModule,
    ToolsModule,
    EmployeesModule,
    MaintenanceModule,
  ],
})
export class AppModule {}
