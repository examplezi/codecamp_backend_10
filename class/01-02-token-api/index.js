//안좋은예
//function createTokenOfPhone() {
//매개변수
// 1. 휴대폰번호 자릿수 맞는지 확인하기 (10-11자리)
//   if (qqq.length >= 10) {
//     if (qqq.length <= 11) {
//       // 2. 핸드폰 토큰 6자리 만들기
//       const result = String(Math.floor(Math.random() * 1000000)).padStart(6,
//         "0"
//       );
//       console.log(result);

//       // 3. 핸드폰번호에 토큰 전송하기
//       console.log(qqq + "번호로 인증번호" + result + "를 전송합니다.");
//     } else {
//       console.log("에러 발생. 핸드폰 번호를 제대로 입력해 주세요.");
//     }
//   } else {
//     console.log("에러 발생. 핸드폰 번호를 제대로 입력해 주세요.");
//   }
// } // 문자열 쪼개지는게 토큰
// // 인자 / 파라미터는 다름

// createTokenOfPhone("01012345678");

// function asf(qqq,abc) {

// }

// asf("사과","바나나") 인자

// 좋은 예, 리팩토링(실행 결과는 기존과 동일, 내용만 효율적으로 변경)

function createTokenOfPhone(qqq) {
  // 1. 휴대폰번호 자릿수 맞는지 확인하기 (10-11자리)
  if (qqq.length < 10 || qqq.length > 11) {
    console.log("에러 발생. 핸드폰 번호를 제대로 입력해 주세요."); //early exit pattern , 먼저 종료시켜 버리기 즉 소거법으로 먼저 진행 , 이 방법으로 가급적 진행하기
    return;
  }

  // 2. 핸드폰 토큰 6자리 만들기
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
  // 3. 핸드폰번호에 토큰 전송하기
  console.log(qqq + "번호로 인증번호" + result + "를 전송합니다.");
}
