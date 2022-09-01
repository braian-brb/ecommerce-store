import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../entity/users.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll() {
    // project password field to 0
    return this.userModel.find({}, { password: 0 }).populate('customer').exec();
  }

  async findOne(id: number) {
    const user = await this.userModel.findById(id).populate('customer').exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = new this.userModel(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    const savedUser = await newUser.save({});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = savedUser.toJSON();
    return userWithoutPassword;
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  update(id: string, changes: UpdateUserDto) {
    const user = this.userModel
      .findByIdAndUpdate(
        id,
        { $set: changes },
        { new: true, projection: { password: 0 } },
      )
      .populate('customer')
      .exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  remove(id: string) {
    return this.userModel
      .findByIdAndDelete(id, { projection: { password: 0 } })
      .exec();
  }
}
