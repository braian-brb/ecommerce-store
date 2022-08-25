import { Inject, Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';
import { UserModule } from './users/users.module';
import { firstValueFrom } from 'rxjs';

const API_KEY = '1234567';
const API_KEY_PROD = 'PROD123541323SA';

@Module({
  imports: [ProductModule, UserModule, HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const url = 'https://jsonplaceholder.typicode.com/todos';
        const tasks = await http.get(url);
        const data = await await (await firstValueFrom(tasks)).data;
        return data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
