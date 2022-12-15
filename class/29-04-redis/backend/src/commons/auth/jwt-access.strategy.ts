import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      //   jwtFromRequest: (req) => {
      //     console.log(req);
      //     const temp = req.headers.Authorization; // Bearer sdaklfjqlkwjfkljas
      //     const accessToken = temp.toLowercase().replace('bearer ', '');
      //     return accessToken;
      //   },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_KEY,
    });
  }

  validate(payload) {
    // 로그아웃 검증 필요
    // 지금 통과한 그 토큰이 혹시 로그아웃된거 아니야????
    // 로그아웃 했으면 에러 던짐
    // 남은 만료시간만 저장
    //
    console.log(payload); // { email: q@q.com, sub: askljdfklj-128930djk }
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
