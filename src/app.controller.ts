import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';

import { ApiKeyGuard } from './modules/auth/guards/api-key.guard';
import { Public } from './modules/auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
