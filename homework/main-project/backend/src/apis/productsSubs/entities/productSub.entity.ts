//import { Product } from 'src/apis/products/entities/product.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ProductSub {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productcategory: ProductCategory;
}
