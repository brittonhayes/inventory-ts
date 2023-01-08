import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Condition, MaintenanceGuide, Prisma } from '@prisma/client';
import { IsDateString, Length } from 'class-validator';

export class MaintenanceGuideResponse implements MaintenanceGuide {
  @ApiProperty({ example: 'clch9rxw90000p718qrofjcqd' })
  id: string;

  @ApiProperty({ example: 'Barn' })
  name: string;

  @Length(0, 2000, {
    message: 'Notes must be less than 2000 characters',
  })
  content: string;

  guideId: string;
  vehicleId: string;

  @ApiProperty({ example: '2021-05-01T00:00:00.000Z' })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ example: '2021-05-01T00:00:00.000Z' })
  @IsDateString()
  updatedAt: Date;
}

export class ListMaintenanceGuidesDto
  implements Pick<Prisma.MaintenanceGuideFindManyArgs, 'skip' | 'where' | 'orderBy'>
{
  @ApiPropertyOptional()
  skip?: number;

  @ApiPropertyOptional()
  where?: Prisma.MaintenanceGuideWhereInput;

  @ApiPropertyOptional()
  orderBy?: Prisma.MaintenanceGuideOrderByWithRelationInput;
}

export class FindMaintenanceGuidesDto implements Pick<Prisma.MaintenanceGuideWhereUniqueInput, 'id'> {
  @ApiProperty()
  id: string;
}

export class CreateMaintenanceGuideDto implements Pick<Prisma.MaintenanceGuideCreateInput, 'name'> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  content: string;
}

export class UpdateMaintenanceGuideDto implements Partial<CreateMaintenanceGuideDto> {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  condition?: Condition;
}
