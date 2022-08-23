import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from './product.entity';
@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({type:'varchar', length:100,unique:true})
  name: string;
  @Column({type:'varchar',length:225})
  image: string;
  /* Sirve para ver la fecha en que se añade o actualiza una columna */
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
  @OneToMany(()=>Product,(product)=>product.brand)
  products: Product[]
}
