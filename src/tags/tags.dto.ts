import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma, Tag } from '@prisma/client';
import { IsDateString } from 'class-validator';

export class TagResponse implements Tag {
  @ApiProperty({ example: 'clch9rxw90000p718qrofjcqd' })
  id: string;

  @ApiProperty({ example: 'Mower' })
  name: string;

  @ApiProperty({ example: '2021-05-01T00:00:00.000Z' })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ example: '2021-05-01T00:00:00.000Z' })
  @IsDateString()
  updatedAt: Date;
}

export class ListTagsDto implements Pick<Prisma.TagFindManyArgs, 'skip' | 'where' | 'orderBy'> {
  @ApiPropertyOptional()
  skip?: number;

  @ApiPropertyOptional()
  where?: Prisma.TagWhereInput;

  @ApiPropertyOptional()
  orderBy?: Prisma.TagOrderByWithRelationInput;
}

export class FindTagDto implements Pick<Prisma.TagWhereUniqueInput, 'name'> {
  @ApiProperty({ required: true })
  name: string;
}

export class CreateTagDto implements Pick<Prisma.TagCreateInput, 'name'> {
  @ApiProperty()
  name: string;
}

export class UpdateTagDto extends CreateTagDto {}
