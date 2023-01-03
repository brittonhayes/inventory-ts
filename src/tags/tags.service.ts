import { Injectable } from '@nestjs/common';
import { Tag, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async tags(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TagWhereUniqueInput;
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithRelationInput;
  }): Promise<Tag[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.tag.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async tag(where: Prisma.TagWhereUniqueInput): Promise<Tag | null> {
    return this.prisma.tag.findUnique({ where });
  }

  async createTag(data: Prisma.TagCreateInput) {
    return this.prisma.tag.create({ data });
  }

  async updateTag(params: { where: Prisma.TagWhereUniqueInput; data: Prisma.TagUpdateInput }) {
    const { where, data } = params;
    return this.prisma.tag.update({ data, where });
  }

  async deleteTag(where: Prisma.TagWhereUniqueInput): Promise<Tag> {
    return this.prisma.tag.delete({ where });
  }
}
