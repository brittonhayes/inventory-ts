import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateGuideDto } from './dto/create-guide.dto';
import { ListGuidesRequest } from '@app/grpc/proto/guide.pb';

@Injectable()
export class GuidesService {
  constructor(private prisma: PrismaService) {}

  async list(data: ListGuidesRequest) {
    return this.prisma.guide.findMany({
      skip: data.skip,
      take: data.take,
      orderBy: data.orderBy
        ? {
            [data.orderBy]: data.sortBy,
          }
        : {},
      where: {
        AND: [data.search ? { name: { mode: Prisma.QueryMode.insensitive, contains: data.search } } : {}],
      },
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
