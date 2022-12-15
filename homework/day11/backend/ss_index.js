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
import { UsersController } from "./controllers/users.controller.js";
// import { og } from "cheerio/lib/api/manipulation.js";

const app = express();
app.use(express.json()); //req.body를 사용하기 위한 표현법
app.use(cors());

//1. 회원가입 api /
const usersController = new UsersController();
app.post("/users", usersController.postUsers);

// 2. 회원 목록 조회 api
app.get("/users", usersController.getUsers);

app.listen(3000, () => {
  console.log("백엔드 API 서버가 켜졌어요!!!");
});
