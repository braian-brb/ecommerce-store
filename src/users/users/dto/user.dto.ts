import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsMongoId,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'The email of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  readonly password: string;

  // @IsNotEmpty()
  // @IsMongoId()
  // @ApiProperty()
  // customer: string;

  // @IsNotEmpty()
  // readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  customer: string;
}
