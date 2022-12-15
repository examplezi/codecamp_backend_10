import { Module } from "@nestjs/common";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { JwtAccessStrategy } from "src/commons/auth/jwt-access.strategy";
import { JwtGoogleStrategy } from "./jwt-social-google.strategy";
import { JwtRefreshStrategy } from "src/commons/auth/jwt-refresh.strategy";
import { AuthController } from "./auth.controller";
import { JwtNaverStrategy } from "./jwt-social-naver.strategy";
import { JwtKakaoStrategy } from "./jwt-social-kakao.strategy";

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    JwtAccessStrategy,
    JwtGoogleStrategy,
    JwtRefreshStrategy,
    JwtNaverStrategy,
    JwtKakaoStrategy,
    AuthResolver, //
    AuthService,
    UsersService,
  ],
  controllers: [
    AuthController, //
  ],
})
export class AuthModule {}
