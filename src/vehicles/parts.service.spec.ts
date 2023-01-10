import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { VehiclePartsService } from './parts.service';

describe('VehiclePartService', () => {
  let service: VehiclePartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehiclePartsService, PrismaService],
    }).compile();

    service = module.get<VehiclePartsService>(VehiclePartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a vehicle parts list', async () => {
    expect(service.listVehicleParts({})).resolves.toBeDefined();
  });
});
