import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrderService } from './orders.service';
import {
  CreateOrderDto,
  UpdateOrderDto,
  AddProductsToOrderDto,
} from './dto/order.dto';
@ApiTags('Orders')
@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('all')
  getAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Put(':id/products')
  updateProducts(@Param('id') id: string, @Body() products: string[]) {
    return this.orderService.addProducts(id, products);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.orderService.remove(id);
  }

  @Delete(':id/products/:productId')
  deleteProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return this.orderService.removeProduct(id, productId);
  }
}
