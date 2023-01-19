import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { MaintenanceGuidesService } from './guides.service';

describe('MaintenanceService', () => {
  let service: MaintenanceGuidesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenanceGuidesService, PrismaService],
    }).compile();

    service = module.get<MaintenanceGuidesService>(MaintenanceGuidesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
