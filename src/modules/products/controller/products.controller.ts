import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  Delete,
  // ParseIntPipe,
} from '@nestjs/common';

import { ProductService } from '../service/products.service';
import { ParseIntPipe } from '../../../common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../dto/products.dto';
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
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
