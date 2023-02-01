import { Field, GraphQLISODateTime, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Condition, ImplementType } from '@prisma/client';
import { Attachment } from '../../vehicles/dto/attachments.dto';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

registerEnumType(ImplementType, {
  name: 'ImplementType',
});

@ObjectType()
export class Implement {
  @Field(() => String)
  @ApiProperty({ type: String })
  id: string;

  @Field(() => GraphQLISODateTime)
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
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
