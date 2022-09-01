import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '../../users/entity/users.entity';

@Schema({ versionKey: false })
export class Customer extends Document {
  // @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  // user: Types.ObjectId | User;

  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
