import { IsArray, IsDate, IsMongoId, IsNotEmpty } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/swagger';
// import { User } from 'src/users/users/entity/users.entity';
// import { Product } from 'src/products/products/entity/product.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsDate()
  readonly date: Date;

  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string;

  @IsArray()
  readonly products: string[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products']),
) {}

export class AddProductsToOrderDto {
  @IsNotEmpty()
  @IsArray()
  readonly productsIds: string[];
}
