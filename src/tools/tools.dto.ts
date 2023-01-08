import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Tool, Prisma, Condition } from '@prisma/client';
import { IsDateString } from 'class-validator';

export class ToolResponse implements Tool {
  @ApiProperty({ example: 'clch9rxw90000p718qrofjcqd' })
  id: string;

  @ApiProperty({ example: 'Barn' })
  name: string;

  @ApiPropertyOptional({ example: 'MINT' })
  condition: Condition;

  @ApiPropertyOptional()
  locationId: string;

  @ApiPropertyOptional({ example: 'mower' })
  tagName: string;

  @ApiProperty()
  maintenanceTaskId: string;

  @ApiProperty({ example: '2021-05-01T00:00:00.000Z' })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ example: '2021-05-01T00:00:00.000Z' })
  @IsDateString()
  updatedAt: Date;
}

export class ListToolsDto implements Pick<Prisma.ToolFindManyArgs, 'skip' | 'where' | 'orderBy'> {
  @ApiPropertyOptional()
  skip?: number;

  @ApiPropertyOptional()
  where?: Prisma.ToolWhereInput;

  @ApiPropertyOptional()
  orderBy?: Prisma.ToolOrderByWithRelationInput;
}

export class FindToolDto implements Pick<Prisma.ToolWhereUniqueInput, 'id'> {
  @ApiProperty({ required: true })
  id: string;
}

export class CreateToolDto implements Pick<Prisma.ToolCreateInput, 'name'> {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  condition?: Condition;

  @ApiPropertyOptional()
  locationId?: string;

  @ApiPropertyOptional()
  tagName?: string;
}

export class UpdateToolDto implements Pick<CreateToolDto, 'name' | 'condition' | 'tagName'> {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  condition: Condition;

  @ApiPropertyOptional()
  tagName: string;
}
