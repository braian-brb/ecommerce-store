import { Module } from '@nestjs/common';

import { ProductModule as ProductModuleFolder } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ProductModuleFolder,
    CategoriesModule,
    BrandsModule,
    RouterModule.register([
      {
        path: 'products',
        module: ProductModuleFolder,
        children: [
          {
            path: 'categories',
            module: CategoriesModule,
          },
          {
            path: 'brands',
            module: BrandsModule,
          },
        ],
      },
    ]),
  ],
})
export class ProductModule {}
