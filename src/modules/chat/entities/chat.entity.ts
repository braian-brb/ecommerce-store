import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Chat extends Document {
  @Prop({ required: true })
  email: string;

  @Prop()
  message: string;

  @Prop()
  role: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
