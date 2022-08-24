import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/module/product.module';
import { ProductController } from './modules/product/controller/product.controller';
import { ProductService } from './modules/product/service/product.service';
import { CategoriesModule } from './modules/categories/module/categories.module';
import { CategoriesController } from './modules/categories/controller/categories.controller';
import { CategoriesService } from './modules/categories/service/categories.service';
import { OrderModule } from './modules/order/module/order.module';
import { OrderController } from './modules/order/controller/order.controller';
import { OrderService } from './modules/order/service/order.service';
import { UserModule } from './modules/user/module/user.module';
import { UserController } from './modules/user/controller/user.controller';
import { UserService } from './modules/user/service/user.service';
import { CustomerModule } from './modules/customer/module/customer.module';
import { CustomerController } from './modules/customer/controller/customer.controller';
import { CustomerService } from './modules/customer/service/customer.service';
import { BrandModule } from './modules/brand/module/brand.module';
import { BrandController } from './modules/brand/controller/brand.controller';
import { BrandService } from './modules/brand/service/brand.service';

@Module({
  imports: [
    ProductModule,
    CategoriesModule,
    OrderModule,
    UserModule,
    CustomerModule,
    BrandModule,
  ],
  controllers: [
    AppController,
    ProductController,
    CategoriesController,
    OrderController,
    UserController,
    CustomerController,
    BrandController,
  ],
  providers: [
    AppService,
    ProductService,
    CategoriesService,
    OrderService,
    UserService,
    CustomerService,
    BrandService,
  ],
})
export class AppModule {}
