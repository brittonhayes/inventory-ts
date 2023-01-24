import { Field, ObjectType, registerEnumType, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Condition, PowerType, VehicleType } from '@prisma/client';
import { MaintenanceGuide } from '../../maintenance/dto/guides.dto';
import { Attachment } from './attachments.dto';
import { Implement } from './implements.dto';
import { VehiclePart } from './parts.dto';

registerEnumType(Condition, {
  name: 'Condition',
});

registerEnumType(PowerType, {
  name: 'PowerType',
});

registerEnumType(VehicleType, {
  name: 'VehicleType',
});

@ObjectType()
export class Vehicle {
  @ApiProperty({ type: String })
  @Field((type) => String)
  id: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ type: String })
  name?: string;

  @Field(() => GraphQLISODateTime)
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @ApiProperty({ type: Date })
  updatedAt: Date;

  @Field({ nullable: true })
  @ApiPropertyOptional({ type: Boolean, default: true })
  isOwned?: boolean = true;

  @Field(() => Number, { nullable: true })
  @ApiPropertyOptional({ type: Number })
  year?: number;

  @Field(() => Condition)
  @ApiPropertyOptional({ enum: Condition, enumName: 'Condition' })
  condition?: Condition = Condition.GOOD;

  @Field(() => VehicleType)
  @ApiProperty({ enum: VehicleType, enumName: 'VehicleType' })
  vehicleType: VehicleType;

  @Field(() => String)
  @ApiProperty({ type: String })
  make: string;

  @Field(() => String)
  @ApiProperty({ type: String })
  model: string;

  @Field(() => Number)
  @ApiPropertyOptional({ type: Number })
  machineHours?: number;

  @Field(() => String, { nullable: true })
  @ApiPropertyOptional({ type: String })
  link?: string;

  @Field(() => PowerType)
  @ApiProperty({ enum: PowerType, enumName: 'PowerType' })
  power: PowerType = PowerType.GAS;

  @Field((type) => [MaintenanceGuide], { nullable: true })
  @ApiPropertyOptional({ isArray: true, type: () => MaintenanceGuide })
  guides?: MaintenanceGuide[];

  @Field((type) => [VehiclePart], { nullable: true })
  @ApiPropertyOptional({ isArray: true, type: () => VehiclePart })
  compatibleParts?: VehiclePart[];

  @Field((type) => [Attachment], { nullable: true })
  @ApiPropertyOptional({ isArray: true, type: () => VehiclePart })
  compatibleAttachments?: Attachment[];

  @Field((type) => [Implement], { nullable: true })
  @ApiPropertyOptional({ isArray: true, type: () => Implement })
  compatibleImplements?: Implement[];
}

@InputType()
export class VehicleQuery {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  includeAttachments?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  includeGuides?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  includeParts?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  includeImplements?: boolean;
}

@ObjectType()
export class VehicleResponse extends OmitType(Vehicle, [
  'guides',
  'compatibleParts',
  'compatibleAttachments',
] as const) {}

@InputType()
export class CreateVehicleDto {
  @ApiProperty({ type: String })
  @Field(() => String)
  name: string;

  @ApiProperty({ type: Number })
  @Field(() => Number, { nullable: true })
  year?: number;

  @ApiPropertyOptional({ enum: Condition, enumName: 'Condition' })
  @Field(() => Condition, { nullable: true })
  condition?: Condition = Condition.GOOD;

  @ApiProperty({ enum: VehicleType, enumName: 'VehicleType' })
  @Field(() => VehicleType)
  vehicleType: VehicleType;

  @ApiProperty({ type: String })
  @Field(() => String)
  make: string;

  @ApiProperty({ type: String })
  @Field(() => String)
  model: string;

  @ApiPropertyOptional({ type: Number })
  @Field(() => Number, { nullable: true })
  machineHours?: number;

  @ApiPropertyOptional({ type: String })
  @Field(() => String, { nullable: true })
  link?: string;

  @ApiProperty({ enum: PowerType, enumName: 'PowerType' })
  @Field(() => PowerType)
  power: PowerType = PowerType.GAS;
}

@InputType()
export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}

export class ConnectVehicleDto extends PickType(Vehicle, ['id'] as const) {}

export class ConnectVehicleRelationInputDto {
  create?: CreateVehicleDto;
  connect?: ConnectVehicleDto;
}
