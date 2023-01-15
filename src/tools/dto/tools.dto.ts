import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { MaintenanceTask } from '../../maintenance/dto/tasks.dto';

export class Tool {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ isArray: true, type: () => MaintenanceTask })
  tasks?: MaintenanceTask[];
}

export class ToolResponse extends Tool {}

export class CreateToolDto extends OmitType(Tool, ['id', 'tasks'] as const) {}

export class UpdateToolDto extends PartialType(CreateToolDto) {}
