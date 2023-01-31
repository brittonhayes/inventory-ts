import { CorsConfig, SecurityConfig, ServicesConfig, SwaggerConfig } from '@app/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    }),
  );

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService);
  const serviceConfigs = configService.get<ServicesConfig>('services');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');
  const securityConfig = configService.get<SecurityConfig>('security');

  // Security
  if (securityConfig.helmet) {
    app.use(helmet(securityConfig.helmet));
  }

  if (securityConfig.jwt) {
    app.use(cookieParser(securityConfig.jwt.secret));
  }

  if (corsConfig.enabled) {
    app.enableCors({
      origin: corsConfig.origin,
      credentials: corsConfig.credentials,
    });
  }

  if (serviceConfigs.root.prefix) {
    app.setGlobalPrefix(serviceConfigs.root.prefix);
  }

  if (swaggerConfig.enabled) {
    // Documentation
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Open Farms Inventory Service')
      .setDescription(swaggerConfig.description || 'Agriculture inventory management service.')
      .setVersion(swaggerConfig.version || '1.0')
      .addServer(swaggerConfig.servers.dev, 'development')
      .addServer(swaggerConfig.servers.prod, 'production')
      .addSecurity('bearer', {
        type: 'http',
        scheme: 'bearer',
      })
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(swaggerConfig.docsPath || 'docs', app, document, {
      useGlobalPrefix: true,
    });
  }

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { retryAttempts: 5, retryDelay: 3000 },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT || serviceConfigs.root.port || 5000);

  Logger.log(`Application is running on: ${await app.getUrl()}`);
  Logger.log(`GraphQL Playground: ${await app.getUrl()}/graphql`);
}
bootstrap();
