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

import { UserService } from '../service/users.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  // @Post()
  // create(@Body() payload: CreateUserDto) {
  //   return this.userService.create(payload);
  // }

  // @Put(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() payload: UpdateUserDto,
  // ) {
  //   return this.userService.update(id, payload);
  // }

  // @Delete(':id')
  // delete(@Param('id', ParseIntPipe) id: number) {
  //   return this.userService.remove(id);
  // }
}
