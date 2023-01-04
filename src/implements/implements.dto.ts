import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Condition, Implement, Prisma } from '@prisma/client';
import { IsDateString, IsUUID } from 'class-validator';

export class ImplementResponse implements Implement {
  @ApiProperty({ example: 'clch9rxw90000p718qrofjcqd' })
  id: string;

  @ApiProperty({ example: 'Rear Discharge Estate Mower' })
  name: string;

  @ApiPropertyOptional({ example: 'MINT' })
  condition: Condition;

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

export class ListImplementsDto implements Pick<Prisma.ImplementFindManyArgs, 'skip' | 'where' | 'orderBy'> {
  @ApiProperty({ required: false })
  skip?: number;

  @ApiProperty({ required: false })
  where?: Prisma.ImplementWhereInput;

  @ApiProperty({ required: false })
  orderBy?: Prisma.ImplementOrderByWithRelationInput;
}

export class FindImplementDto implements Pick<Prisma.ImplementWhereUniqueInput, 'id'> {
  @ApiProperty()
  id: string;
}

export class CreateImplementDto
  implements Pick<Prisma.ImplementCreateInput, 'name' | 'condition' | 'tag' | 'location'>
{
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  condition?: Condition;

  @ApiPropertyOptional()
  locationId?: string;

  @ApiPropertyOptional()
  tagName?: string;
}

export class UpdateImplementDto extends CreateImplementDto {}
