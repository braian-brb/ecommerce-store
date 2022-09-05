import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Order, OrderSchema } from './entity/order.entity';
import { ProductModule } from 'src/modules/products/products/products.module';
import { UserModule } from 'src/modules/users/users/users.module';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';
import { MailModule } from 'src/modules/mail/mail.module';

@Module({
  imports: [
    MailModule,
    ProductModule,
    UserModule,
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
