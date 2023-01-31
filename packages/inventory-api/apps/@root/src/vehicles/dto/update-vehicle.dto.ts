import { InputType, PartialType } from '@nestjs/graphql';
import { CreateVehicleDto } from './create-vehicle.dto';

@InputType()
export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
