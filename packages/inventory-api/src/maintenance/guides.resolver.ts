import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { MaintenanceGuide } from './dto/guides.dto';
import { MaintenanceGuidesService } from './guides.service';

@Resolver(() => MaintenanceGuide)
export class GuidesResolver {
  constructor(private readonly guidesService: MaintenanceGuidesService) {}

  @Query(() => MaintenanceGuide, { name: 'guide' })
  async guide(@Args('id') id: string): Promise<MaintenanceGuide> {
    const guide = await this.guidesService.findMaintenanceGuide(id);
    if (!guide) {
      throw new NotFoundException(id);
    }
    return guide;
  }

  @Query(() => [MaintenanceGuide], { name: 'guides' })
  guides(): Promise<MaintenanceGuide[]> {
    return this.guidesService.listMaintenanceGuides({
      orderBy: { name: Prisma.SortOrder.asc },
    });
  }
}
