import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
//GraphQL용 refreshToken을 인가하는 Guard가 필요해서 만듦

export class JwtRefreshStrategy extends PassportStrategy(Strategy, "refresh") {
  constructor() {
    super({
      //부모생성자 => 토큰 검증 수행 로직
      jwtFromRequest: (req) => {
        console.log(req);
        const cookie = req.headers.cookie; // refreshToken = djlskjgl
        const refreshToken = cookie.replace("refreshToken=", "");
        return refreshToken;
      },
      secretOrKey: process.env.JWT_REFRESH_KEY,
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
