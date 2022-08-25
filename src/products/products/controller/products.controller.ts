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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ProductService } from '../service/products.service';

import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dto/products.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private productsService: ProductService) {}
  @Get()
  @ApiOperation({ summary: 'List of products' })
  getAll(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Get('/:id')
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
}
