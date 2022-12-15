import { ProductCategory } from "src/apis/productsCategories/entities/productCategory.entity";
import { Seller } from "src/apis/sellers/entities/seller.entity";
import { User } from "src/apis/users/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Origin } from "src/apis/origins/entities/origin.entity";
import { Order } from "src/apis/orders/entities/order.entity";
import { ProductSub } from "src/apis/productsSubs/entities/productSub.entity";
import { Color } from "src/apis/colors/entities/color.entity";
import { Int, Field, ObjectType } from "@nestjs/graphql";
import { Image } from "src/apis/images/entities/image.entity";

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => String)
  material: string;

  @Column()
  @Field(() => Int)
  delivery_fee: number;

  ///////

  @OneToMany(() => Image, (image) => image.product)
  @Field(() => [Image]) //graphql 방식
  image: Image[];

  @ManyToOne(() => Origin)
  @Field(() => Origin)
  origin: Origin;

  @ManyToOne(() => Seller)
  @Field(() => Seller)
  seller: Seller;

  @ManyToOne(() => ProductSub)
  @Field(() => ProductSub)
  productsub: ProductSub;

  @JoinColumn() //FK키로 가져와서 참조할 때, 한쪽 테이블에만 적어주기 / 1대 1
  @OneToOne(() => Order)
  @Field(() => Order)
  order: Order;

  @JoinTable()
  @ManyToMany(() => Color, (colors) => colors.products)
  @Field(() => [Color])
  colors: Color[];
}
