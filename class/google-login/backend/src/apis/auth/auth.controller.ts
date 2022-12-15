import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: {
    name: string;
    email: string;
    hashedPassword: string;
    age: number;
  };
}

@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService, //
    private readonly authService: AuthService,
  ) {}
  @UseGuards(AuthGuard('google'))
  @Get('/login/google')
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    //프로필을 받아온 다음, 로그인 처리해야 하는 곳
    // 1. 회원조회
    let user = await this.usersService.findOne({ email: req.user.email });

    // 2. 히원가입이 안되어 있다면? 자동회원가입
    if (!user)
      user = await this.usersService.create({
        ...req.user,
        // name: req.user.email,
        // email: req.user.email,
        // hashedPassword: req.user.hashedPassword,
        // age: req.user.age,
      });

    // 3. 회원가입이 돼있다면? 로그인(refreshToken, accessToken 만들어서 브라우저에 전송)
    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/class/google-login/frontend/social-login.html',
    );
    // 로그인하고 유저가 처음 보는 페이지 연결
  }
}

// 58분 51초부터 보기
