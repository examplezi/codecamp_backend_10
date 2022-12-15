import express from "express";
import cors from "cors";
import {
  checkEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js"; // {} 의미는 '골라서 가져온다'
import mongoose from "mongoose";

const app = express();
app.use(express.json()); //req.body를 사용하기 위한 표현법
app.use(cors());

app.get("/users", (req, res) => {
  const results = [
    {
      email: "aaa@aaa.com",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "nick@nick.com",
      name: "Nick",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
    {
      email: "judy@judy.com",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
    {
      email: "anna@anna.com",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
    {
      email: "elsa@elsa.com",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
  ];
  res.send(results);
});

app.get("/starbucks", (req, res) => {
  const results = [
    { name: "아메리카노", kcal: 5 },
    { name: "카페라떼", kcal: 10 },
    { name: "콜드브루", kcal: 15 },
    { name: "카페모카", kcal: 50 },
    { name: "돌체라떼", kcal: 500 },
    { name: "카라멜라떼", kcal: 200 },
    { name: "바닐라라떼", kcal: 20 },
    { name: "에스프레서", kcal: 1 },
    { name: "디카페인", kcal: 5 },
    { name: "오트라떼", kcal: 300 },
  ];

  res.send(results);
});

// 휴대폰 인증 토큰 api
app.post("/tokens/phone", (req, res) => {
  //엔드포인트 : /tokens/phone
  const myphone = req.body.myphone;
  console.log(myphone);
  // 1. 휴대폰번호 자릿수 맞는지 확인하기 (10-11자리)
  const isValid = checkPhone(myphone); //불린값으로 받아온 것 is-
  if (isValid === false) {
    // 드래그 후 command shift L => 한번에 변수 바꿀 수 있음
    return; //함수 종료
  }
  // 2. 핸드폰 토큰 6자리 만들기
  const myToken = getToken();
  // 3. 핸드폰번호에 토큰 전송하기
  sendTokenToSMS(myphone, myToken);
  res.send("인증완료");
});

//회원가입 api / 06-03에서 가져옴
app.post("/users", (req, res) => {
  // const name = req.body.name
  // const age = req.body.age
  // const school = req.body.school
  // const email = req.body.email

  const { name, resisteredNum, phoneDigits, faveWeb, password, myemail } =
    req.body;
  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkEmail(myemail); // 커맨드 + 함수이름 클릭하면 해당 함수 확인할 수 있음
  // 컨트롤 마이너스 되돌아가기 ( 나가기)
  // 컨트롤 쉬프트 마이너스
  if (isValid === false) return;

  // 2. 가입환영 템플릿 만들기
  //이름, 주민등록번호, 핸드폰 번호, 좋아하는 사이트, 비밀번호, 이메일
  const myTemplate = getWelcomeTemplate({
    name,
    resisteredNum,
    phoneDigits,
    faveWeb,
    password,
    myemail,
  });

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(myemail, myTemplate);
  res.send("전송완료");
});

// 몽고DB 접속, 네임 리졸루션
mongoose
  .connect("mongodb://my-database:27017/mydocker10")
  .then(() => {
    console.log("접속완료");
  })
  .catch(() => {
    console.log("실패");
  });

// //app.listen(4000, () => {
//   console.log("backend API initiated");
// });
