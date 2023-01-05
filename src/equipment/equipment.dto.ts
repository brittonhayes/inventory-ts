import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Equipment, Prisma, Condition } from '@prisma/client';
import { IsDateString } from 'class-validator';

export class EquipmentResponse implements Equipment {
  @ApiProperty({ example: 'clch9rxw90000p718qrofjcqd' })
  id: string;

  @ApiProperty({ example: 'Shovel' })
  name: string;

  @ApiPropertyOptional({ example: 'MINT' })
  condition: Condition;

  @ApiPropertyOptional()
  locationId: string;

  @ApiPropertyOptional({ example: 'Harvesting' })
  tagName: string;

  @ApiProperty({ example: '2021-05-01T00:00:00.000Z' })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ example: '2021-05-01T00:00:00.000Z' })
  @IsDateString()
  updatedAt: Date;
}

export class ListEquipmentsDto implements Pick<Prisma.EquipmentFindManyArgs, 'skip' | 'where' | 'orderBy'> {
  @ApiPropertyOptional()
  skip?: number;

  @ApiPropertyOptional()
  where?: Prisma.EquipmentWhereInput;

  @ApiPropertyOptional()
  orderBy?: Prisma.EquipmentOrderByWithRelationInput;
}

export class FindEquipmentDto implements Pick<Prisma.EquipmentWhereUniqueInput, 'id'> {
  @ApiProperty({ required: true })
  id: string;
}

export class CreateEquipmentDto implements Pick<Prisma.EquipmentCreateInput, 'name'> {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  condition?: Condition;

  @ApiPropertyOptional()
  locationId?: string;

  @ApiPropertyOptional()
  tagName?: string;
}

export class UpdateEquipmentDto implements Pick<CreateEquipmentDto, 'name' | 'condition' | 'tagName'> {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  condition: Condition;

  @ApiPropertyOptional()
  tagName: string;
}
