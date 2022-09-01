import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { Product } from '../entity/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dto/products.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(params?: FilterProductsDto) {
    if (!params) {
      return this.productModel.find().populate('brand').exec();
    }
    const filters: FilterQuery<Product> = {};
    const { limit, offset, minPrice, maxPrice } = params;
    if (minPrice && maxPrice) {
      filters.price = { $gte: minPrice, $lte: maxPrice };
    }
    return await this.productModel
      .find(filters)
      .populate('brand')
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async findByCategory(category: string) {
    return await this.productModel.find({ category }).populate('brand').exec();
  }

  async findOne(id: string) {
    const product = await (
      await this.productModel.findOne({ _id: id })
    ).populate('brand');

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  update(id: string, changes: UpdateProductDto) {
    const product = this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
