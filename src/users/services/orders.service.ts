// src\users\services\orders.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo:Repository<Order>,
    @InjectRepository(Customer) private customerRepo:Repository<Customer>
  ){}

  findAll(){
    return this.orderRepo.find();
  }

  async findOne(id: number){
    const order = await this.orderRepo.findOne({relations:['items',"items.product"],where:{id}});
    if(!order) {
      throw new NotFoundException(`order ${id} not found`);
    } 
    return order;
  }

  async create(data: CreateOrderDto){
    const order = new Order();
    if (data.customerId) {
      const customer = await this.customerRepo.findOne({where:{id:data.customerId}});
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async update(id:number, changes:UpdateOrderDto){
    const order = await this.orderRepo.findOne({where:{id}});
    if (changes.customerId) {
      const customer = await this.customerRepo.findOne({where:{id:changes.customerId}});
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  delete(id:number){
    return this.orderRepo.delete(id);
  }
}