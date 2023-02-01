import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

@ObjectType()
export class Guide {
  @Field(() => String)
  @ApiProperty({ type: String })
  id: string;

  @Field(() => GraphQLISODateTime)
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @ApiProperty({ type: Date })
  updatedAt: Date;

  @Field(() => String)
  @ApiProperty({ type: String })
  @Length(1, 255)
  name: string;

  @Field(() => String)
  @ApiProperty({ type: String })
  @Length(1, 2000)
  content: string;
}
