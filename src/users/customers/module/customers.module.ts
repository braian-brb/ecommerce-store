import { Module } from '@nestjs/common';

import { CustomerController } from '../controller/customers.controller';
import { CustomerService } from '../service/customers.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
