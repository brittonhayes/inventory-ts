import { OmitType } from '@nestjs/graphql';
import { Implement } from './implement.entity';

export class ImplementResponse extends OmitType(Implement, ['compatibleVehicles', 'compatibleAttachments'] as const) {}
