import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Min,
  ValidateNested,
} from 'class-validator';
import { PartialType, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class Products {
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsPositive()
  @Min(1)
  @IsOptional()
  quantity: number;
}

export class CreateCartDto {
  @IsNotEmpty()
  @IsMongoId()
  user: string;

  @ValidateNested()
  @Type(() => Products)
  readonly products: Products[];
}

export class UpdateCartDto extends PartialType(CreateCartDto) {}

export class UpdateProductInCartDto {
  @IsMongoId()
  @IsNotEmpty()
  cartId: string;

  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsOptional()
  quantity: number;
}

export class AddProductDto {
  @IsMongoId()
  @IsNotEmpty()
  cartId: string;

  @IsMongoId()
  @IsNotEmpty()
  productsId: string[] | string;
}
