import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import { Guide } from '../entities/guide.entity';

@InputType()
export class CreateGuideDto extends OmitType(Guide, ['id', 'createdAt', 'updatedAt'] as const) {}
