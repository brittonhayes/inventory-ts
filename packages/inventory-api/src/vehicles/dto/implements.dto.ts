import { ObjectType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Condition, ImplementType } from '@prisma/client';
import { Attachment } from './attachments.dto';
import { Vehicle } from './vehicles.dto';

registerEnumType(ImplementType, {
  name: 'ImplementType',
});

@ObjectType()
export class Implement {
  @Field((type) => String)
  @ApiProperty({ type: String })
  id: string;

  @Field(() => String)
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Field(() => String)
  @ApiProperty({ type: Date })
  updatedAt: Date;

  @Field(() => Boolean, { nullable: true })
  @ApiPropertyOptional({ type: Boolean, default: true })
  isOwned?: boolean = true;

  @Field(() => String)
  @ApiProperty({ type: String })
  name: string;

  @Field(() => String)
  @ApiProperty({ type: String })
  make: string;

  @Field(() => String)
  @ApiProperty({ type: String })
  model: string;

  @Field(() => Number, { nullable: true })
  @ApiPropertyOptional({ type: Number })
  year?: number;

  @Field(() => Condition, { nullable: true })
  @ApiPropertyOptional({ enum: Condition, enumName: 'Condition' })
  condition?: Condition;

  @Field(() => ImplementType, { nullable: true })
  @ApiPropertyOptional({ enum: ImplementType, enumName: 'ImplementType' })
  implementType?: ImplementType;

  @Field(() => [Vehicle], { nullable: true })
  @ApiPropertyOptional({ isArray: true, type: () => Vehicle })
  compatibleVehicles?: Vehicle[];

  @Field(() => [Attachment], { nullable: true })
  @ApiPropertyOptional({ isArray: true, type: () => Attachment })
  compatibleAttachments?: Attachment[];
}

export class ImplementResponse extends OmitType(Implement, ['compatibleVehicles', 'compatibleAttachments'] as const) {}

@InputType()
export class CreateImplementDto extends OmitType(Implement, [
  'id',
  'compatibleVehicles',
  'compatibleAttachments',
] as const) {}

@InputType()
export class UpdateImplementDto extends PartialType(CreateImplementDto) {}
