import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./commons/filter/http-exception.filter";
import { graphqlUploadExpress } from "graphql-upload";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(graphqlUploadExpress()); //16버전에 문제 있음 => 13.0.0 으로 변경 완료
  await app.listen(3000);
}
bootstrap();
