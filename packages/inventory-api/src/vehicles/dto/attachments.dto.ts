import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Condition } from '@prisma/client';
import { Vehicle } from './vehicles.dto';

@ObjectType()
export class Attachment {
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

  @Field(() => String, { nullable: true })
  @ApiPropertyOptional({ enum: Condition, enumName: 'Condition' })
  condition?: Condition;

  @Field(() => String, { nullable: true })
  @ApiPropertyOptional({ isArray: true, type: () => Vehicle })
  compatibleVehicles?: Vehicle[];
}
