import { ObjectType, Field, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { MaintenanceTask } from '../../maintenance/dto/tasks.dto';
import { Vehicle } from '../../vehicles/dto/vehicles.dto';

@ObjectType()
export class MaintenanceGuide {
  @Field((type) => String)
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
  @Length(1, 255)
  name: string;

  @Field(() => String)
  @ApiProperty({ type: String })
  @Length(1, 2000)
  content: string;

  @Field(() => [MaintenanceTask], { nullable: true })
  @ApiPropertyOptional({ isArray: true, type: () => MaintenanceTask })
  tasks?: MaintenanceTask[];

  @Field(() => Vehicle, { nullable: true })
  @ApiPropertyOptional({ type: () => Vehicle })
  vehicle?: Vehicle;

  @Field(() => String, { nullable: true })
  @ApiPropertyOptional({ type: String })
  vehicleId?: string;
}

@InputType()
export class CreateMaintenanceGuideDto extends OmitType(MaintenanceGuide, [
  'id',
  'createdAt',
  'updatedAt',
  'tasks',
  'vehicle',
] as const) {}

@InputType()
export class UpdateMaintenanceGuideDto extends PartialType(
  OmitType(CreateMaintenanceGuideDto, ['name', 'content'] as const),
) {
  name: string;
  content: string;
}

export class ConnectMaintenanceGuideDto extends PickType(MaintenanceGuide, ['id'] as const) {}

export class ConnectMaintenanceGuideRelationInputDto {
  create?: CreateMaintenanceGuideDto;
  connect?: ConnectMaintenanceGuideDto;
}
