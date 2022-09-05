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

import { UserService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
@ApiTags('Users')
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  get(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.userService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
