import {
  ManyToMany,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Product } from 'src/apis/products/entities/product.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Color {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => Product, (products) => products.colors)
  @Field(() => Product)
  products: Product[];
}
