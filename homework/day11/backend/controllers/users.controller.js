import {
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./services/email.service.js";
import {
  result,
  checkLastDigits,
  createBoardAPI,
} from "./services/og.service.js";
import { Token } from "../models/token.model.js";

// 서비스가 실제 작동하는 함수 파일

export class UsersController {
  postUsers = async (req, res) => {
    const { name, email, personal, prefer, pwd, phone } = req.body;

    //   // 입력 받은 핸드폰 번호로 Tokens 문서를 검색해 해당 번호의 isAuth가 true인지 확인
    const result = await Token.findOne({ phone: phone });
    if (!result) {
      //     //await token.save();
      console.log("에러 !! 휴대폰 번호가 인증되지 않았습니다.");
      return;
    }

    const aaa = new User({
      name,
      email,
      personal,
      prefer,
      pwd,
      phone,
      og: {
        title: og[0],
        description: og[3],
        image: og[2],
      },
    });
    console.log(aaa);
    await aaa.save();
    // 3. 이메일에 가입환영 템플릿 전송하기
    sendTemplateToEmail(email, myTemplate);
    res.send("전송완료");
  };
}
