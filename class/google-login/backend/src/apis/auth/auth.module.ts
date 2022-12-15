import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuthController } from './auth.controller';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { JwtGoogleStrategy } from './jwt-social-google.strategy';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    AuthResolver, //
    AuthService,
    JwtAccessStrategy,
    JwtGoogleStrategy,
    JwtRefreshStrategy,
    UsersService,
  ],
  controllers: [
    AuthController, //
  ],
})
export class AuthModule {}
