import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Implement } from './dto/implements.dto';
import { ImplementsService } from './implements.service';

@Resolver(() => Implement)
export class ImplementsResolver {
  constructor(private readonly implementsService: ImplementsService) {}

  @Query(() => Implement, { name: 'implement' })
  async implement(@Args('id') id: string): Promise<Implement> {
    const implement = await this.implementsService.findImplementById(id);
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
    return this.implementsService.listImplements({
      where: {
        compatibleAttachments: { some: { id: attachmentId } },
        compatibleVehicles: { some: { id: vehicleId } },
      },
      orderBy: { name: Prisma.SortOrder.asc },
    });
  }
}
