import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { MaintenanceGuidesService } from './guides.service';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceTasksService } from './tasks.service';

describe('MaintenanceController', () => {
  let controller: MaintenanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenanceGuidesService, MaintenanceTasksService, PrismaService],
      controllers: [MaintenanceController],
    }).compile();

    controller = module.get<MaintenanceController>(MaintenanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
