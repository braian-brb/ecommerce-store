import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cart } from './entity/cart.entity';
import {
  CreateCartDto,
  AddProductDto,
  UpdateProductInCartDto,
} from './dto/cart.dto';

@Injectable()
export class CartsService {
  constructor(@InjectModel(Cart.name) private cartsModel: Model<Cart>) {}

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

  getCartByUser(userId: string) {
    return this.cartsModel.findOne({ user: userId }).exec();
  }

  create(createCartDto: CreateCartDto) {
    try {
      const newCart = new this.cartsModel(createCartDto);
      return newCart.save();
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: string) {
    return this.cartsModel.findByIdAndRemove(id).exec();
  }

  async updateProduct(updateProductInCartDto: UpdateProductInCartDto) {
    const { cartId, productId, quantity } = updateProductInCartDto;
    const cart = await this.cartsModel.findById(cartId).exec();
    if (!cart) {
      throw new NotFoundException(`Cart #${cartId} not found`);
    }
    const productFound = await this.getProductById(cartId, productId);
    if (!productFound) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    return this.cartsModel
      .findOneAndUpdate(
        {
          _id: cartId,
          'products.product': productId,
        },
        {
          $set: { 'products.$.quantity': quantity },
        },
        { new: true },
      )
      .populate({
        path: 'products',
        populate: { path: 'product' },
      })
      .populate('user', { address: 1, email: 1 })
      .exec();
  }

  async addProduct(addProductDto: AddProductDto) {
    const { cartId, products } = addProductDto;
    const productsIdArray = Array.isArray(products) ? products : [products];

    for (const productId of productsIdArray) {
      const productExist = await this.getProductById(cartId, productId);
      console.log(productExist);
      if (productExist) {
        await this.cartsModel.findOneAndUpdate(
          { _id: cartId, 'products.product': productId },
          { $inc: { 'products.$.quantity': 1 } },
          { new: true },
        );
      } else {
        await this.cartsModel
          .findByIdAndUpdate(
            cartId,
            { $push: { products: { product: productId, quantity: 1 } } },
            { new: true },
          )
          .exec();
      }
    }
    return this.cartsModel
      .findById(cartId)
      .populate({
        path: 'products',
        populate: { path: 'product' },
      })
      .populate('user', { address: 1, email: 1 })
      .exec();
  }

  async getProductById(cartId: string, productId: string) {
    const cart = await this.cartsModel.findById(cartId).exec();
    if (!cart) {
      throw new NotFoundException(`Cart #${cartId} not found`);
    }
    const productFound = cart.products.find(
      (product) => product.product === productId,
    );
    return productFound;
  }

  async removeProduct(cartId: string, productId: string) {
    const cart = await this.cartsModel.findOneAndUpdate(
      {
        _id: cartId,
        'products.product': productId,
      },
      {
        $pull: { products: { product: productId } },
      },
      { new: true },
    );

    if (!cart) {
      throw new NotFoundException(`Cart #${cartId} not found`);
    }
    return cart;
  }

  async #removeProduct(cartId: string, productId: string) {
    const cart = await this.cartsModel.findById(cartId).exec();
    if (!cart) {
      throw new NotFoundException(`Cart #${cartId} not found`);
    }
    const product = await this.getProductById(cartId, productId);
    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    const index = cart.products.indexOf(product);
    cart.products.splice(index, 1);
    return cart.save();
  }
}
