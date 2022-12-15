//const express = require('express') //옛날 방식 => commonjs , 모두 다 가져오기
import express from "express"; //요즘 방식 => module , 필요한 것만 가져오기
import {
  checkEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js"; // {} 의미는 '골라서 가져온다'

//const express = require('express');
//import express from "express";
// const app = express();
//const swaggerUi = require('swagger-ui-express');
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
// app.get("/qqq",(res,req, next) => {첫번째 함수...next()}, () =>{두번째함수}) //미들웨어함수,next 다음으로 넘겨줘라
import { options } from "./swagger/config.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); //예전에는 bodyParser 사용
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options))); //app.use 는 모두 적용하라
app.get("/boards", (req, res) => {
  // 1. 데이터베이스에 접속 후 데이터를 조회 => 데이터 조회했다고 가정
  const result = [
    { Number: 1, writer: "철수", title: "제목", contents: "내용" },
    { Number: 2, writer: "영희", title: "영희제목", contents: "영희에요" },
    { Number: 3, writer: "훈이", title: "훈이제목", contents: "훈이야" },
  ];
  // 2. DB에서 꺼내온 결과를 브라우저에 응답(res) 주기

  res.send("Hello World!");
});

app.post("/boards", (req, res) => {
  //등록하기
  //1. 브라우저에서 보내준 데이터 확인하기
  console.log(req);
  console.log(req.body);

  //2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정
  //3. DB에 저장된 결과를 브라우저에 응답(res) 주기
  res.send("게시물 등록에 성공했습니다.");
});

app.post("/tokens/phone", (req, res) => {
  //엔드포인트 : /tokens/phone
  const myphone = req.body.qqq;

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

//회원가입 api
app.post("/users", (req, res) => {
  // const name = req.body.name
  // const age = req.body.age
  // const school = req.body.school
  // const email = req.body.email

  const { name, age, school, email } = req.body;
  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkEmail(email); // 커맨드 + 함수이름 클릭하면 해당 함수 확인할 수 있음
  // 컨트롤 마이너스 되돌아가기 ( 나가기)
  // 컨트롤 쉬프트 마이너스
  if (isValid === false) return;

  // 2. 가입환영 템플릿 만들기
  const myTemplate = getWelcomeTemplate({ name, age, school });

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, myTemplate);
  res.send("전송완료");
});

app.listen(3000, () => {
  //   //24시간 대기
  console.log("백엔드 API 서버가 켜졌어요.");
});
