import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EquipmentModule } from './equipment/equipment.module';
import { ImplementsModule } from './implements/implements.module';
import { LocationsModule } from './locations/locations.module';
import { TagsModule } from './tags/tags.module';
import { ToolsModule } from './tools/tools.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client/dist'),
    }),
    LocationsModule,
    ImplementsModule,
    VehiclesModule,
    EquipmentModule,
    ToolsModule,
    TagsModule,
  ],
})
export class AppModule {}
