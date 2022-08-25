import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../entity/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dto/products.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  // create(payload: CreateProductDto) {
  //   console.log(payload);
  //   this.counterId++;
  //   const newProduct = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.products.push(newProduct);
  //   return newProduct;
  // }

  // update(id: number, payload: UpdateProductDto) {
  //   const product = this.findOne(Number(id));
  //   if (!product) {
  //     return null;
  //   }
  //   const index = this.products.findIndex((item) => item.id === Number(id));
  //   this.products[index] = {
  //     ...product,
  //     ...payload,
  //   };
  //   return this.products[index];
  // }

  // remove(id: number) {
  //   const index = this.products.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Product #${id} not found`);
  //   }
  //   this.products.splice(index, 1);
  //   return true;
  // }
}
