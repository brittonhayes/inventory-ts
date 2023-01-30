import { PickType } from '@nestjs/swagger';
import { Implement } from '../entities/implement.entity';

export class DeleteImplementDto extends PickType(Implement, ['id'] as const) {}
