import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { VehiclePart } from './dto/parts.dto';
import { VehiclePartsService } from './parts.service';

@Resolver(() => VehiclePart)
export class VehiclePartsResolver {
  constructor(private readonly vehiclePartsService: VehiclePartsService) {}

  @Query(() => VehiclePart, { name: 'part' })
  async guide(@Args('id') id: string): Promise<VehiclePart> {
    const guide = await this.vehiclePartsService.findVehiclePartById(id);
    if (!guide) {
      throw new NotFoundException(id);
    }
    return guide;
  }

  @Query(() => [VehiclePart], { name: 'parts' })
  vehicleParts(): Promise<VehiclePart[]> {
    return this.vehiclePartsService.listVehicleParts({
      orderBy: { name: Prisma.SortOrder.asc },
    });
  }
}
