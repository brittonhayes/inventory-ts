import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { shouldListVehicleParts, shouldReturnVehiclePartById } from '../../test/fixtures/parts';
import { VehiclePartsService } from './parts.service';

describe('VehiclePartService', () => {
  let service: VehiclePartsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehiclePartsService, PrismaService],
    }).compile();

    service = module.get<VehiclePartsService>(VehiclePartsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should return an array of vehicle parts', async () => {
    const want = shouldListVehicleParts;
    prisma.vehiclePart.findMany = jest.fn().mockResolvedValueOnce(want);
    const result = await service.listVehicleParts({
      orderBy: { name: 'asc' },
    });

    expect(result).toBe(want);
  });

  it('should return a vehicle part by id', async () => {
    const want = shouldReturnVehiclePartById;
    prisma.vehiclePart.findUnique = jest.fn().mockResolvedValueOnce(want);
    const result = await service.findVehiclePartById(want.id);

    expect(result).toEqual(want);
  });
});
