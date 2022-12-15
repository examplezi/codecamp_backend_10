import { Injectable, Scope } from '@nestjs/common';

@Injectable() //injection scope
export class AppService {
  getHello(): string {
    return 'Hello World';
  }
}
