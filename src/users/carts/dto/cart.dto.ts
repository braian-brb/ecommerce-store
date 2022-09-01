import { IsArray, IsDate, IsMongoId, IsNotEmpty } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/swagger';

export class CreateCartDto {
  @IsNotEmpty()
  @IsMongoId()
  user: string;

  // array of productIds Type IsMongoId
  @IsArray()
  @IsNotEmpty()
  products: any;
}

export class UpdateCartDto extends PartialType(CreateCartDto) {}

export class addProductToCartDto {
  @IsNotEmpty()
  @IsMongoId()
  productIds: string[] | string;
}
