import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,

} from 'typeorm';
import { Customer } from './customer.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 225 })
  email: string;
  @Column({ type: 'varchar', length: 225 })
  password: string;
  @Column({ type: 'varchar', length: 100 })
  role: string;
  /* Sirve para ver la fecha en que se añade o actualiza una columna */
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
  @OneToOne(()=> Customer, (customer)=>customer.user,{nullable:true})
  @JoinColumn()
  customer: Customer;
}
