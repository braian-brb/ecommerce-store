import { IsArray, IsDate, IsMongoId, IsNotEmpty } from 'class-validator';
import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';
// import { User } from 'src/users/users/entity/users.entity';
// import { Product } from 'src/products/products/entity/product.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  readonly date: Date;

  @IsNotEmpty()
  @ApiProperty()
  @IsMongoId()
  readonly customer: string;

  @ApiProperty()
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
