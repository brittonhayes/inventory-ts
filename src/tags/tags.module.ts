import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService, PrismaService],
})
export class TagsModule {}
