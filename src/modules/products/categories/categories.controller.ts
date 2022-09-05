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

import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
@ApiTags('Categories')
@Controller('')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('categories/:id/products/:productId')
  getCategory(@Param('id') id: string, @Param('productId') productId: string) {
    return `category ${id} and product ${productId}`;
  }

  @Get('all')
  getAll() {
    return this.categoriesService.findAll();
  }
  @Get('/:id')
  getOne(@Param('id') id) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
