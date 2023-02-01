import { InputType } from '@nestjs/graphql';
import { CreateGuideRequest } from '@app/grpc/proto/guide.pb';

@InputType()
export class CreateGuideDto implements CreateGuideRequest {
  name: string;
  content: string;
}
