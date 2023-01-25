import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrderDirection } from '../common/filters/order-direction';
import { Implement } from './dto/implements.dto';
import { VehiclePart } from './dto/parts.dto';
import { CreateVehicleDto, Vehicle, VehicleQuery } from './dto/vehicles.dto';
import { VehiclesService } from './vehicles.service';

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Query(() => Vehicle, { name: 'vehicle' })
  async vehicle(@Args('id') id: string, @Args('filters', { nullable: true }) args?: VehicleQuery): Promise<Vehicle> {
    const vehicle = await this.vehiclesService.findVehicleById(id, {
      include: {
        guides: args.includeGuides,
        compatibleAttachments: args.includeAttachments,
        compatibleParts: args.includeParts,
        compatibleImplements: args.includeImplements,
      },
    });
    if (!vehicle) {
      throw new NotFoundException(id);
    }
    return vehicle;
  }

  @Query(() => [Vehicle], { name: 'vehicles' })
  vehicles(@Args('filters', { nullable: true }) filters?: VehicleQuery): Promise<Vehicle[]> {
    return this.vehiclesService.listVehicles({
      orderBy: { name: Prisma.SortOrder.asc },
      include: filters
        ? {
            guides: filters.includeGuides,
            compatibleAttachments: filters.includeAttachments,
            compatibleParts: filters.includeParts,
            compatibleImplements: filters.includeImplements,
          }
        : undefined,
    });
  }
}
