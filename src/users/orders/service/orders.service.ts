import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entity/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';
import { UserService } from 'src/users/users/service/users.service';
import { ProductService } from 'src/products/products/service/products.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    private usersService: UserService,
    private productsService: ProductService,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  findAll() {
    return this.orderModel
      .find()
      .populate('customer')
      .populate('products')
      .exec();
  }

  async findOne(id: string) {
    const product = await await this.orderModel.findOne({ _id: id });

    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  create(data: CreateOrderDto) {
    const newOrder = new this.orderModel(data);
    return newOrder.save();
  }

  update(id: string, changes: UpdateOrderDto) {
    const order = this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!order) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return order;
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }

  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id);
    order.products.pull(productId);
    return order.save();
  }

  async addProducts(id: string, productsIds: string[]) {
    const order = await this.orderModel.findByIdAndUpdate(id, {
      $addToSet: { products: productsIds },
    });
    // productsIds.forEach((productId) => order.products.push(productId));
    return order.save();
  }

  // async getOrderByUser(id: number) {
  //   const user = this.usersService.findOne(id);
  //   return {
  //     id: this.counterId,
  //     date: new Date(),
  //     user,
  //     products: await this.productsService.findAll(),
  //   };
  // }
}
