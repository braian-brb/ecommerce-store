import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Product } from '../../../products/products/entity/product.entity';
import { Customer } from '../../customers/entity/customer.entity';

@Schema({ versionKey: false, timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
  customer: Customer | Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
  products: Types.Array<Product>;

  // estado ( por defecto en ‘generada’)
  @Prop({ default: 'generated' })
  state: string;

  @Prop()
  numberOrder: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
