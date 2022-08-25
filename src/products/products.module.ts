import { Module } from '@nestjs/common';

import { ProductModule as ProductModuleFolder } from './products/module/products.module';
import { CategoriesModule } from './categories/module/categories.module';
import { BrandsModule } from './brands/module/brands.module';

@Module({
  imports: [ProductModuleFolder, CategoriesModule, BrandsModule],
})
export class ProductModule {}
