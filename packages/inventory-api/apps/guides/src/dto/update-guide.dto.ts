import { InputType, PartialType, OmitType } from '@nestjs/graphql';
import { CreateGuideDto } from './create-guide.dto';

@InputType()
export class UpdateGuideDto extends PartialType(OmitType(CreateGuideDto, ['name', 'content'] as const)) {
  name: string;
  content: string;
}
