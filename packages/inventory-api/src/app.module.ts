import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EmployeesModule } from './employees/employees.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { ToolsModule } from './tools/tools.module';
import { VehiclesModule } from './vehicles/vehicles.module';

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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      installSubscriptionHandlers: true,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/api/*');
  }
}
