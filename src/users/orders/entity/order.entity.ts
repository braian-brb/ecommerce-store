import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Product } from '../../../products/products/entity/product.entity';
import { Customer } from '../../customers/entity/customer.entity';

@Schema()
export class Order extends Document {
  @Prop({ type: Date })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
  customer: Customer | Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
  products: Types.Array<Product>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
