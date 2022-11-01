function checkPhone(myphone) {
  //함수이름 정할 때 검증은 check, 함수 이름만 보고 기능알 수 있게 정하기
  if (myphone.length < 10 || myphone.length > 11) {
    console.log("에러 발생. 핸드폰 번호를 제대로 입력해 주세요."); //early exit pattern , 먼저 종료시켜 버리기 즉 소거법으로 먼저 진행 , 이 방법으로 가급적 진행하기
    return false;
  } else {
    return true;
  }
}

function getToken() {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
  return result;
}

function sendTokenToSMS(myphone, result) {
  console.log(myphone + "번호로 인증번호" + result + "를 전송합니다.");
}

// 좋은 예, 리팩토링(실행 결과는 기존과 동일, 내용만 효율적으로 변경)

function createTokenOfPhone(myphone) {
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
}
// myphone 는 핸드폰번호
//myToken 은 6자리 숫자

createTokenOfPhone("010123456789");
