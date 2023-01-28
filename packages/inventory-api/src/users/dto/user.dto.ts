import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty, PartialType } from '@nestjs/swagger';

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

export class CreateUserDto {
  @Field()
  @ApiProperty({ type: String })
  username: string;

  @Field()
  @ApiProperty({ type: String, nullable: true })
  name?: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: String, nullable: true })
  refreshToken: string;

  @Field()
  @ApiProperty({ type: String, nullable: true })
  provider?: string;

  @Field()
  @ApiProperty({ type: String, nullable: true })
  providerId?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
