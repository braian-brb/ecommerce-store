import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { ApiKeyGuard } from './auth/guards/api-key.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('tasks')
  getTasks() {
    return this.appService.getTasks();
  }

  @UseGuards(ApiKeyGuard)
  @Get('nuevo')
  newEndPoint() {
    return 'Yo soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'Con /sas/';
  }
}
