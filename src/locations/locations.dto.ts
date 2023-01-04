import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Location, Prisma } from '@prisma/client';
import { IsDateString } from 'class-validator';

export class LocationResponse implements Location {
  @ApiProperty({ example: 'clch9rxw90000p718qrofjcqd' })
  id: string;

  @ApiProperty({ example: 'Barn' })
  name: string;

  @ApiProperty({ example: '2021-05-01T00:00:00.000Z' })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ example: '2021-05-01T00:00:00.000Z' })
  @IsDateString()
  updatedAt: Date;
}

export class ListLocationsDto implements Pick<Prisma.LocationFindManyArgs, 'skip' | 'where' | 'orderBy'> {
  @ApiPropertyOptional()
  skip?: number;

  @ApiPropertyOptional()
  where?: Prisma.LocationWhereInput;

  @ApiPropertyOptional()
  orderBy?: Prisma.LocationOrderByWithRelationInput;
}

export class FindLocationDto implements Pick<Prisma.LocationWhereUniqueInput, 'id'> {
  @ApiProperty({ required: true })
  id: string;
}

export class CreateLocationDto implements Partial<Prisma.LocationCreateInput> {
  @ApiProperty()
  name: string;
}

export class UpdateLocationDto extends CreateLocationDto {}
