import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import { MaintenanceGuide } from '../entities/guide.entity';

@InputType()
export class CreateMaintenanceGuideDto extends OmitType(MaintenanceGuide, [
  'id',
  'createdAt',
  'updatedAt',
  'tasks',
  'vehicle',
] as const) {}
