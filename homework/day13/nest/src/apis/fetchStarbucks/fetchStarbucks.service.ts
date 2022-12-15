import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchStarbucksService {
  aaa() {
    return [
      {
        menu: '아메리카노',
        price: 4500,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
      {
        menu: '카페라떼',
        price: 5000,
        kcal: 110,
        saturated_fat: 4,
        protein: 6,
        salt: 70,
        sugar: 8,
        caffeine: 75,
      },
      {
        menu: '돌체라떼',
        price: 4500,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
      {
        menu: '카라멜마끼야또',
        price: 4500,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
      {
        menu: '바닐라프라푸치노',
        price: 4500,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
    ];
  }
}
