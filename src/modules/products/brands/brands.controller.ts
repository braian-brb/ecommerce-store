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

import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';
@ApiTags('Brands')
@Controller()
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get('all')
  getAll() {
    return this.brandsService.findAll();
  }

  @Get('/:id')
  getOne(@Param('id') id) {
    return this.brandsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateBrandDto) {
    return this.brandsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.brandsService.remove(id);
  }
}
