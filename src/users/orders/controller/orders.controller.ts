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

import { OrderService } from '../service/orders.service';
import {
  CreateOrderDto,
  UpdateOrderDto,
  AddProductsToOrderDto,
} from '../dto/order.dto';
@ApiTags('Orders/users')
@Controller('orders/users')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  getAll() {
    return this.orderService.findAll();
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateOrderDto) {
    return this.orderService.update(id, payload);
  }

  @Put(':id/products')
  updateProducts(
    @Param('id') id: string,
    @Body() payload: AddProductsToOrderDto,
  ) {
    return this.orderService.addProducts(id, payload.productsIds);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.orderService.remove(id);
  }

  @Delete(':id/product/:productId')
  deleteProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return this.orderService.removeProduct(id, productId);
  }

  // @Get(':id')
  // getOrders(@Param('id') id) {
  //   return this.orderService.getOrderByUser(id);
  // }
}
