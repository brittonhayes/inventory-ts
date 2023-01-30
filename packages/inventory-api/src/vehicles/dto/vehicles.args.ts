import { ArgsType, Field, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CreateVehicleDto } from './create-vehicle.dto';

@ArgsType()
export class ListVehiclesArgs extends PartialType(CreateVehicleDto, ArgsType) {}

@ArgsType()
export class FilterVehiclesArgs {
  @Field(() => Prisma.VehicleScalarFieldEnum, { defaultValue: Prisma.VehicleScalarFieldEnum.updatedAt, nullable: true })
  orderBy?: Prisma.VehicleScalarFieldEnum;

  @Field(() => Prisma.SortOrder, { nullable: true })
  sort?: Prisma.SortOrder;

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  skip?: number;

  @Field(() => Number, { nullable: true })
  take?: number;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  includeAttachments?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  includeGuides?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  includeParts?: boolean;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  includeImplements?: boolean;
}
