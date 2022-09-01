import { Module } from '@nestjs/common';

import { UserModule as UserModuleFolder } from './users/module/users.module';
import { CustomerModule } from './customers/module/customers.module';
import { OrderModule } from './orders/module/orders.module';
import { CartsModule } from './carts/module/carts.module';
import { ProfileController } from './users/controller/profile.controller';

@Module({
  imports: [UserModuleFolder, CustomerModule, OrderModule, CartsModule],
  controllers: [ProfileController],
})
export class UserModule {}
