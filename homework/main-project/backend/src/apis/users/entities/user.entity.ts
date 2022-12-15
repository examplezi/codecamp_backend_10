import { ObjectType, Field, Int } from "@nestjs/graphql";
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => Int)
  age: number;

  @Column({ default: 0 })
  @Field(() => Int)
  point: number;

  @DeleteDateColumn()
  DeletedAt: Date;
}
