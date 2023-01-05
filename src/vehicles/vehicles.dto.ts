import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Vehicle, Prisma, Condition, Power } from '@prisma/client';
import { IsDateString } from 'class-validator';

export class VehicleResponse implements Vehicle {
  @ApiProperty({ example: 'clch9rxw90000p718qrofjcqd' })
  id: string;

  @ApiProperty({ example: 'Big Green' })
  name: string;

  @ApiPropertyOptional({ example: 'John Deere' })
  make: string;

  @ApiProperty({ example: 'Tractor' })
  model: string;

  @ApiProperty({ example: '2017' })
  year: number;

  @ApiProperty({ example: 500 })
  hours: number;

  @ApiPropertyOptional({ example: true })
  active: boolean;

  @ApiPropertyOptional({ example: 'MINT', enum: Power })
  power: Power;

  @ApiPropertyOptional()
  locationId: string;

  @ApiPropertyOptional({ example: 'mower' })
  tagName: string;

  @ApiProperty({ example: '2021-05-01T00:00:00.000Z' })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ example: '2021-05-01T00:00:00.000Z' })
  @IsDateString()
  updatedAt: Date;
}

export class ListVehiclesDto implements Pick<Prisma.VehicleFindManyArgs, 'skip' | 'where' | 'orderBy'> {
  @ApiPropertyOptional()
  skip?: number;

  @ApiPropertyOptional()
  where?: Prisma.VehicleWhereInput;

  @ApiPropertyOptional()
  orderBy?: Prisma.VehicleOrderByWithRelationInput;
}

export class FindVehicleDto implements Pick<Prisma.VehicleWhereUniqueInput, 'id'> {
  @ApiProperty({ required: true })
  id: string;
}

export class CreateVehicleDto implements Pick<Prisma.VehicleCreateInput, 'name'> {
  @ApiProperty({ example: 'Big Green' })
  name: string;

  @ApiPropertyOptional({ example: 'John Deere' })
  make: string;

  @ApiProperty({ example: 'Tractor' })
  model: string;

  @ApiProperty({ example: '2017' })
  year: number;

  @ApiProperty({ example: 500 })
  hours: number;

  @ApiPropertyOptional({ example: true })
  active: boolean;

  @ApiPropertyOptional({ example: 'MINT', enum: Power })
  power: Power;

  @ApiPropertyOptional()
  locationId: string;

  @ApiPropertyOptional({ example: 'mower' })
  tagName: string;
}

export class UpdateVehicleDto implements Partial<CreateVehicleDto> {}
