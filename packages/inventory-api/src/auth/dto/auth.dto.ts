import { ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

@ObjectType()
export class AuthDto {
  @ApiProperty({ type: String, description: 'Username used to create account' })
  username: string;

  @ApiProperty({ type: String, description: 'Password used to create account', minLength: 14 })
  @IsStrongPassword(
    {
      // TODO: Improve password validation requirements
      minLength: 12,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
    },
    { message: 'Password must be at least 14 characters long and contain at least 1 lowercase letter' },
  )
  password: string;
}

export class JwtPayload {
  @ApiProperty({ type: String })
  sub: string;

  @ApiProperty({ type: String })
  username: string;
}
