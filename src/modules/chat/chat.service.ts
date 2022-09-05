import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/chat-dto';
import { CreateMessageDto } from './dto/message-dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { Chat, ChatSchema } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}
  create(createMessageDto: CreateMessageDto) {
    const newMessage = new this.chatModel(createMessageDto);
    return newMessage.save();
  }

  findAll() {
    return this.chatModel.find();
  }

  findOne(id: string) {
    return this.chatModel.findById(id);
  }

  findByEmail(email: string) {
    return this.chatModel.find({ email });
  }

  remove(id: string) {
    return this.chatModel.findByIdAndDelete(id);
  }
}
