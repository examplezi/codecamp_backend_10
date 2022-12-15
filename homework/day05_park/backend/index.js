import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/users", (req, res) => {
  const results = [
    {
      email: "aaa@aaa.com",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "nick@nick.com",
      name: "Nick",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
    {
      email: "judy@judy.com",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
    {
      email: "anna@anna.com",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
    {
      email: "elsa@elsa.com",
      phone: "010-1234-5678",
      personal: "220219-0000000",
      prefer: "https://naver.com",
    },
  ];
  res.send(results);
});

app.get("/starbucks", (req, res) => {
  const results = [
    { name: "아메리카노", kcal: 5 },
    { name: "카페라떼", kcal: 10 },
    { name: "콜드브루", kcal: 15 },
    { name: "카페모카", kcal: 50 },
    { name: "돌체라떼", kcal: 500 },
    { name: "카라멜라떼", kcal: 200 },
    { name: "바닐라라떼", kcal: 20 },
    { name: "에스프레서", kcal: 1 },
    { name: "디카페인", kcal: 5 },
    { name: "오트라떼", kcal: 300 },
  ];

  res.send(results);
});

app.listen(3000, () => {
  console.log("backend API initiated");
});
