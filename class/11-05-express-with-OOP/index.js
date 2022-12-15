import express from "express";
import { CashService } from "./cash.js";
import { ProductService } from "./product.js";

const app = express();

// class : grouping similar things
// => class Cash{}, class Product{}

// 상품 구매하기 API
app.post("/products/buy", (req, res) => {
  const cashService = new CashService();
  const hasMoney = cashService.checkValue(); // assume return type is boolean

  const productService = new ProductService();
  const isSold = productService.checkSoldOut();

  if (hasMoney && !isSold) {
    res.send("상품 구매 완료");
  }
});

// 상품 환불하기 API
app.post("/products/refund", (req, res) => {
  const productService = new ProductService();
  const isSold = productService.checkSoldOut();

  if (isSold) {
    res.send("상품 환불 완료");
  }
});

app.listen(3000, () => {
  console.log(`백엔드 API 서버가 켜졌어요!!!`);
});
