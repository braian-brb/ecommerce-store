import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Category extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
