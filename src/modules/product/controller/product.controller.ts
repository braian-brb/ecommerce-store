import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { ProductService } from '../service/product.service';

@Controller('products')
export class ProductController {
  constructor(private productsService: ProductService) {}
  @Get()
  getAll(
    // Infiere el tipado y valores por defecto
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();
  }

  @Get('/:id')
  get(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Get('/filter')
  getProductFilter() {
    return `yo soy un filter`;
  }

  @Post()
  create(@Body() payload: any) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.remove(Number(id));
  }
}
