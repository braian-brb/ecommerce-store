import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cart } from '../entity/cart.entity';
import { CreateCartDto, UpdateCartDto } from '../dto/cart.dto';
import { UserService } from '../../users/service/users.service';
import { ProductService } from '../../../products/products/service/products.service';

@Injectable()
export class CartsService {
  constructor(
    private usersService: UserService,
    private productsService: ProductService,
    @InjectModel(Cart.name) private cartsModel: Model<Cart>,
  ) {}

  findAll() {
    return this.cartsModel
      .find()
      .populate('user', { password: 0 })
      .populate({
        path: 'products',
        populate: { path: 'product' },
      })
      .exec();
  }

  findOne(id: number) {
    return this.cartsModel
      .findOne({ _id: id })
      .populate('user')
      .projection({ password: 0 })
      .populate('product')
      .exec();
  }

  create(createCartDto: CreateCartDto) {
    try {
      const newCart = new this.cartsModel(createCartDto);
      return newCart.save();
    } catch (error) {
      console.log(error);
    }
  }

  update(id: string, updateCartDto: UpdateCartDto) {
    const cart = this.cartsModel
      .findByIdAndUpdate(id, { $set: updateCartDto }, { new: true })
      .exec();
    if (!cart) {
      throw new NotFoundException(`Cart #${id} not found`);
    }
    return cart;
  }

  remove(id: string) {
    return this.cartsModel.findByIdAndRemove(id).exec();
  }

  async addProduct(cartId: string, productId: string) {
    const cart = await this.cartsModel
      .findByIdAndUpdate(cartId, {
        $push: { products: productId },
      })
      .exec();

    if (!cart) {
      throw new NotFoundException(`Cart #${cartId} not found`);
    }
    return cart.save();
  }

  async removeProduct(cartId: string, productId: string) {
    const cart = await this.cartsModel
      .findByIdAndUpdate(cartId, {
        $pull: { products: productId },
      })
      .exec();

    if (!cart) {
      throw new NotFoundException(`Cart #${cartId} not found`);
    }
    return cart.save();
  }

  getCartByUser(userId: string) {
    return this.cartsModel.findOne({ user: userId }).exec();
  }
}
