import axios from "axios";
import cheerio from "cheerio";

// const aaa = async () => {
//   // axios.get으로 요청해서 html코드 받아오기 => scraping

//   const result = await axios.get("https://www.naver.com");
//   console.log(result.data);
// };

// aaa();

const createMessage = async () => {
  // 입력된 메세지 : "안녕하세요~ https://www.naver.com 에 방문해 주세요!"

  // 1. 입력된 메세지에서 http로 시작하는 문장이 있는지 먼저 찾기! includes?

  const url = "https://www.naver.com";

  // 2. axios.get으로 요청해서 html 코드 받아오기 => 스크래핑
  const result = await axios.get(url);
  console.log(result.data);

  // 3. 스크래핑 결과(result) 에서 OG(오픈 그래프) 코드 골라내서 변수에 저장하기
  const $ = cheerio.load(result.data);
  $("meta").each((i, el) => {
    if ($(el).attr("property") && $(el).attr("property").includes("og:")) {
      const key = $(el).attr("property"); //og: title, og:description,
      const value = $(el).attr("content"); // 네이버, 네이버 메인에서 ~~~
      console.log(key, value);
    }
  }); //로드한 결과에서 meta로 시작하는 데이터만 뽑기 , forEach 사용 ?
};

createMessage();
