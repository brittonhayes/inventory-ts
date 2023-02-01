import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { GqlAuthGuard } from '@app/common/guards/gql-auth.guard';
import { Implement } from './entities/implement.entity';
import { ImplementsService } from './implements.service';

@Resolver(() => Implement)
@UseGuards(GqlAuthGuard)
export class ImplementsResolver {
  constructor(private readonly implementsService: ImplementsService) {}

  @Query(() => Implement, { name: 'implement' })
  async implement(@Args('id') id: string): Promise<Implement> {
    const implement = await this.implementsService.findById(id);
    if (!implement) {
      throw new NotFoundException(id);
    }
    return implement;
  }

  @Query(() => [Implement], { name: 'implements' })
  async implements(
    @Args({ name: 'attachmentId', type: () => String, nullable: true }) attachmentId?: string,
    @Args({ name: 'vehicleId', type: () => String, nullable: true }) vehicleId?: string,
  ): Promise<Implement[]> {
    return this.implementsService.list({
      where: {
        compatibleAttachments: { some: { id: attachmentId } },
        compatibleVehicles: { some: { id: vehicleId } },
      },
      orderBy: { name: Prisma.SortOrder.asc },
    });
  }
}
