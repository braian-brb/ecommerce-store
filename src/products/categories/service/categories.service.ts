import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entity/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';

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

  // create(payload: CreateCategoryDto) {
  //   this.counterId++;
  //   const newCategory = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.categories.push(newCategory);
  //   return newCategory;
  // }

  // update(id: number, payload: UpdateCategoryDto) {
  //   const category = this.findOne(id);
  //   if (!category) {
  //     return null;
  //   }
  //   const index = this.categories.findIndex((item) => item.id === id);
  //   this.categories[index] = {
  //     ...category,
  //     ...payload,
  //   };
  //   return this.categories[index];
  // }

  // remove(id: number) {
  //   const index = this.categories.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Category #${id} not  found`);
  //   }
  //   this.categories.splice(index, 1);
  //   return true;
  // }
}
