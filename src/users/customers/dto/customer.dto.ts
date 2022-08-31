import { IsString, IsNotEmpty, IsPhoneNumber, IsArray } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  readonly address: string;

  @IsArray()
  @IsNotEmpty()
  readonly skills: any;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
