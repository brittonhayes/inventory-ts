import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';
import config from './common/config/config';
import { HttpLoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { EmployeesModule } from './employees/employees.module';
import { GqlConfigService } from './graphql.service';
import { HealthModule } from './health/health.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { VehiclePartsModule } from './parts/parts.module';
import { ToolsModule } from './tools/tools.module';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    UsersModule,
    AuthModule,
    VehiclesModule,
    VehiclePartsModule,
    ToolsModule,
    EmployeesModule,
    MaintenanceModule,
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
