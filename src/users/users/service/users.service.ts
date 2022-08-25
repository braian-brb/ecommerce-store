import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../entity/users.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);
    return this.userModel.find().exec();
  }

  async findOne(id: number) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  // create(payload: CreateUserDto) {
  //   this.counterId++;
  //   const newUser = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.users.push(newUser);
  //   return newUser;
  // }

  // update(id: number, payload: UpdateUserDto) {
  //   const user = this.findOne(id);
  //   if (!user) {
  //     return null;
  //   }
  //   const index = this.users.findIndex((item) => item.id === id);
  //   this.users[index] = {
  //     ...user,
  //     ...payload,
  //   };
  //   return this.users[index];
  // }

  // remove(id: number) {
  //   const index = this.users.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`User #${id} not found`);
  //   }
  //   this.users.splice(index, 1);
  //   return true;
  // }
}
