import { InputType, OmitType } from '@nestjs/graphql';
import { Tool } from '../entities/tool.entity';

@InputType()
export class CreateToolDto extends OmitType(Tool, ['id', 'tasks'] as const) {}
