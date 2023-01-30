import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { MaintenanceGuide } from './entities/guide.entity';
import { MaintenanceGuidesService } from './guides.service';

@Resolver(() => MaintenanceGuide)
@UseGuards(GqlAuthGuard)
export class MaintenanceGuidesResolver {
  constructor(private readonly guidesService: MaintenanceGuidesService) {}

  @Query(() => MaintenanceGuide, { name: 'guide' })
  async guide(@Args('id') id: string): Promise<MaintenanceGuide> {
    const guide = await this.guidesService.findById(id);
    if (!guide) {
      throw new NotFoundException(id);
    }
    return guide;
  }

  @Query(() => [MaintenanceGuide], { name: 'guides' })
  guides(): Promise<MaintenanceGuide[]> {
    return this.guidesService.list({
      orderBy: { name: Prisma.SortOrder.asc },
    });
  }
}
