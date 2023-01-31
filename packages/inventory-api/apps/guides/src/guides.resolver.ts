import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Guide } from './entities/guide.entity';
import { GuidesService } from './guides.service';

@Resolver(() => Guide)
export class GuidesResolver {
  constructor(private readonly guidesService: GuidesService) {}

  @Query(() => Guide, { name: 'guide' })
  async guide(@Args('id') id: string): Promise<Guide> {
    const guide = await this.guidesService.findById(id);
    if (!guide) {
      throw new NotFoundException(id);
    }
    return guide;
  }

  @Query(() => [Guide], { name: 'guides' })
  guides(): Promise<Guide[]> {
    return this.guidesService.list({
      orderBy: { name: Prisma.SortOrder.asc },
    });
  }
}
