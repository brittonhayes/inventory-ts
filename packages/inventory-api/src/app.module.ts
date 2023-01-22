import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { loggingMiddleware, PrismaModule } from 'nestjs-prisma';
import config from './common/config/config';
import { HttpLoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { EmployeesModule } from './employees/employees.module';
import { GqlConfigService } from './graphql.service';
import { MaintenanceModule } from './maintenance/maintenance.module';
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
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('Prisma'),
            logLevel: 'log',
          }),
        ],
      },
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    VehiclesModule,
    ToolsModule,
    EmployeesModule,
    MaintenanceModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('/api/*');
  }
}
