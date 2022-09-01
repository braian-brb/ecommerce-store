import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Product } from '../../../products/products/entity/product.entity';
import { User } from '../../users/entity/users.entity';

@Schema({ versionKey: false, timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: User | Types.ObjectId;

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

  // estado ( por defecto en ‘generada’)
  @Prop({ default: 'generated' })
  state: string;

  @Prop()
  numberOrder: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
