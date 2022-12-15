function checkEmail(myemail) {
  if (myemail === undefined || myemail.includes("@") === false) {
    console.log("에러 발생!!! 이메일 주소를 제대로 입력해 주세요!!!");
    return false; // 이메일 조건 확인 종료
  } else {
    return true;
  }
}

function getWelcomeTemplate({ name, age, school, createdAt }) {
  const mytemplate = `
          <html>
              <body>
                  <h1>${name}님 가입을 환영합니다 !! </h1>
                  <hr />
                  <div>이름 : ${name}</div>  
                  <div>나이 : ${age}</div> 
                  <div>학교 : ${school}</div> 
                  <div>가입일 :${createdAt}</div> 
              </body>
          </html>
      `;
  // ${} 용법? ${ } 사이에 변수나 연산 등을 삽입
  // console.log(myTemplate);
  return myTemplate;
}
function sendTemplateToEmail(myemail, result) {
  console.log(myemail + "이메일로 가입환영템플릿" + result + "를 전송합니다.");
}

function createUser({ name, age, school, email, createdAt }) {
  //1. 이메일 정상인지 확인(존재여부 undefined, @포함유무)
  const isValid = checkEmail(email);
  if (isValid === false) {
    return; //함수 createUser 종료
  }

  //2. 가입환영 템플릿 만들기
  const myTemplate = getWelcomeTemplate({
    name,
    age,
    school,
    createdAt,
  });

  //3. 이메일 가입환영 템플릿 전송

  sendTokenToemail(email, myTemplate);
}

const name = "철수";
const age = 8;
const school = "다람쥐초등학교";
const email = "a@a.com";
const createdAt = "2022-10-02";

createUser({ name, age, school, email, createdAt });
