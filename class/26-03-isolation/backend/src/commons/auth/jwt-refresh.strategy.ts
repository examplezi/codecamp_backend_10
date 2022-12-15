import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      //부모생성자 => 토큰 검증 수행 로직
      jwtFromRequest: (req) => {
        console.log(req);
        const cookie = req.headers.cookie; // refreshToken = dfjdkflg
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },

      secretOrKey: process.env.JWT_ACCESS_KEY,
    });
  }

  validate(payload) {
    console.log(payload); // {email : , sub : }
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
