import { Module } from '@nestjs/common';

import { UserModule as UserModuleFolder } from './users/module/users.module';
import { CustomerModule } from './customers/module/customers.module';

@Module({
  imports: [UserModuleFolder, CustomerModule],
})
export class UserModule {}
