import { InputType, PartialType, OmitType } from '@nestjs/graphql';
import { CreateMaintenanceGuideDto } from './create-guide.dto';

@InputType()
export class UpdateMaintenanceGuideDto extends PartialType(
  OmitType(CreateMaintenanceGuideDto, ['name', 'content'] as const),
) {
  name: string;
  content: string;
}
