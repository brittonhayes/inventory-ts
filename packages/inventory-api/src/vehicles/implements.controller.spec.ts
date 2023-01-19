import { Test, TestingModule } from '@nestjs/testing';
import { ImplementsController } from './implements.controller';

describe('ImplementsController', () => {
  let controller: ImplementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImplementsController],
    }).compile();

    controller = module.get<ImplementsController>(ImplementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
