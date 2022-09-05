import { Controller, Get, Param } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Public()
  @Get(':email')
  getChatByEmail(@Param('email') email: string) {
    return this.chatService.findByEmail(email);
  }
}
