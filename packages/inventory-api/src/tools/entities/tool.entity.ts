import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MaintenanceTask } from '../../tasks/entities/task.entity';

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
