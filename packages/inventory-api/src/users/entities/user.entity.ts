import { ObjectType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class User {
  @Field()
  @ApiProperty({ type: String })
  id: string;

  @Field()
  @ApiProperty({ type: String })
  provider: string;

  @Field()
  @ApiProperty({ type: String })
  providerId: string;

  @Field()
  @ApiProperty({ type: String })
  username: string;

  @Field()
  @ApiProperty({ type: String, nullable: true })
  name?: string;

  @Field()
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Field()
  @ApiProperty({ type: Date })
  updatedAt: Date;
}
