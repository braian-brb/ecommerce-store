import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cart } from '../entity/cart.entity';
import { CreateCartDto, UpdateCartDto, addProductDto } from '../dto/cart.dto';
import { UserService } from '../../users/service/users.service';
import { ProductService } from '../../../products/products/service/products.service';

@Injectable()
export class CartsService {
  constructor(
    private usersService: UserService,
    private productsService: ProductService,
    @InjectModel(Cart.name) private cartsModel: Model<Cart>,
  ) {}

  async findAll() {
    return await this.cartsModel
      .find({})
      .populate({
        path: 'products',
        populate: { path: 'product' },
      })
      .populate('user', { address: 1, email: 1 })
      .exec();
  }

  findOne(id: string) {
    return this.cartsModel
      .findOne({ _id: id })
      .populate({
        path: 'products',
        populate: { path: 'product' },
      })
      .populate('user', { address: 1, email: 1 })
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
      .populate({
        path: 'products',
        populate: { path: 'product' },
      })
      .populate('user', { address: 1, email: 1 })
      .exec();
    if (!cart) {
      throw new NotFoundException(`Cart #${id} not found`);
    }
    return cart;
  }

  remove(id: string) {
    return this.cartsModel.findByIdAndRemove(id).exec();
  }

  async addProduct(id: string, productId: string, quantity = 1) {
    const existProduct = await this.#checkIfProductExistsInCart(id, productId);
    console.log(existProduct);
    if (!existProduct) {
      return this.cartsModel
        .findByIdAndUpdate(
          id,
          {
            $push: { products: { product: productId, quantity } },
          },
          { new: true },
        )
        .exec();
    }
    return this.cartsModel.findOneAndUpdate(
      { _id: id, 'products.product': productId },
      { $inc: { 'products.$.quantity': quantity } },
      { new: true },
    );
  }

  async #checkIfProductExistsInCart(cartId: string, productId: string) {
    const cart = await this.cartsModel.findById(cartId).exec();
    if (!cart) {
      throw new NotFoundException(`Cart #${cartId} not found`);
    }
    const productFound = cart.products.find(
      (product) => product.product === productId,
    );
    return productFound ? true : false;
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
