import axios from "axios";
import cheerio from "cheerio";

// export class Post_UserService {
//   checkValue = async () => {
// 입력 받은 핸드폰 번호로 Tokens 문서를 검색해 해당 번호의 isAuth가 true인지 확인
const result = await Token.findOne({ phone: phone });
if (!result) {
  //await token.save();
  console.log("에러 !! 휴대폰 번호가 인증되지 않았습니다.");
  //return;
}

//   // 스크래핑
export async function createBoardAPI(prefer) {
  // 2. 만약 있다면, 찾은 주소로 axios.get 요청해서 ;html코드 받아오기 => 스크래핑
  const result = await axios.get(prefer);
  let og;
  let arr = [];
  // 3. 스크래핑 결과에서 OG(오픈그래프) 코드 골라내서 변수에 저장하기
  const $ = cheerio.load(result.data);
  $("meta").each((i, el) => {
    if ($(el).attr("property") && $(el).attr("property").includes("og:")) {
      const value = $(el).attr("content"); // 네이버, 네이버 메인에서 ~~~
      arr.push(value);
      og = Object.assign({}, arr);
    }
  }); //로드한 결과에서 meta로 시작하는 데이터만 뽑기 , forEach 사용 ?
  return og;
}

const og = await createBoardAPI(prefer);
console.log(og);

export function checkLastDigits(personal) {
  //함수이름 바꾸기, 뒷자리 별만들어주기

  const stars = personal.substring(0, 8);

  return stars + "******";
}

const aaa = new User({
  name,
  email,
  personal,
  prefer,
  pwd,
  phone,
  og: {
    title: og[0],
    description: og[3],
    image: og[2],
  },
});
console.log(aaa);
await aaa.save();
// 3. 이메일에 가입환영 템플릿 전송하기
sendTemplateToEmail(email, myTemplate);
res.send("전송완료");
