import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { User } from 'src/users/users/entity/users.entity';
import { Product } from 'src/products/products/entity/product.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  readonly date: Date;

  @IsNotEmpty()
  readonly user: User;

  readonly product: Product[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
