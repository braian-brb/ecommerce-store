import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from './entity/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoriesModel: Model<Category>,
  ) {}
  findAll() {
    return this.categoriesModel.find().exec();
  }

  async findOne(id: number) {
    const category = await this.categoriesModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new this.categoriesModel(createCategoryDto);
    return category.save();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    return category;
  }

  async remove(id: string) {
    const result = await this.categoriesModel.findByIdAndRemove(id).exec();
    if (!result) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    return result;
  }
}
