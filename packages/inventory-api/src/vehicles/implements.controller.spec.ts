import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { ImplementsController } from './implements.controller';
import { ImplementsService } from './implements.service';

describe('ImplementsController', () => {
  let controller: ImplementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImplementsService, PrismaService],
      controllers: [ImplementsController],
    }).compile();

    controller = module.get<ImplementsController>(ImplementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
