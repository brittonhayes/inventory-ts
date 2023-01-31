import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { GuidesModule } from './guides.module';

async function bootstrap() {
  const port = 5001;
  const app = await NestFactory.createMicroservice(GuidesModule, {
    transport: Transport.TCP,
    options: {
      port: port,
    },
  });

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen();
}
bootstrap();
