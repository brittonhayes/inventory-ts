import { Field, ObjectType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/swagger';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  provider: string;

  @Field()
  providerId: string;

  @Field()
  username: string;

  @Field()
  name?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export class CreateUserDto extends PartialType(User) {
  @Field()
  username: string;

  @Field()
  name?: string;

  @Field()
  provider: string;

  @Field()
  providerId: string;
}
