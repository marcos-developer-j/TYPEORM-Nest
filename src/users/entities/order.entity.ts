import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer/types/decorators';
import { Customer } from './customer.entity';
import { OrderItems } from './order-item.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  date: Date;
  /* Sirve para ver la fecha en que se añade o actualiza una columna */
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;
  @Exclude()
  @OneToMany(() => OrderItems, (item) => item.order)
  items: OrderItems[];
  @Expose()
  get products() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .map((item) => ({
          ...item.product,
          quantity: item.quantity,
        }));
    }
    return [];
  }
  @Expose()
  get total() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .reduce((total, item) => {
          const totalItem = item.product.price * item.quantity;
          return total;
        }, 0);
    }
    return 0;
  }
}
