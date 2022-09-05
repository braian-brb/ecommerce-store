import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty()
  @IsString()
  readonly email: string;

  @IsString()
  @ApiProperty()
  readonly password: string;
}
