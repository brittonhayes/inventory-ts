import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { shouldListImplements, shouldReturnImplementById } from '../../test/fixtures/implements';
import { Implement } from '../dto/implements.dto';
import { ImplementsService } from './implements.service';

describe('ImplementsService', () => {
  let service: ImplementsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImplementsService, PrismaService],
    }).compile();

    service = module.get<ImplementsService>(ImplementsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should return an array of implements', async () => {
    const want: Implement[] = shouldListImplements;

    prisma.implement.findMany = jest.fn().mockResolvedValueOnce(want);
    const result = await service.listImplements({
      orderBy: { name: 'asc' },
    });

    expect(result).toBe<Implement[]>(want);
  });

  it('should return an implement by id', async () => {
    const want = shouldReturnImplementById;

    prisma.implement.findUnique = jest.fn().mockResolvedValueOnce(want);
    const result = await service.findImplementById(want.id);

    expect(result).toEqual<Implement>(want);
  });
});
