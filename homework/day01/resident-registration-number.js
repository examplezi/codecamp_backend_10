// function frontDigits () {
//     const front = substring(Math.random(),6)
// }

//주민번호 가운데가 ”-”로 구성
function checkHyphen(num) {
  if (num.includes("-") === false) {
    console.log("에러 발생!!! 형식이 올바르지 않습니다!!!");
    return false;
  } else {
    return true;
  }
}

//주민번호는 앞 6자리, 뒤 7자리로 구성 => num을 slice로 자르기
function checkDigits(num) {
  const frontDigits = num.substring(0, 6);
  const lastDigits = num.slice(7);
  if (
    frontDigits.length > 6 ||
    frontDigits.length < 6 ||
    lastDigits.length > 7 ||
    lastDigits.length < 7
  ) {
    //if (lastDigits.length > 7 || lastDigits.length < 7) {
    console.log("에러 발생!!! 개수를 제대로 입력해 주세요!!!"); //early exit pattern , 먼저 종료시켜 버리기 즉 소거법으로 먼저 진행 , 이 방법으로 가급적 진행하기
    return false;
  } else {
    return true;
  }
}

//뒤 7자리 중, 끝 6자리는 *로 변경
function checkLastDigits(num) {
  //함수이름 바꾸기, 뒷자리 별만들어주기

  const stars = num.substring(0, 8);

  console.log(stars + "******");
}

function customRegistrationNumber(num) {
  checkHyphen(num);

  checkDigits(num);

  checkLastDigits(num);
}

customRegistrationNumber("210510-1010101");
customRegistrationNumber("210510-1010101010101");
customRegistrationNumber("2105101010101");
