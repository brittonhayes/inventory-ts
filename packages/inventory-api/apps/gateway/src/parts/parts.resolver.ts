import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { GqlAuthGuard } from '@app/common/guards/gql-auth.guard';
import { VehiclePart } from './entities/part.entity';
import { VehiclePartsService } from './parts.service';

@Resolver(() => VehiclePart)
@UseGuards(GqlAuthGuard)
export class VehiclePartsResolver {
  constructor(private readonly vehiclePartsService: VehiclePartsService) {}

  @Query(() => VehiclePart, { name: 'part' })
  async guide(@Args('id') id: string): Promise<VehiclePart> {
    const guide = await this.vehiclePartsService.findById(id);
    if (!guide) {
      throw new NotFoundException(id);
    }
    return guide;
  }

  @Query(() => [VehiclePart], { name: 'parts' })
  async vehicleParts(): Promise<VehiclePart[]> {
    return this.vehiclePartsService.list({
      orderBy: { name: Prisma.SortOrder.asc },
    });
  }
}
