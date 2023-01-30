import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { shouldReturnEmployeeById } from '../../test/fixtures/employees';
import { EmployeesService } from './employees.service';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeesService, PrismaService],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should return an array of employees', async () => {
    const want = [];

    prisma.employee.findMany = jest.fn().mockResolvedValueOnce(want);
    const result = await service.list({
      orderBy: { name: 'asc' },
    });

    expect(result).toBe(want);
  });

  it('should return an employee by id', async () => {
    const want = shouldReturnEmployeeById;

    prisma.employee.findUnique = jest.fn().mockResolvedValueOnce(want);
    expect(await service.findById(want.id)).toEqual(want);
  });
});
