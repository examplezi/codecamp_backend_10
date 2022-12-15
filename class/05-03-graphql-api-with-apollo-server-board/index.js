//const { ApolloServer, gql } = require("apollo-server");
import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  input CreateBoardInput { # 입력에 들어가는 타입은 input
    writer: String # 타입은 첫글자가 대문자
    title: String
    contents: String
  }
  type Myreturn {
    number: Int
    writer: String
    title: String
    contents: String
  }
  type Query {
    #fetchBoards: Myreturn #객체 1개를 의미
    fetchBoards: [Myreturn] #배열 안에 객체 1개 이상을 의미!
  }
  #느낌표가 있으면 필수
  type Mutation {
    # createBoard(writer: String, title: String, contents: String): String
    createBoard(createBoardInput: CreateBoardInput!): String
  }
`;

const resolvers = {
  Query: {
    fetchBoards: (parent, args, context, info) => {
      // 1. 데이터베이스에 접속 후 데이터를 조회 => 데이터 조회했다고 가정
      const result = [
        { Number: 1, writer: "철수", title: "제목", contents: "내용" },
        { Number: 2, writer: "영희", title: "영희제목", contents: "영희에요" },
        { Number: 3, writer: "훈이", title: "훈이제목", contents: "훈이야" },
      ];

      //createBoard({ age: 13 });

      // 2. DB에서 꺼내온 결과를 브라우저에 응답(res) 주기

      return result;
    },
  },

  Mutation: {
    createBoard: (_, args) => {
      //1. 브라우저에서 보내준 데이터 확인하기
      console.log(args);
      console.log("=======================");
      console.log(args.createBoardInput.writer);
      console.log(args.createBoardInput.title);
      console.log(args.createBoardInput.contents);

      //2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정
      //3. DB에 저장된 결과를 브라우저에 응답(res) 주기
      return "게시물 등록에 성공했습니다.";
    },
    // 과제) 아래 api 작동시키기 - 힌트 1.phone.js 2.res.send 3.타입 작성
    createTokenOfPhone: (_, args) => {
      app.post("/tokens/phone", (req, res) => {
        //엔드포인트 : /tokens/phone
        const myphone = req.body.qqq;

        // 1. 휴대폰번호 자릿수 맞는지 확인하기 (10-11자리)
        const isValid = checkPhone(myphone); //불린값으로 받아온 것 is-
        if (isValid === false) {
          // 드래그 후 command shift L => 한번에 변수 바꿀 수 있음
          return; //함수 종료
        }
        // 2. 핸드폰 토큰 6자리 만들기
        const myToken = getToken();
        // 3. 핸드폰번호에 토큰 전송하기
        sendTokenToSMS(myphone, myToken);
        return "인증완료";
      });
    },
  },
};

const app = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true, //모든 사이트 허용
  //  origin: ["http://naver.com", "http://daum.net"] 특정 사이트 지정하고 싶을때
});

app.listen(3001).then(() => {
  console.log("백엔드 API 서버가 켜졌어요.");
});
