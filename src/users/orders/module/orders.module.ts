import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Order } from '../entity/order.entity';

import { ProductModule } from 'src/products/products/module/products.module';
import { UserModule } from 'src/users/users/module/users.module';
import { OrderController } from '../controller/orders.controller';
import { OrderService } from '../service/orders.service';

@Module({
  imports: [ProductModule, UserModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
