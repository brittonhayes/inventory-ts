import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { AppModule } from './app.module';
import { MaintenanceTask } from './maintenance/dto/tasks.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    }),
  );

  // API Prefix
  app.setGlobalPrefix('api');

  // Security
  app.use(helmet());
  app.enableCors();

  // Documentation
  const config = new DocumentBuilder()
    .setTitle('Open Farms Inventory Service')
    .addServer('http://localhost:5000', 'development')
    .setDescription('Agriculture inventory management service.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [MaintenanceTask],
  });
  SwaggerModule.setup('docs', app, document);

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
