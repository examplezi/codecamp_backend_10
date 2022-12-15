import {
  ManyToMany,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Product } from 'src/apis/products/entities/product.entity';

@Entity()
export class Color {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Product, (products) => products.colors)
  products: Product[];
}
