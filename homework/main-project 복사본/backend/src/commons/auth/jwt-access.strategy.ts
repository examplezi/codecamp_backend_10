import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      //부모생성자 => 토큰 검증 수행 로직
      //   jwtFromRequest: (req) => {
      //     console.log(req);
      //     const temp = req.headers.Authorization; //Bearer fgflkdh
      //     const accessToken = temp.toLowercase().replace('bearer ', '');
      //     return accessToken;
      //   },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
