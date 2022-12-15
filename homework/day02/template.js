// function myemail() {
//   console.log(privateInfo.email);
// }

// function registeredDigits() {
//   console.log(myregisteredDigits);
// }

// function phoneDigits() {
//   console.log(myphoneDigits);
// }

// function myFaveWeb() {
//   console.log(mmyFaveWeb);
// }

function getWelcomeTemplate(privateInfo) {
  const mytemplate = `
        <html>
            <body>
                <h1>코드캠프님 가입을 환영합니다!!!</h1>
                <hr />
                <div>이메일: ${privateInfo.email}</div>
                <div>주민번호: ${privateInfo.registeredDigits}</div>
                <div>휴대폰 번호: ${privateInfo.phoneDigits}</div>
                <div>내가 좋아하는 사이트: ${privateInfo.myFaveWeb}</div>
            </body>
        </html>
    `;
  console.log(mytemplate);
  return mytemplate;
}

// function sendTemplateToEmail(myemail, result) {
//   console.log(myemail + "이메일로 가입환영템플릿 " + result + "를 전송합니다.");
// }

// function createUser({ name, age, school, email, createdAt }) {
//   // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
//   const isValid = checkEmail(email);
//   if (isValid === false) return;

//   // 2. 가입환영 템플릿 만들기
//   const myTemplate = getWelcomeTemplate({ name, age, school, createdAt });

//   // 3. 이메일에 가입환영 템플릿 전송하기
//   sendTemplateToEmail(email, myTemplate);
// }

const privateInfo = {
  email: "support@codebootcamp.co.kr",
  registeredDigits: "210510-1******",
  phoneDigits: "000-0000-0000",
  myFaveWeb: "codebootcamp.co.kr",
};

//createUser({ name, age, school, email, createdAt });
getWelcomeTemplate({ privateInfo });
