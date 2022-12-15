import { JwtService } from '@nestjs/jwt';
import { IAuthServiceGetAccessToken } from './interfaces/auth-service.interface';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    getAccessToken({ user }: IAuthServiceGetAccessToken): string;
}
