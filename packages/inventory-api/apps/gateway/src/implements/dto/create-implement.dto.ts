import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import { Implement } from '../entities/implement.entity';

@InputType()
export class CreateImplementDto extends OmitType(Implement, [
  'id',
  'compatibleVehicles',
  'compatibleAttachments',
] as const) {}
