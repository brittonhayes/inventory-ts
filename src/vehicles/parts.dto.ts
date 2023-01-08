import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Condition, Prisma, VehiclePart } from '@prisma/client';
import { IsDateString } from 'class-validator';

export class VehiclePartResponse implements VehiclePart {
  @ApiProperty({ example: 'clch9rxw90000p718qrofjcqd' })
  id: string;

  @ApiProperty({ example: 'Shovel' })
  name: string;

  @ApiPropertyOptional({ example: 'MINT' })
  condition: Condition;

  @ApiPropertyOptional({ example: 'Example notes about part' })
  notes: string;

  @ApiProperty({ example: 500 })
  hours: number;

  @ApiProperty()
  vehicleId: string;

  @ApiPropertyOptional()
  locationId: string;

  @ApiPropertyOptional({ example: 'Harvesting' })
  tagName: string;

  @ApiPropertyOptional({ example: 'Barn' })
  locationName: string;

  @ApiProperty({ example: '2021-05-01T00:00:00.000Z' })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ example: '2021-05-01T00:00:00.000Z' })
  @IsDateString()
  updatedAt: Date;
}

export class ListPartsDto implements Pick<Prisma.VehiclePartFindManyArgs, 'skip' | 'where' | 'orderBy'> {
  @ApiPropertyOptional()
  skip?: number;

  @ApiPropertyOptional()
  where?: Prisma.VehiclePartWhereInput;

  @ApiPropertyOptional()
  orderBy?: Prisma.VehiclePartOrderByWithRelationInput;
}

export class FindVehiclePartDto implements Pick<Prisma.VehiclePartWhereUniqueInput, 'id'> {
  @ApiProperty({ required: true })
  id: string;
}

export class CreateVehiclePartDto implements Prisma.VehiclePartCreateInput {
  @ApiProperty()
  name: string;

  @ApiProperty()
  vehicleId: string;

  @ApiPropertyOptional()
  condition?: Condition;

  @ApiPropertyOptional()
  locationId?: string;

  @ApiPropertyOptional()
  tagName?: string;
}

export class UpdateVehiclePartDto implements Pick<CreateVehiclePartDto, 'name' | 'condition' | 'tagName'> {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  condition?: Condition;

  @ApiPropertyOptional()
  tagName: string;
}
