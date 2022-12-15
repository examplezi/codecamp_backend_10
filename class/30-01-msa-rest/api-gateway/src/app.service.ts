import { Injectable, Scope } from '@nestjs/common';

@Injectable() //injection scope
export class AppService {
  aaa(num1: number, num2: number, num3: string): string {
    return 'Hello World!';
  }
}
