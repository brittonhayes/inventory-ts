import { ObjectType, Field, GraphQLISODateTime, registerEnumType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Condition, VehicleType, PowerType, Prisma } from '@prisma/client';
import { Implement } from '../../implements/entities/implement.entity';
import { MaintenanceGuide } from '../../guides/entities/guide.entity';
import { VehiclePart } from '../../parts/entities/part.entity';
import { Attachment } from '../dto/attachments.dto';

registerEnumType(Prisma.SortOrder, {
  name: 'vehiclesSort',
});

registerEnumType(Prisma.VehicleScalarFieldEnum, {
  name: 'vehiclesOrder',
});

registerEnumType(Condition, {
  name: 'condition',
});

registerEnumType(VehicleType, {
  name: 'vehicleType',
});

registerEnumType(PowerType, {
  name: 'powerType',
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

  @Field(() => PowerType, { defaultValue: PowerType.DIESEL })
  @ApiProperty({ default: PowerType.DIESEL, enum: PowerType, enumName: 'PowerType' })
  power: PowerType = PowerType.DIESEL;

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
