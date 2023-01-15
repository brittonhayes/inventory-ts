import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Condition, ImplementType } from '@prisma/client';
import { Attachment } from './attachments.dto';
import { Vehicle } from './vehicles.dto';

export class Implement {
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

  @ApiProperty({ type: String })
  make: string;

  @ApiProperty({ type: String })
  model: string;

  @ApiPropertyOptional({ type: Number })
  year?: number;

  @ApiPropertyOptional({ enum: Condition, enumName: 'Condition' })
  condition?: Condition;

  @ApiPropertyOptional({ enum: ImplementType, enumName: 'ImplementType' })
  implementType?: ImplementType;

  @ApiPropertyOptional({ isArray: true, type: () => Vehicle })
  compatibleVehicles?: Vehicle[];

  @ApiPropertyOptional({ isArray: true, type: () => Attachment })
  compatibleAttachments?: Attachment[];
}

export class ImplementResponse extends OmitType(Implement, ['compatibleVehicles', 'compatibleAttachments'] as const) {}

export class CreateImplementDto extends OmitType(Implement, [
  'id',
  'compatibleVehicles',
  'compatibleAttachments',
] as const) {}

export class UpdateImplementDto extends PartialType(CreateImplementDto) {}
