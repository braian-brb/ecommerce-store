import { Module } from '@nestjs/common';

import { UserModule as UserModuleFolder } from './users/module/users.module';
import { CustomerModule } from './customers/module/customers.module';
import { OrderModule } from './orders/module/orders.module';

@Module({
  imports: [UserModuleFolder, CustomerModule, OrderModule],
})
export class UserModule {}
