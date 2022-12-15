import { CACHE_MANAGER, Inject, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Cache } from "cache-manager";

export class JwtAccessStrategy extends PassportStrategy(Strategy, "access") {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {
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
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    console.log(payload); // {email : , sub : }

    const mycache = await this.cacheManager.get(
      req.headers.authorization.replace("Bearer ", "")
    );
    //console.log(req.access);
    if (mycache) {
      throw new UnauthorizedException("바보");
    }

    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
