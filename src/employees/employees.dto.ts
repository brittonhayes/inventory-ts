import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma, Employee } from '@prisma/client';
import { IsDateString } from 'class-validator';

export class EmployeeResponse implements Employee {
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

export class ListEmployeesDto implements Pick<Prisma.EmployeeFindManyArgs, 'skip' | 'where' | 'orderBy'> {
  @ApiPropertyOptional()
  skip?: number;

  @ApiPropertyOptional()
  where?: Prisma.EmployeeWhereInput;

  @ApiPropertyOptional()
  orderBy?: Prisma.EmployeeOrderByWithRelationInput;
}

export class FindEmployeeDto {
  @ApiProperty({ required: true })
  name: string;
}

export class CreateEmployeeDto implements Pick<Prisma.EmployeeCreateInput, 'name'> {
  @ApiProperty()
  name: string;
}

export class UpdateEmployeeDto extends CreateEmployeeDto {}
