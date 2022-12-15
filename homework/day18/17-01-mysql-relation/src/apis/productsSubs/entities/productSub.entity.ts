//import { Product } from 'src/apis/products/entities/product.entity';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductSub {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ProductCategory)
  productcategory : ProductCategory;


}
