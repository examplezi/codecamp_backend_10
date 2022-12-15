import { Express } from "express";
// 11-06 파일이어야함
// const express = require('express') // 옛날방식 => commonjs
import express from "express"; // 요즘방식 => module
import { ProductController } from "../11-06-express-with-OOP-mvc/mvc/controllers/product.controller.js";

const app = express();

// 함수를 실행하려면 괄호 붙이기

// 상품 api
//상품 구매하기 api
const productController = new ProductController();
app.post("/products/buy", productController.buyProduct); // 괄호 불필요

//상품 환불하기 api
app.post("/products/refund", productController.refundProduct);

//쿠폰(상품권) api

app.post("/coupons/buy");
app.listen(3000, () => {
  console.log("백엔드 API 서버가 켜졌어요!!!");
});
