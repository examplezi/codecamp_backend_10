import { Express } from "express";

// const express = require('express') // 옛날방식 => commonjs
import express from "express"; // 요즘방식 => module

const app = express();

//상품 구매하기 api
app.post("/products/buy", (req, res) => {
  // 1. 가진 돈이 얼마나 있는지 검증 코드 (10줄 정도)
  // 2. 중고상품의 판매 완료 여부 검증 코드 (10줄 정도)
  // 3. 상품 구매하는 코드
  // if(돈이 있음 && !판매완료){
  //     res.send("상품구매완료");
  // }
});

//상품 환불하기 api
app.post("/products/refund", (req, res) => {
  // 1. 판매 여부 검증 코드 (10줄)
  // 2. 상품 환불하는 코드
  // 3. if(판매완료){
  //     res.send("상품환불완료");
  // }
});

app.listen(3000, () => {
  console.log("백엔드 API 서버가 켜졌어요!!!");
});
