import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './entity/user.entity';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { MailModule } from 'src/modules/mail/mail.module';

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
