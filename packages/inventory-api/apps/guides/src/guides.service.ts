import { Injectable } from '@nestjs/common';
import { Guide, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateGuideDto } from './dto/create-guide.dto';

@Injectable()
export class GuidesService {
  constructor(private prisma: PrismaService) {}

  async list(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GuideWhereUniqueInput;
    where?: Prisma.GuideWhereInput;
    orderBy?: Prisma.GuideOrderByWithRelationInput;
  }): Promise<Guide[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.guide.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findById(id: string) {
    return this.prisma.guide.findUnique({
      where: {
        id,
      },
    });
  }

  async create(createGuideDto: CreateGuideDto) {
    return this.prisma.guide.create({
      data: createGuideDto,
    });
  }

  async update(id: string, updateGuideDto: CreateGuideDto) {
    return this.prisma.guide.update({
      where: { id },
      data: updateGuideDto,
    });
  }

  async delete(id: string) {
    return this.prisma.guide.delete({
      where: {
        id,
      },
    });
  }
}
