import { Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

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
