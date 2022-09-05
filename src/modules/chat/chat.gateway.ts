import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/chat-dto';
import { CreateMessageDto } from './dto/message-dto';

@WebSocketGateway(3001, { cors: '*' })
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  // // @WebSocketServer()
  // @SubscribeMessage('message')
  // handleMessage(@MessageBody() message: string): void {
  //   console.log('message', message);
  //   this.server.emit('message', message);
  // }

  @WebSocketServer()
  server;
  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    console.log('createMessageDto', createMessageDto);
    this.server.emit('createMessage', createMessageDto);
    return this.chatService.create(createMessageDto);
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  // @SubscribeMessage('findOneChat')
  // findOne(@MessageBody() id: number) {
  //   return this.chatService.findOne(id);
  // }

  // @SubscribeMessage('updateChat')
  // update(@MessageBody() updateChatDto: UpdateChatDto) {
  //   return this.chatService.update(updateChatDto.id, updateChatDto);
  // }

  // @SubscribeMessage('removeChat')
  // remove(@MessageBody() id: number) {
  //   return this.chatService.remove(id);
  // }
}
