import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';
import { UserModule } from './users/users.module';
import { firstValueFrom } from 'rxjs';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ProductModule,
    UserModule,
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,

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
