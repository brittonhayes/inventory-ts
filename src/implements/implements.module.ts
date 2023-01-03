import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ImplementsController } from './implements.controller';
import { ImplementsService } from './implements.service';

@Module({
  controllers: [ImplementsController],
  providers: [ImplementsService, PrismaService],
})
export class ImplementsModule {}
