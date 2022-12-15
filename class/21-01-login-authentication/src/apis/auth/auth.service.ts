import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthServiceGetAccessToken } from './interfaces/auth-service.interface';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: '1234', expiresIn: '1h' },
    ); // 중요한 정보 저장 x
  }
}
