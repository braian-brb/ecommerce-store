import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Cart, CartSchema } from '../entity/cart.entity';
import { CartsService } from '../service/carts.service';
import { CartsController } from '../controller/carts.controller';
import { ProductModule } from '../../../products/products/module/products.module';
import { UserModule } from '../../users/module/users.module';

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
