import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { ToolsService } from './tools.service';

describe('ToolsService', () => {
  let service: ToolsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToolsService, PrismaService],
    }).compile();

    service = module.get<ToolsService>(ToolsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a tool', async () => {
    const want = {};

    prisma.tool.create = jest.fn().mockResolvedValue(want);
    const tool = await service.create({
      name: 'test',
    });
    expect(tool).toBe(want);
  });

  it('should find a tool by id', async () => {
    const want = {};

    prisma.tool.findUnique = jest.fn().mockResolvedValue(want);
    const tool = await service.findById('test');
    expect(tool).toBe(want);
  });

  it('should list tools', async () => {
    const want = {};

    prisma.tool.findMany = jest.fn().mockResolvedValue(want);
    const tools = await service.list({});
    expect(tools).toBe(want);
  });
});
