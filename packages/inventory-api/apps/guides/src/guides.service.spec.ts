import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { GuidesService } from './guides.service';

describe('MaintenanceService', () => {
  let service: GuidesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuidesService, PrismaService],
    }).compile();

    service = module.get<GuidesService>(GuidesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of maintenance guides', async () => {
    const want = [];
    prisma.guide.findMany = jest.fn().mockResolvedValueOnce(want);
    const result = await service.list({});

    expect(result).toBe(want);
  });

  it('should return a maintenance guide by id', async () => {
    const want = [];

    prisma.guide.findUnique = jest.fn().mockResolvedValueOnce(want);
    expect(await service.findById('1234')).toEqual(want);
  });
});
