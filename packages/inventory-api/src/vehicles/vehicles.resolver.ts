import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CreateVehicleDto, Vehicle } from './dto/vehicles.dto';
import { VehiclesService } from './vehicles.service';

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Query(() => Vehicle, { name: 'vehicle' })
  async vehicle(@Args('id') id: string): Promise<Vehicle> {
    const vehicle = await this.vehiclesService.findVehicleById(id);
    if (!vehicle) {
      throw new NotFoundException(id);
    }
    return vehicle;
  }

  @Query((returns) => [Vehicle], { name: 'vehicles' })
  vehicles(): Promise<Vehicle[]> {
    return this.vehiclesService.listVehicles({
      orderBy: { name: Prisma.SortOrder.asc },
    });
  }

  @Mutation(() => Vehicle)
  async addVehicle(@Args('createVehicleDto') createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.vehiclesService.createVehicle(createVehicleDto);
    return vehicle;
  }

  @Mutation(() => Boolean)
  async removeVehicle(@Args('id') id: string) {
    return this.vehiclesService.deleteVehicle(id);
  }
}
