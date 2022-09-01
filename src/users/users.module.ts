import { Module } from '@nestjs/common';

import { UserModule as UserModuleFolder } from './users/module/users.module';
import { OrderModule } from './orders/module/orders.module';
import { CartsModule } from './carts/module/carts.module';
import { ProfileController } from './users/controller/profile.controller';

@Module({
  imports: [UserModuleFolder, OrderModule, CartsModule],
  controllers: [ProfileController],
})
export class UserModule {}
