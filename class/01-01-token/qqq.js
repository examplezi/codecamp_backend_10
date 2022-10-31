//console.log("안녕하세요");

//new terminal : ls  리스트 보기
// cli : command line interface
// cd : change directory 폴더 안으로 들어가기
// pwd : print working directory 현재 위치

//console.log(String(Math.floor(Math.random() * 1000000).padStart(6,"0")))
//padStart : string.padStart(목표길이, 채울 값)문자열 처음부터 채워짐
//padEnd : string.padEnd(목표길이, 채울 값) 문자열 끝에서부터 채워짐
//Math.floor(숫자) 소수점 이하 숫자 내림

function getToken() {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
}

getToken();
