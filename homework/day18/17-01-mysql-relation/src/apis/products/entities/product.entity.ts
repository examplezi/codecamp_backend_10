import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { Seller } from 'src/apis/sellers/entities/seller.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Origin } from 'src/apis/origins/entities/origin.entity';
import { Order } from 'src/apis/orders/entities/order.entity';
import { ProductSub } from 'src/apis/productsSubs/entities/productSub.entity';
import { Color } from 'src/apis/colors/entities/color.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  material: number;

  @Column()
  delivery_fee: number;

  ///////

  @ManyToOne(() => Origin)
  origin: Origin;

  @ManyToOne(() => Seller)
  seller: Seller;

  @ManyToOne(() => ProductSub)
  productsub: ProductSub;

  @JoinColumn() //FK키로 가져와서 참조할 때, 한쪽 테이블에만 적어주기 / 1대 1
  @OneToOne(() => Order)
  order: Order;

  @JoinTable()
  @ManyToMany(() => Color, (colors) => colors.products)
  colors: Color[];
}
