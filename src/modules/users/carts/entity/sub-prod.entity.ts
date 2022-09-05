import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SubProd {
  @Prop()
  productId: string;

  @Prop()
  quantity: number;
}

export const SubProdSchema = SchemaFactory.createForClass(SubProd);
