import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { AppModule } from './app.module';
import { CorsConfig, NestConfig, SecurityConfig, SwaggerConfig } from './common/config/config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');
  const securityConfig = configService.get<SecurityConfig>('security');

  // Security
  if (securityConfig.helmet) {
    app.use(helmet(securityConfig.helmet));
  }

  if (swaggerConfig.enabled) {
    // Documentation
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Open Farms Inventory Service')
      .addServer('http://localhost:5000', 'development')
      .setDescription(swaggerConfig.description || 'Agriculture inventory management service.')
      .setVersion(swaggerConfig.version || '1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
  }

  if (corsConfig.enabled) {
    app.enableCors({
      origin: corsConfig.origin,
      credentials: corsConfig.credentials,
    });
  }

  if (nestConfig.prefix) {
    app.setGlobalPrefix(nestConfig.prefix);
  }

  await app.listen(process.env.PORT || nestConfig.port || 5000);

  Logger.log(`Application is running on: ${await app.getUrl()}`);
  Logger.log(`GraphQL Playground: ${await app.getUrl()}/graphql`);
}
bootstrap();
