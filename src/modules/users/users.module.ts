import { Module } from '@nestjs/common';

import { UserModule as UserModuleFolder } from './users/users.module';
import { OrderModule } from './orders/orders.module';
import { CartsModule } from './carts/carts.module';
import { ProfileController } from './users/profile.controller';
import { RouterModule } from '@nestjs/core';
// USE CONFIG
@Module({
  imports: [
    UserModuleFolder,
    OrderModule,
    CartsModule,
    RouterModule.register([
      {
        path: 'users',
        module: UserModuleFolder,
        children: [
          {
            path: 'orders',
            module: OrderModule,
          },
          {
            path: 'carts',
            module: CartsModule,
          },
        ],
      },
    ]),
  ],
  controllers: [ProfileController],
})
export class UserModule {}
