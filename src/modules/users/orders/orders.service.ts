import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from './entity/order.entity';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { UserService } from 'src/modules/users/users/users.service';
import { ProductService } from 'src/modules/products/products/products.service';
import { MailService } from 'src/modules/mail/mail.service';

@Injectable()
export class OrderService {
  constructor(
    private mailService: MailService,
    private usersService: UserService,
    private productsService: ProductService,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  async findAll() {
    return await this.orderModel
      .find({})
      .populate({
        path: 'user',
        select: 'email',
      })
      .populate({
        path: 'products',
        populate: { path: 'product', select: 'name price description' },
      })
      .exec();
  }

  async findOne(id: string) {
    const product = await await this.orderModel.findOne({ _id: id });

    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  async create(createOrderDto: CreateOrderDto) {
    const cantOrders = await this.orderModel.countDocuments({}).exec();

    const order = {
      ...createOrderDto,
      numberOrder: cantOrders + 1,
    };
    const newOrder = new this.orderModel(order);
    if (newOrder) {
      await this.mailService.newOrderCreatedEmail(newOrder);
    }
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
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    const product = order.products.find((p) => p.product == productId);
    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    const index = order.products.indexOf(product);
    order.products.splice(index, 1);
    return order.save();
  }

  async addProducts(id: string, products: string[]) {
    const order = await this.orderModel.findByIdAndUpdate(id, {
      $addToSet: { products },
    });
    return order.save();
  }

  ordersByUser(user: string) {
    return this.orderModel.find({
      where: {
        user,
      },
    });
  }
}
