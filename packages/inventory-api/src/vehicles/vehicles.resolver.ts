import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { FilterVehiclesArgs, ListVehiclesArgs } from './dto/vehicles.args';
import { Vehicle } from './dto/vehicles.dto';
import { VehiclesService } from './vehicles.service';

@Resolver(() => Vehicle)
@UseGuards(GqlAuthGuard)
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Query(() => Vehicle, { name: 'vehicle' })
  async vehicle(@Args('id') id: string, @Args() filter?: FilterVehiclesArgs): Promise<Vehicle> {
    const vehicle = await this.vehiclesService.findVehicleById(id, {
      include: {
        guides: filter.includeGuides,
        compatibleAttachments: filter.includeAttachments,
        compatibleParts: filter.includeParts,
        compatibleImplements: filter.includeImplements,
      },
    });
    if (!vehicle) {
      throw new NotFoundException(id);
    }
    return vehicle;
  }

  @Query(() => [Vehicle], { name: 'vehicles' })
  vehicles(@Args() args: ListVehiclesArgs, @Args() filters?: FilterVehiclesArgs): Promise<Vehicle[]> {
    return this.vehiclesService.listVehicles({
      skip: filters.skip,
      take: filters.take,
      orderBy: { [filters.orderBy]: filters.sort || Prisma.SortOrder.asc },
      where: {
        name: args.name ? { contains: args.name } : {},
        make: args.make ? { contains: args.make } : {},
        model: args.model ? { contains: args.model } : {},
        condition: args.condition ? { equals: args.condition } : {},
        machineHours: args.machineHours ? { gte: args.machineHours } : {},
        vehicleType: args.vehicleType ? { equals: args.vehicleType } : {},
        power: args.power ? { equals: args.power } : {},
        year: args.year ? { equals: args.year } : {},
        link: args.link ? { contains: args.link } : {},
      },
      include: {
        guides: filters.includeGuides,
        compatibleAttachments: filters.includeAttachments,
        compatibleParts: filters.includeParts,
        compatibleImplements: filters.includeImplements,
      },
    });
  }
}
