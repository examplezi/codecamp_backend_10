import { Injectable } from '@nestjs/common';
//import { Context } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
//import { User } from '../users/entities/user.entity';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceSetRefreshToken,
} from './interfaces/auth-service.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: '2w' },
    );

    //개발환경
    // @ts-ignore
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
    // 배포환경
    // res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`)
    // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '10s' },
    ); // 중요한 정보 저장 x
  }
}
