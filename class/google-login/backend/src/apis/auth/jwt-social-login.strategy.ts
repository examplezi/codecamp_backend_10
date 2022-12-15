import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      //인가를 우리가 할 수 있는것이 아니라 소셜로그인을 제공해주는 구글에서 인가를 진행하므로 복호화키를 우리가 알 수 없음
      clientID: process.env.JWT_CLIENT_ID,
      clientSecret: process.env.JWT_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'], // profile에서 받을 것,구글로부터 데이터를 받아올 유저 정보
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    return {
      // 프로필 내 필요한 정보들(회원가입 시 필요한 정보들)
      name: profile.displayName,
      email: profile.emails[0].value,
      hashedPassword: '1234',
      age: 0,
    };
  }
}
