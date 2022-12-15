import { HttpExceptionFilter } from './commons/filter/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.userGlobalFilters(new HttpExceptionFilter()); // try-catch 모두 붙음
  await app.listen(3000);
}

// ffff

bootstrap();
