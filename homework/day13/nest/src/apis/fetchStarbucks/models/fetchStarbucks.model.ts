import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class typeOfStarbucks {
  @Field()
  menu: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  kcal: number;

  @Field(() => Int)
  saturated_fat: number;

  @Field(() => Int)
  protein: number;

  @Field(() => Int)
  salt: number;

  @Field(() => Int)
  sugar: number;

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
