import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Condition } from '@prisma/client';
import { Vehicle } from './vehicles.dto';

export class Attachment {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Boolean, default: true })
  isOwned?: boolean = true;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ enum: Condition, enumName: 'Condition' })
  condition?: Condition;

  @ApiPropertyOptional({ isArray: true, type: () => Vehicle })
  compatibleVehicles?: Vehicle[];
}
