import { Express } from "express";
// 11-06 파일이어야함
// const express = require('express') // 옛날방식 => commonjs
import express from "express"; // 요즘방식 => module
import { ProductController } from "../11-06-express-with-OOP-mvc/mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";
import { PointService } from "./mvc/controllers/services/point.service.js";
import { ProductService } from "./mvc/controllers/services/product.service.js";

const app = express();

const productService = new ProductService();
const cashService = new CashService(); // 1. new 선언으로 재사용 가능 => 메모리 효율 업 (싱글톤 패턴)
//cashService.checkValue()
const pointService = new PointService(); // 2. 쿠폰 구매 방식이 포인트 결제로 변경됨(의존성주입)

// 함수를 실행하려면 괄호 붙이기

// 상품 api
//상품 구매하기 api
const productController = new ProductController(cashService, productService);
app.post("/products/buy", productController.buyProduct); // 상품 구매하기 api

//상품 환불하기 api
app.post("/products/refund", productController.refundProduct); // 상품 환불하기 api

//쿠폰 api
const couponController = new CouponController(cashService); // 넣는 인자에 따라 시행되는 것이 다름
app.post("coupons/buy", couponController.buyCoupon); //쿠폰 구매하기 api

//게시판 api
//app.get('/boards')

app.listen(3000, () => {
  console.log("백엔드 API 서버가 켜졌어요!!!");
});

//
// 1. ProductController가 CashService 에 의존하고 있음 (CashService => 의존성)
// => 이 상황을 "강하게 결합" => tight-coupling

// 2. 개선 방법 : "느슨한 결합"으로 변경 => loose- coupling
// => 이러한 변경을 위해서 밖에서 "의존성 주입" 해줌 =>Dependency- Injection (DI) // 밖이라는게 다른 파일에서 new ???
// => 이 역할을 대신 해주는 Nestjs 도구 => IoC 컨테이너 (DI 해주는 애) (관리를 바꾸다) => Inversion- Of-Control

// 3. "의존성주입"으로 new를 2번 이상 할 필요가 없어짐. 또한, 하나의 의존성을 여러곳에서 재사용 => 싱글톤 패턴
// => 대상 class의 소스코드를 직접 수정하지 않고 변경 가능(cashSerive => pointService 바꿔치기) => 핵삼

// 4. "의존성주입"이면, "싱글톤패턴" 인가? => 틀린 말 / 의존성 주입이어도 싱글톤이 아닐 수 있음
// i.e ) 변수 const aaa 1 / const aaa 2 로 선언하면 new 가 2개 (의존성 주입은 맞음)
