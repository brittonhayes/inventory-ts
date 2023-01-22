import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { loggingMiddleware, PrismaModule } from 'nestjs-prisma';
import config from './common/config/config';
import { HttpLoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { EmployeesModule } from './employees/employees.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { ToolsModule } from './tools/tools.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    // CacheModule.register({
    //   ttl: 5, // seconds
    //   max: 100, // maximum number of items in cache
    // }),
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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      cache: process.env.NODE_ENV === 'production' ? 'bounded' : undefined,
      installSubscriptionHandlers: true,
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
