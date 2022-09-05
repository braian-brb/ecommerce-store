import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Cart, CartSchema } from './entity/cart.entity';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { ProductModule } from '../../products/products/products.module';
import { UserModule } from '../users/users.module';

@Module({
  imports: [
    ProductModule,
    UserModule,
    MongooseModule.forFeature([
      {
        name: Cart.name,
        schema: CartSchema,
      },
    ]),
  ],
  controllers: [CartsController],
  providers: [CartsService],
  exports: [CartsService],
})
export class CartsModule {}
