import express from "express";
import cors from "cors";
import {
  checkEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js"; // {} 의미는 '골라서 가져온다'
import mongoose from "mongoose";
import { Token } from "./models/token.model.js";
import axios from "axios";
import cheerio from "cheerio";
import { User } from "./models/user.model.js";

const app = express();
app.use(express.json()); //req.body를 사용하기 위한 표현법
app.use(cors());

//1. 회원가입 api / 06-03에서 가져옴
app.post("/users", async (req, res) => {
  const { name, myemail, resisteredNum, faveWeb, password, phoneDigits } =
    req.body;
  console.log(req.body);
  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkEmail(myemail); // 커맨드 + 함수이름 클릭하면 해당 함수 확인할 수 있음
  // 컨트롤 마이너스 되돌아가기 ( 나가기)
  // 컨트롤 쉬프트 마이너스
  if (isValid === false) return;

  // 2. 가입환영 템플릿 만들기
  //이름, 주민등록번호, 핸드폰 번호, 좋아하는 사이트, 비밀번호, 이메일
  const myTemplate = getWelcomeTemplate({
    name,
    myemail,
    resisteredNum,
    faveWeb,
    password,
    phoneDigits,
  });

  // 입력 받은 핸드폰 번호로 Tokens 문서를 검색해 해당 번호의 isAuth가 true인지 확인
  const result = await Token.findOne({ phone: phoneDigits });
  if (!result) {
    //await token.save();
    console.log("에러 !! 휴대폰 번호가 인증되지 않았습니다.");
    return;
  }

  // 스크래핑
  async function createBoardAPI(faveWeb) {
    const empty = {};
    // 2. 만약 있다면, 찾은 주소로 axios.get 요청해서 ;html코드 받아오기 => 스크래핑
    const result = await axios.get(faveWeb);
    console.log(result.data);

    // 3. 스크래핑 결과에서 OG(오픈그래프) 코드 골라내서 변수에 저장하기
    const $ = cheerio.load(result.data);
    $("meta").each((i, el) => {
      if (
        $(el).attr("property").includes("og:title") ||
        $(el).attr("property").includes("og:description") ||
        $(el).attr("property").includes("og:image")
      ) {
        const key = $(el).attr("property"); //og: title, og:description,
        const value = $(el).attr("content"); // 네이버, 네이버 메인에서 ~~~
        empty[key] = value;
      }
    }); //로드한 결과에서 meta로 시작하는 데이터만 뽑기 , forEach 사용 ?
    return empty;
  }
  const og = createBoardAPI(faveWeb);

  function checkLastDigits(resisteredNum) {
    //함수이름 바꾸기, 뒷자리 별만들어주기

    const stars = resisteredNum.substring(0, 8);

    return stars + "******";
  }
  const aaa = new User(
    name,
    myemail,
    resisteredNum,
    faveWeb,
    password,
    phoneDigits,
    og
  );
  await aaa.save();
  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(myemail, myTemplate);
  res.send("전송완료");
});

// 2. 회원 목록 조회 api
app.get("/users", (req, res) => {
  //og 객체(오픈그래프 정보 title, description, image)가 포함
  const results = [
    {
      name: "아라111",
      email: "ala@gamil.com",
      personal: "220101-1111111",
      prefer: "https://naver.com",
      pwd: "1234",
      phone: "01012345678",
    },
  ];
  res.send(results);
});

//3. 휴대폰 인증 토큰 api
app.post("/tokens/phone", async (req, res) => {
  const myphone = req.body.myphone;

  // 1. 휴대폰번호 자릿수 맞는지 확인하기 (10-11자리)
  const isValid = checkPhone(myphone);
  if (isValid === false) {
    return;
  }

  // 2. 핸드폰 토큰 6자리 만들기
  const myToken = getToken();

  const token = new Token({
    //새롭게 생성
    token: myToken,
    phone: myphone,
    isAuth: false,
  });

  const result = await Token.findOne({ phone: myphone });
  if (!result) {
    await token.save();
    console.log("전체를 저장합니다.");
  } else {
    await Token.updateOne({ phone: myphone }, { token: myToken });
    console.log("토큰을 저장합니다.");
  }

  await token.save(); //3. DB에 저장된 결과를 브라우저에 응답(res) 주기 //저장
  res.send(myToken + "인증번호 전송에 성공하였습니다.");

  // 3. 핸드폰번호에 토큰 전송하기
  // sendTokenToSMS(myphone, myToken);
  res.send("핸드폰으로 인증 문자가 전송되었습니다!");
});

// 4. 인증 완료 API
app.patch("/tokens/phone", async (req, res) => {
  const result = await Token.findOne({ phone: req.body.phone });

  if (!result) {
    res.send("false");
  } else {
    if (result.token === req.body.token) {
      await Token.updateOne({ phone: req.body.phone }, { isAuth: true });
      res.send("true");
    } else {
      res.send("false");
    }
  }
});

// 몽고DB 접속, 네임 리졸루션
mongoose
  .connect("mongodb://my-database:27017/mydocker10")
  .then(() => {
    console.log("접속완료");
  })
  .catch(() => {
    console.log("몽고DB 접속 실패");
  });

app.listen(4000, () => {
  console.log("backend API initiated");
});
