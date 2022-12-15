import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  token: String,
  phone: String,
  isAuth: Boolean,
}); //스키마는 구조

export const Token = mongoose.model("Token", tokenSchema); //collection으로 몽고db에 저장되는 폴더로 해당 스키마로 저장됨
