import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Starbucks {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  number: number;

  @Column()
  @Field(() => String)
  menu: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => Int)
  kcal: number;

  @Column()
  @Field(() => Int)
  saturated_fat: number;

  @Column()
  @Field(() => Int)
  protein: number;

  @Column()
  @Field(() => Int)
  salt: number;

  @Column()
  @Field(() => Int)
  sugar: number;

  @Column()
  @Field(() => Int)
  caffeine: number;
}

// {
//     menu: '아메리카노',
//     price: 4500,
//     kcal: 5,
//     saturated_fat: 0,
//     protein: 0,
//     salt: 0,
//     sugar: 0,
//     caffeine: 75,
//   },
//   {
//     menu: '카페라떼',
//     price: 5000,
//     kcal: 110,
//     saturated_fat: 4,
//     protein: 6,
//     salt: 70,
//     sugar: 8,
//     caffeine: 75,
//   },
