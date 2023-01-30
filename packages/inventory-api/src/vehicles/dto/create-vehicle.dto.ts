import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Condition, VehicleType, PowerType } from '@prisma/client';

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
  @Field(() => Number, {
    description: 'Find machine hours greater than or equal to the number provided',
    nullable: true,
  })
  machineHours?: number;

  @ApiPropertyOptional({ type: String })
  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => PowerType, { defaultValue: PowerType.DIESEL })
  @ApiProperty({ default: PowerType.DIESEL, enum: PowerType, enumName: 'PowerType' })
  power: PowerType = PowerType.DIESEL;
}
