import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { MaintenanceTask } from '../../maintenance/dto/tasks.dto';

@ObjectType()
export class Tool {
  @Field((type) => String)
  @ApiProperty({ type: String })
  id: string;

  @Field(() => String)
  @ApiProperty({ type: String })
  name: string;

  @Field(() => [MaintenanceTask], { nullable: true })
  @ApiPropertyOptional({ isArray: true, type: () => MaintenanceTask })
  tasks?: MaintenanceTask[];
}

export class ToolResponse extends Tool {}

@InputType()
export class CreateToolDto extends OmitType(Tool, ['id', 'tasks'] as const) {}

@InputType()
export class UpdateToolDto extends PartialType(CreateToolDto) {}
