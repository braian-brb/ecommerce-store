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

import { CartsService } from './carts.service';
import {
  CreateCartDto,
  AddProductDto,
  UpdateProductInCartDto,
} from './dto/cart.dto';

@ApiTags('Carts')
@Controller()
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('all')
  async findAll() {
    return await this.cartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(id);
  }

  @Get(':userId/all')
  getCartByUser(@Param('userId') userId: string) {
    return this.cartsService.getCartByUser(userId);
  }

  @Get('/:id/products/:productId')
  getProductInCart(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return this.cartsService.getProductById(id, productId);
  }

  @Put(':id/products/:productId')
  updateProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    const updateProductInCartDto: UpdateProductInCartDto = {
      cartId: id,
      productId,
      quantity,
    };
    return this.cartsService.updateProduct(updateProductInCartDto);
  }

  @Post('create')
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Put(':id/products')
  addProduct(@Body('products') products: string[], @Param('id') id: string) {
    const addProductDto: AddProductDto = {
      cartId: id,
      products,
    };
    return this.cartsService.addProduct(addProductDto);
  }

  @Delete(':id/products/:productId')
  removeProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return this.cartsService.removeProduct(id, productId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }
}
