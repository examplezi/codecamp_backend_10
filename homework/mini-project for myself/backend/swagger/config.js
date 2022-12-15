export const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "나의 10일차 Mini-Project",
      version: "1.0.0",
    },
  },
  apis: ["./swagger/*.swagger.js"],
};
// apis : swagger 폴더 안에 있는 컨텐츠를 연결해주는 역할
