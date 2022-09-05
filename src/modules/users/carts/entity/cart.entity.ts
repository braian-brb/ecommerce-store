import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Product } from '../../../products/products/entity/product.entity';
import { User } from '../../users/entity/user.entity';
@Schema({ versionKey: false, timestamps: true })
export class Cart extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true, unique: true })
  user: Types.ObjectId | User;

  //TODO: Ver por que no funciona el min 0 en quantity
  @Prop({
    type: [
      {
        product: { type: String || Types.ObjectId, ref: Product.name },
        quantity: { type: Number, default: 1, min: 1, positive: true },
      },
    ],
    _id: false,
  })
  products: Types.Array<Record<string, any>>;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
