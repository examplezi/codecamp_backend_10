import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  personal: String,
  prefer: String,
  pwd: String,
  phone: String,
  og: Object,
}); //스키마는 구조

export const User = mongoose.model("User", userSchema); //collection으로 몽고db에 저장되는 폴더로 해당 스키마로 저장됨
