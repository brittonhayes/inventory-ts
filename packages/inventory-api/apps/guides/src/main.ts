import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { PrismaService } from 'nestjs-prisma';
import { GuidesModule } from './guides.module';
import { protobufPackage } from '@app/grpc/proto/guide.pb';

async function bootstrap() {
  const port = 5001;
  const app = await NestFactory.createMicroservice(GuidesModule, {
    transport: Transport.GRPC,
    options: {
      url: `127.0.0.1:${port}`,
      package: protobufPackage,
      protoPath: 'node_modules/inventory-proto/proto/guide.proto',
      loader: {
        arrays: true,
      },
    },
  });

  // Validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  Logger.log(`Guides Microservice is listening on port ${port}`, 'GuidesMicroservice');
  await app.listen();
}
bootstrap();
