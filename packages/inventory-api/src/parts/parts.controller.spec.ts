import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { VehiclePartsController } from './parts.controller';
import { VehiclePartsService } from './parts.service';

describe('PartsController', () => {
  let controller: VehiclePartsController;
  let service: VehiclePartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehiclePartsService, PrismaService],
      controllers: [VehiclePartsController],
    }).compile();

    controller = module.get<VehiclePartsController>(VehiclePartsController);
    service = module.get<VehiclePartsService>(VehiclePartsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
