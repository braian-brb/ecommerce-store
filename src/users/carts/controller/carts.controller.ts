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

import { CartsService } from '../service/carts.service';
import {
  CreateCartDto,
  UpdateCartDto,
  addProductToCartDto,
} from '../dto/cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  async findAll() {
    return await this.cartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(id);
  }

  // @Get('/:id/products/:productId')
  // getProductInCart(
  //   @Param('id') id: string,
  //   @Param('productId') productId: string,
  // ) {
  //   return this.cartsService.checkIfProductExistsInCart(id, productId);
  // }

  @Post('/users')
  create(
    // @Param('idUser') idUser: string,
    @Body() createCartDto: CreateCartDto,
  ) {
    return this.cartsService.create(createCartDto);
  }

  @Put(':id/products')
  addProduct(
    @Param('id') id: string,
    @Body('product') productId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartsService.addProduct(id, productId, quantity);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(id, updateCartDto);
  }

  // @Put(':id/product/:productId')
  // updateProduct(@Param('id') id: string, @Body('productId') productId: string) {
  //   return this.cartsService.addProduct(id, productId);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }

  @Delete(':id/products/:productId')
  removeProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return this.cartsService.removeProduct(id, productId);
  }
}
