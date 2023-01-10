import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { MaintenanceTasksService } from './tasks.service';

describe('MaintenanceTasksService', () => {
  let service: MaintenanceTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenanceTasksService, PrismaService],
    }).compile();

    service = module.get<MaintenanceTasksService>(MaintenanceTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
