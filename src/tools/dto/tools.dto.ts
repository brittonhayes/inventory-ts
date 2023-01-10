import { MaintenanceTask } from 'src/maintenance/dto/tasks.dto';
import { ApiProperty, ApiPropertyOptional, OmitType, PartialType, PickType } from '@nestjs/swagger';

export class Tool {
  @ApiProperty({ type: String })
  id: string;

  @ApiPropertyOptional({ type: String, description: 'The name of the tool.' })
  name?: string;

  @ApiPropertyOptional({ type: () => MaintenanceTask })
  maintenanceTask?: MaintenanceTask;

  @ApiPropertyOptional({ type: String })
  maintenanceTaskId?: string;
}

export class ToolResponse extends Tool {}

export class CreateToolDto extends OmitType(Tool, ['id', 'maintenanceTask'] as const) {}

export class UpdateToolDto extends PartialType(CreateToolDto) {}

export class DeleteToolDto extends PickType(Tool, ['id'] as const) {}

export class ConnectToolDto extends PickType(Tool, ['id'] as const) {}

export class ConnectToolRelationInputDto {
  create?: CreateToolDto;
  connect?: ConnectToolDto;
}
