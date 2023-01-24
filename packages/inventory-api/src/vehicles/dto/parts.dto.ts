import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Vehicle } from './vehicles.dto';

@ObjectType()
export class VehiclePart {
  @Field(() => String)
  @ApiProperty({ type: String })
  id: string;

  @Field(() => GraphQLISODateTime)
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @ApiProperty({ type: Date })
  updatedAt: Date;

  @Field(() => String)
  @ApiProperty({ type: String })
  name: string;

  @Field(() => [Vehicle], { nullable: true })
  @ApiPropertyOptional({ isArray: true, type: () => Vehicle })
  compatibleVehicles?: Vehicle[];
}

export class VehiclePartResponse extends OmitType(VehiclePart, ['compatibleVehicles'] as const) {}

export class CreateVehiclePartDto extends OmitType(VehiclePart, [
  'id',
  'createdAt',
  'updatedAt',
  'compatibleVehicles',
] as const) {}

export class UpdateVehiclePartDto extends PartialType(CreateVehiclePartDto) {}
