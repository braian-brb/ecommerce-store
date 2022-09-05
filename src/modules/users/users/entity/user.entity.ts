import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
