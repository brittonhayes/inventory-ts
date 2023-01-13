import { CacheModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { ToolsModule } from './tools/tools.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5, // seconds
      max: 100, // maximum number of items in cache
    }),
    VehiclesModule,
    ToolsModule,
    EmployeesModule,
    MaintenanceModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
