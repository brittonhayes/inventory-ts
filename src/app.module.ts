import { Module } from '@nestjs/common';
import { EquipmentModule } from './equipment/equipment.module';
import { ImplementsModule } from './implements/implements.module';
import { LocationsModule } from './locations/locations.module';
import { TagsModule } from './tags/tags.module';
import { ToolsModule } from './tools/tools.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    // CacheModule.register({
    //   ttl: 5, // seconds
    //   max: 100, // maximum number of items in cache
    // }),
    LocationsModule,
    ImplementsModule,
    VehiclesModule,
    EquipmentModule,
    ToolsModule,
    TagsModule,
  ],
})
export class AppModule {}
