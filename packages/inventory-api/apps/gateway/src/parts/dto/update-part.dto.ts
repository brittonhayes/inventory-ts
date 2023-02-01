import { PartialType } from '@nestjs/swagger';
import { CreateVehiclePartDto } from './create-part.dto';

export class UpdateVehiclePartDto extends PartialType(CreateVehiclePartDto) {}
