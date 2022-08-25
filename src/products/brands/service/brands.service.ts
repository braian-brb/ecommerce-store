import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from '../entity/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dto/brand.dto';
@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}
  findAll() {
    return this.brandModel.find().exec();
  }

  async findOne(id: number) {
    const brand = await this.brandModel.findById(id).exec();
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  // create(payload: CreateBrandDto) {
  //   this.counterId++;
  //   const newBrand = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.brands.push(newBrand);
  //   return newBrand;
  // }

  // update(id: number, payload: UpdateBrandDto) {
  //   const brand = this.findOne(id);
  //   if (!brand) {
  //     return null;
  //   }
  //   const index = this.brands.findIndex((item) => item.id === id);
  //   this.brands[index] = {
  //     ...brand,
  //     ...payload,
  //   };
  //   return this.brands[index];
  // }

  // remove(id: number) {
  //   const index = this.brands.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Brand #${id} not found`);
  //   }
  //   this.brands.splice(index, 1);
  //   return true;
  // }
}
