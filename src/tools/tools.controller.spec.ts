import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { ToolsController } from './tools.controller';
import { ToolsService } from './tools.service';

describe('ToolsController', () => {
  let controller: ToolsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToolsService, PrismaService],
      controllers: [ToolsController],
    }).compile();

    controller = module.get<ToolsController>(ToolsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
