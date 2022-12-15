// 1. get api 만들기
// 2. 엔드포인트 /users
// 3. postman에 api 요청할 때 5 회원정보 받아오기 (복붙)
// 4. 키 값 : email, name, phone, personal(주민등록번호 앞자리), prefer(내가 좋아하는 사이트)
// 5. 만든 API를 Postman으로 요청해 보고, 요청과 응답이 모두 보이게 캡쳐

import express from "express";

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.get("/users", (req, res) => {
  // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  const result = [
    {
      email: "aaa@naver.com",
      name: "철수",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "bbb@naver.com",
      name: "동희",
      phone: "010-4556-7664",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "ccc@naver.com",
      name: "영이",
      phone: "010-4229-8686",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "ddd@naver.com",
      name: "예지",
      phone: "010-8845-9395",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "eee@naver.com",
      name: "민수",
      phone: "010-3495-3994",
      personal: "220110-0000000",
      prefer: "https://naver.com",
    },
  ];

  // 2. 꺼내온 결과 응답 주기
  res.send(result);
});

app.get("/starbucks", (req, res) => {
  // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  const result = [
    {
      name: "아메리카노",
      kcal: 20,
    },
    {
      name: "카페라떼",
      kcal: 140,
    },
    {
      name: "돌체라떼",
      kcal: 180,
    },
    {
      name: "바닐라라떼",
      kcal: 260,
    },
    {
      name: "바닐라 프라푸치노",
      kcal: 360,
    },
    {
      name: "자바칩 푸라푸치노",
      kcal: 400,
    },
    {
      name: "자몽허니블랙티",
      kcal: 140,
    },
    {
      name: "그린티라떼",
      kcal: 280,
    },
    {
      name: "펌킨스파이시라떼",
      kcal: 160,
    },
    {
      name: "에스프레소",
      kcal: 5,
    },
  ];

  // 2. 꺼내온 결과 응답 주기
  res.send(result);
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
