import { Module } from '@nestjs/common';
import { ImplementsController } from './implements.controller';
import { ImplementsService } from './implements.service';

@Module({
  providers: [ImplementsService],
  controllers: [ImplementsController],
  exports: [ImplementsService],
})
export class ImplementsModule {}
