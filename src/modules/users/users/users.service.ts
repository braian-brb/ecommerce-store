import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from './entity/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { MailService } from 'src/modules/mail/mail.service';

export interface UserWithoutPassword {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  _id: string;
  password?: string;
}
@Injectable()
export class UserService {
  constructor(
    private mailService: MailService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll() {
    return this.userModel.find({}, { password: 0 }).exec();
  }

  async findOne(id: number) {
    const user = await this.userModel.findById(id, { password: 0 }).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;

    const savedUser = await newUser.save();
    const userWithoutPassword: UserWithoutPassword = savedUser.toObject();
    delete userWithoutPassword.password;

    if (savedUser) {
      await this.mailService.newUserRegisteredEmail(userWithoutPassword);
      await this.mailService.sendWelcomeEmail(userWithoutPassword);
    }
    return userWithoutPassword;
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.userModel
      .findByIdAndUpdate(
        id,
        { $set: updateUserDto },
        { new: true, projection: { password: 0 } },
      )
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
