import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('MONGO') private database: Db,
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    return `Hello World! ${apiKey}, ${dbName}`;
  }

  async getTasks() {
    const taskCollection = this.database.collection('tasks');
    const tasks = await taskCollection.find().toArray();
    return tasks;
  }
}
