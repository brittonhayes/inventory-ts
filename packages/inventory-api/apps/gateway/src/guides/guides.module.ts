import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GUIDE_PACKAGE_NAME, GUIDE_SERVICE_NAME } from '@app/grpc/proto/guide.pb';
import { GuidesController } from './guides.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: GUIDE_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:5001',
          package: GUIDE_PACKAGE_NAME,
          protoPath: 'node_modules/inventory-proto/proto/guide.proto',
          loader: {
            arrays: true,
          },
        },
      },
    ]),
  ],
  controllers: [GuidesController],
})
export class GuidesModule {}
