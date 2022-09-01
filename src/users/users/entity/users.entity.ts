import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Customer } from '../../customers/entity/customer.entity';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ type: Types.ObjectId, ref: Customer.name })
  customer: Types.ObjectId | Customer;
}

export const UserSchema = SchemaFactory.createForClass(User);
