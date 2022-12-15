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
  console.log(mytemplate);
}

const name = "철수";
const age = 15;
const school = "다람쥐초등학교";
const createdAt = "2022-10-12";
getWelcomeTemplate({ name, age, mchool, createdAt }); //하드코딩 : 강제로 코딩해서 변하지 않는 값

// {}로 인해 데이터 오염되지 않음
