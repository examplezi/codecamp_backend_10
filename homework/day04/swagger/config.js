export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "나만의 회원 및 커피 리스트 조회 명세서!!",
      version: "1.0.0",
    },
  },
  apis: ["./swagger/*.swagger.js"], // files containing annotations as above
};
