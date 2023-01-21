import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { MaintenanceGuidesService } from './guides.service';

describe('MaintenanceService', () => {
  let service: MaintenanceGuidesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenanceGuidesService, PrismaService],
    }).compile();

    service = module.get<MaintenanceGuidesService>(MaintenanceGuidesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of maintenance guides', async () => {
    const want = [];

    prisma.maintenanceGuide.findMany = jest.fn().mockResolvedValueOnce(want);
    const result = await service.listMaintenanceGuides({
      orderBy: { name: 'asc' },
    });

    expect(result).toBe(want);
  });

  it('should return a maintenance guide by id', async () => {
    const want = {
      id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Challenger MT 845C',
    };

    prisma.maintenanceGuide.findUnique = jest.fn().mockResolvedValueOnce(want);
    expect(await service.findMaintenanceGuide(want.id)).toEqual(want);
  });
});
