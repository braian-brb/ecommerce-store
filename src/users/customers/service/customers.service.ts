import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../entity/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customer.dto';
@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  findAll() {
    return this.customerModel.find().exec();
  }

  async findOne(id: number) {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer) {
      throw new NotFoundException(`Customer#${id} not found`);
    }
    return customer;
  }

  // create(payload: CreateCustomerDto) {
  //   this.counterId++;
  //   const newCustomer = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.customers.push(newCustomer);
  //   return newCustomer;
  // }

  // update(id: number, payload: UpdateCustomerDto) {
  //   const customer = this.findOne(id);
  //   if (!customer) {
  //     return null;
  //   }
  //   const index = this.customers.findIndex((item) => item.id === id);
  //   this.customers[index] = {
  //     ...customer,
  //     ...payload,
  //   };
  //   return this.customers[index];
  // }

  // remove(id: number) {
  //   const index = this.customers.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Customer #${id} not found`);
  //   }
  //   this.customers.splice(index, 1);
  //   return true;
  // }
}
