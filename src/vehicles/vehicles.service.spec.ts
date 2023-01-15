import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { shouldListVehicles, shouldReturnVehicleById } from '../../test/fixtures/vehicles';
import { Vehicle } from './dto/vehicles.dto';
import { VehiclesService } from './vehicles.service';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehiclesService, PrismaService],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should return an array of vehicles', async () => {
    const want: Vehicle[] = shouldListVehicles;

    prisma.vehicle.findMany = jest.fn().mockResolvedValueOnce(want);
    const result = await service.listVehicles({
      orderBy: { name: 'asc' },
    });

    expect(result).toBe<Vehicle[]>(want);
  });

  it('should return a vehicle by id', async () => {
    const want = shouldReturnVehicleById;

    prisma.vehicle.findUnique = jest.fn().mockResolvedValueOnce(want);

    expect(await service.findVehicleById(want.id)).toEqual<Vehicle>(want);
  });
});
