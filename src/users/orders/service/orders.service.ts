import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entity/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';
import { UserService } from 'src/users/users/service/users.service';
import { ProductService } from 'src/products/products/service/products.service';

@Injectable()
export class OrderService {
  constructor(
    private usersService: UserService,
    private productsService: ProductService,
  ) {}

  private counterId = 1;
  private orders: Order[] = [
    {
      id: this.counterId,
      date: new Date(),
      user: {
        email: 'algo@admin.com',
        password: 'password',
        id: this.counterId,
        role: 'admin',
      },
      products: [
        {
          id: 1,
          name: 'Adidas T-Shirt',
          description: 'Adidas T-Shirt ',
          price: 323,
          image: 'adidas.com',
          stock: 323,
        },
      ],
    },
  ];

  getOrderByUser(id: number): Order {
    const user = this.usersService.findOne(id);
    return {
      id: this.counterId,
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    const order = this.orders.find((item) => item.id === id);
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  create(payload: CreateOrderDto) {
    this.counterId++;
    const newOrder = {
      id: this.counterId,
      ...payload,
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  update(id: number, payload: UpdateOrderDto) {
    const order = this.findOne(id);
    if (!order) {
      return null;
    }
    const index = this.orders.findIndex((item) => item.id === id);
    this.orders[index] = {
      ...order,
      ...payload,
    };
    return this.orders[index];
  }

  remove(id: number) {
    const index = this.orders.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    this.orders.splice(index, 1);
    return true;
  }
}
