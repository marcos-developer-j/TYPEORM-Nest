import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItems } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Product) private productRepo:Repository<Product>,
    @InjectRepository(Order) private orderRepo:Repository<Order>,
    @InjectRepository(OrderItems) private orderItemRepo: Repository<OrderItems>
  ){}
  findAll(){
    return this.orderItemRepo.find({
      relations: ['order', 'order.customer']
    });
  }

  findOne(id: number){
    return this.orderItemRepo.findOne({
      relations: ['order', 'product'],
      where:{id}
    });
  }

async update(id: number, changes: UpdateOrderItemDto){
  const orderItem = await this.orderItemRepo.findOneBy({id:id});
  if (changes.orderId) {
    const order = await this.orderRepo.findOne({where:{id:changes.orderId}});
    orderItem.order = order;
  }
  if (changes.productId) {
    const product = await this.productRepo.findOne({where:{id:changes.productId}});
    orderItem.product = product;
  }
  if(changes.quantity){
    orderItem.quantity = changes.quantity;
  }
  return this.orderItemRepo.save(orderItem);
}

delete(id: number){
  return this.orderItemRepo.delete(id);
}

  async create(data: CreateOrderItemDto){
    const order = await this.orderRepo.findOne({where:{id:data.orderId}});
    const product = await this.productRepo.findOne({where:{id:data.productId}});
    const newOrderItem = new OrderItems();
    newOrderItem.order = order;
    newOrderItem.product = product;
    newOrderItem.quantity = data.quantity;
    return this.orderItemRepo.save(newOrderItem)
  }
}