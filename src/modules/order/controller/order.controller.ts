import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('order')
export class OrderController {
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
