import { InputType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { UpdateGuideRequest } from '@app/grpc/proto/guide.pb';

@InputType()
export class UpdateGuideDto implements UpdateGuideRequest {
  @Exclude()
  id: string;

  name: string;
  content: string;
}
