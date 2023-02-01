import config from '@app/common/config/config';
import { HttpLoggerMiddleware } from '@app/common/middleware/logger/logger.middleware';
import { HealthModule } from '@app/common/modules/health/health.module';
import { AuthModule } from '@app/security/auth/auth.module';
import { UsersModule } from '@app/security/users/users.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from 'nestjs-prisma';
import { EmployeesModule } from './employees/employees.module';
import { GqlConfigService } from './graphql.service';
import { GuidesModule } from './guides/guides.module';
import { ImplementsModule } from './implements/implements.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { VehiclePartsModule } from './parts/parts.module';
import { ToolsModule } from './tools/tools.module';
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
    GuidesModule,
    EmployeesModule,
    MaintenanceModule,
    HealthModule,
    ImplementsModule,
    GuidesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
