import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CustomerService } from '../service/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customer.dto';
@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private customersService: CustomerService) {}

  @Get()
  getAll() {
    return this.customersService.findAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCustomerDto) {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
