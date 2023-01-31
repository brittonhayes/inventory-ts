import { InputType, PartialType } from '@nestjs/graphql';
import { CreateImplementDto } from './create-implement.dto';

@InputType()
export class UpdateImplementDto extends PartialType(CreateImplementDto) {}
