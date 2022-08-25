import { Product } from 'src/products/products/entity/product.entity';
import { User } from 'src/users/users/entity/users.entity';

export class Order {
  id: number;
  date: Date;
  user: User;
  products?: Product[];
}
