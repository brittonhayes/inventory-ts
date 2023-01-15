import { Test, TestingModule } from '@nestjs/testing';
import { ImplementsService } from './implements.service';

describe('ImplementsService', () => {
  let service: ImplementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImplementsService],
    }).compile();

    service = module.get<ImplementsService>(ImplementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
