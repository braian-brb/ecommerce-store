import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsArray,
  IsMongoId,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCustomerDto {
  // @IsNotEmpty()
  // @IsMongoId()
  // user: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  readonly address: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
