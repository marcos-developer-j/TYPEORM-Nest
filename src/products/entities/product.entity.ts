import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
  JoinColumn
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';
@Entity({name:'products'})
@Index(['price'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 225 })
  name: string;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'int' })
  price: number;
  @Column({ type: 'int' })
  stock: number;
  @Column({ type: 'varchar' })
  image: string;
  /* Sirve para ver la fecha en que se añade o actualiza una columna */
  @CreateDateColumn({name:'create_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @UpdateDateColumn({name:'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
  /* Entidad debil de la relacion */
  @ManyToOne(()=>Brand,(brand)=> brand.products)
  @JoinColumn({name:'brand_id'})
  brand: Brand

  @ManyToMany(()=>Category,(brand)=> brand.products)
  @JoinTable({
    name:'products_categories',
    joinColumn:{
      name:'product_id',
    },
    inverseJoinColumn:{
      name:'category_id'
    }
  })
  categories: Category[]

}
