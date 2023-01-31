import { InputType, PartialType } from '@nestjs/graphql';
import { CreateToolDto } from './create-tool.dto';

@InputType()
export class UpdateToolDto extends PartialType(CreateToolDto) {}
