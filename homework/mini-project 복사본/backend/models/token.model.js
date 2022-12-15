import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  token: String,
  phone: String,
  isAuth: Boolean,
}); //스키마는 구조

export const Token = mongoose.model("Token", tokenSchema); //collection
