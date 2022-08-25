import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/products/module/products.module';
import { ProductController } from './modules/products/controller/products.controller';
import { ProductService } from './modules/products/service/products.service';
import { CategoriesModule } from './modules/categories/module/categories.module';
import { CategoriesController } from './modules/categories/controller/categories.controller';
import { CategoriesService } from './modules/categories/service/categories.service';
import { OrderModule } from './modules/orders/module/orders.module';
import { OrderController } from './modules/orders/controller/orders.controller';
import { OrderService } from './modules/orders/service/orders.service';
import { UserModule } from './modules/users/module/users.module';
import { UserController } from './modules/users/controller/users.controller';
import { UserService } from './modules/users/service/users.service';
import { CustomerModule } from './modules/customers/module/customers.module';
import { CustomerController } from './modules/customers/controller/customers.controller';
import { CustomerService } from './modules/customers/service/customers.service';
import { BrandsModule } from './modules/brands/module/brands.module';
import { BrandsController } from './modules/brands/controller/brands.controller';
import { BrandsService } from './modules/brands/service/brands.service';
import { CartsModule } from './modules/carts/module/carts.module';
import { CartsController } from './modules/carts/controller/carts.controller';
import { CartsService } from './modules/carts/service/carts.service';

@Module({
  imports: [
    ProductModule,
    CategoriesModule,
    OrderModule,
    UserModule,
    CustomerModule,
    BrandsModule,
    CartsModule,
  ],
  controllers: [
    AppController,
    ProductController,
    CategoriesController,
    OrderController,
    UserController,
    CustomerController,
    BrandsController,
    CartsController,
  ],
  providers: [
    AppService,
    ProductService,
    CategoriesService,
    OrderService,
    UserService,
    CustomerService,
    BrandsService,
    CartsService,
  ],
})
export class AppModule {}
