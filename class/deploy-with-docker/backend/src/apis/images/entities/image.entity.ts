import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  imageUrl: string;

  @Column()
  @Field(() => Boolean)
  isImage: boolean;

  @ManyToOne(() => Product)
  @Field(() => Product)
  product: Product;
}
