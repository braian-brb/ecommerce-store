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

@Controller('products')
export class ProductController {
  @Get()
  getAll(
    // Infiere el tipado y valores por defecto
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return {
      message: `products: LIMIT => ${limit}, OFFSET => ${offset}, BRAND => ${brand}`,
    };
  }

  @Get('/:id')
  get(@Param('id') id: string) {
    return {
      message: `product ${id}`,
    };
  }

  @Get('/filter')
  getProductFilter() {
    return `yo soy un filter`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Accion de crear',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id,
    };
  }
}
