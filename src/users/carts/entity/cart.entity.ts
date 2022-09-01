import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Product } from '../../../products/products/entity/product.entity';
import { User } from '../../users/entity/users.entity';
@Schema({ versionKey: false, timestamps: true })
export class Cart extends Document {
  // Create userId field required and unique red: User.name Type ObjectId
  @Prop({ type: Types.ObjectId, ref: User.name, required: true, unique: true })
  user: Types.ObjectId | User;

  @Prop({
    type: [
      {
        product: { type: Types.ObjectId, ref: Product.name },
        quantity: { type: Number, default: 1 },
      },
    ],
    _id: false,
  })
  products: Types.Array<Record<string, any>>;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
