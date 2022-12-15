//const express = require('express') //옛날 방식 => commonjs , 모두 다 가져오기
import express from "express"; //요즘 방식 => module , 필요한 것만 가져오기

const app = express();

app.get("/qqq", (req, res) => {
  // /qqq 는 엔드포인트로 끝날 때 하기 함수 실행
  res.send("Hello World!");
});

app.listen(3000, () => {
  //24시간 대기
  console.log("백엔드 API 서버가 켜졌어요.");
});
