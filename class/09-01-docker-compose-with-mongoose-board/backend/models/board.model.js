import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  writer: String,
  title: String,
  contents: String,
}); //스키마는 구조

export const Board = mongoose.model("Board", boardSchema); //collection
