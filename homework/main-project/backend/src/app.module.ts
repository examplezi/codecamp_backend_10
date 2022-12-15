import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { CacheModule, Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardsModule } from "./apis/boards/boards.module";
import { Board } from "./apis/boards/entities/board.entity";
import { ConfigModule } from "@nestjs/config";
import { ProductsModule } from "./apis/products/products.module";
import { UsersModule } from "./apis/users/users.module";
import { AuthModule } from "./apis/auth/auth.module";
import { JwtRefreshStrategy } from "./commons/auth/jwt-refresh.strategy";
import { JwtAccessStrategy } from "./commons/auth/jwt-access.strategy";
import { JwtGoogleStrategy } from "./apis/auth/jwt-social-google.strategy";
import { JwtKakaoStrategy } from "./apis/auth/jwt-social-kakao.strategy";
import { JwtNaverStrategy } from "./apis/auth/jwt-social-naver.strategy";
import { PaymentModule } from "./apis/payment/payment.module";
import { FilesModule } from "./apis/files/files.module";
import { RedisClientOptions } from "redis";
import * as redisStore from "cache-manager-redis-store";

@Module({
  imports: [
    AuthModule,
    BoardsModule,
    FilesModule,
    //ProductsModule,
    UsersModule,
    PaymentModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "src/commons/graphql/schema.gql",
      context: ({ req, res }) => ({ req, res }),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as "mysql",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + "/apis/**/*.entity.*"],
      synchronize: true,
      logging: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: "redis://my-redis:6379",
      isGlobal: true,
    }),
  ],
  providers: [
    JwtRefreshStrategy,
    JwtAccessStrategy,
    JwtGoogleStrategy,
    JwtKakaoStrategy,
    JwtNaverStrategy,
  ],
})
export class AppModule {}
