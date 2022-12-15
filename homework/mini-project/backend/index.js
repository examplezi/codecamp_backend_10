import express from "express";
import cors from "cors";
import {
  checkEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import mongoose from "mongoose";
import { Token } from "./models/token.model.js";
import axios from "axios";
import cheerio from "cheerio";
import { User } from "./models/user.model.js";
import { options } from "./swagger/config.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

//1. 회원가입 api
app.post("/users", async (req, res) => {
  const { name, email, personal, prefer, pwd, phone } = req.body;
  console.log(req.body);
  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkEmail(email);

  if (isValid === false) return;

  // 2. 가입환영 템플릿 만들기
  const myTemplate = getWelcomeTemplate({
    name,
    email,
    personal,
    prefer,
    pwd,
    phone,
  });

  // 입력 받은 핸드폰 번호로 Tokens 문서를 검색해 해당 번호의 isAuth가 true인지 확인
  const result = await Token.findOne({ phone: phone });
  if (!result || !result.isAuth) {
    //await token.save();
    console.log("에러 !! 휴대폰 번호가 인증되지 않았습니다.");
    return;
  }

  // 스크래핑
  async function createBoardAPI(prefer) {
    // 2. 만약 있다면, 찾은 주소로 axios.get 요청해서 ;html코드 받아오기 => 스크래핑
    const result = await axios.get(prefer);
    let og;
    let arr = [];
    // 3. 스크래핑 결과에서 OG(오픈그래프) 코드 골라내서 변수에 저장하기
    const $ = cheerio.load(result.data);
    $("meta").each((i, el) => {
      if ($(el).attr("property") && $(el).attr("property").includes("og:")) {
        const value = $(el).attr("content");
        arr.push(value);
        og = Object.assign({}, arr);
      }
    });
    return og;
  }

  const og = await createBoardAPI(prefer);
  console.log(og);

  function checkLastDigits(personal) {
    //뒷자리 별만들어주기

    const stars = personal.substring(0, 8);

    return stars + "******";
  }

  const aestrick = checkLastDigits(personal);

  const aaa = new User({
    name,
    email,
    personal: aestrick,
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
  const getID = await User.findOne({ phone });
  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, myTemplate);
  res.send(getID._id);
  // 1. db에서 아이디값 꺼내오기
});

// 2. 회원 목록 조회 api
app.get("/users", async (req, res) => {
  //og 객체(오픈그래프 정보 title, description, image)가 포함
  const results = await User.find();
  // const results = [
  //   {
  //     name: "아라111",
  //     email: "ala@gamil.com",
  //     personal: "220101-1111111",
  //     prefer: "https://naver.com",
  //     pwd: "1234",
  //     phone: "01012345678",
  //   },
  // ];

  res.send(results);
});

//3. 휴대폰 인증 토큰 api
app.post("/tokens/phone", async (req, res) => {
  const phone = req.body.phone;
  console.log(req.body);
  // 1. 휴대폰번호 자릿수 맞는지 확인하기 (10-11자리)
  const isValid = checkPhone(phone);
  if (isValid === false) {
    return;
  }

  // 2. 핸드폰 토큰 6자리 만들기
  const myToken = getToken();

  const token = new Token({
    //새롭게 생성
    token: myToken,
    phone: phone,
    isAuth: false,
  });

  const result = await Token.findOne({ phone: phone });
  const update = await Token.updateOne({ phone: phone }, { isAuth: false });
  if (result) {
    // isAuth : false;
    update;
  } else {
    console.log("전체를 저장합니다.");
    await token.save();
  }
  res.send("핸드폰으로 인증 문자가 전송되었습니다!");

  // await token.save(); //3. DB에 저장된 결과를 브라우저에 응답(res) 주기 //저장
  // res.send(myToken + "인증번호 전송에 성공하였습니다.");

  // 3. 핸드폰번호에 토큰 전송하기
  // sendTokenToSMS(myphone, myToken);
});

// 4. 인증 완료 API
app.patch("/tokens/phone", async (req, res) => {
  const result = await Token.findOne({ phone: req.body.phone });

  if (!result) {
    res.send(false);
  } else {
    if (result.token === req.body.token) {
      await Token.updateOne({ phone: req.body.phone }, { isAuth: true });
      res.send(true);
    } else {
      res.send(false);
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
