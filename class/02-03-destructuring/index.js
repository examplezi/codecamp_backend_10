// 1.일반변수 전달
// function zzz(aaa) {

//     // const aaa = "사과"

//     console.log(aaa) //사과

// }
// zzz("사과")

// 2.객체 전달
// function zzz(aaa) {
//   //const aaa = basket

//   console.log(aaa); //객체
//   console.log(aaa.apple); // 3
//   console.log(aaa.banana); // 10
// }

// const basket = {
//   apple: 3,
//   banana: 10,
// };

// zzz(basket);

//3. 객체 전달 => 구조분해할당 방식으로 전달
// function zzz({apple, banana}) {
//     //const {apple, banana} = basket

//     //console.log(aaa); //객체
//     console.log(apple); // 3
//     console.log(banana); // 10
//   }

//   const basket = {
//     apple: 3,
//     banana: 10,
//   };

//   zzz(basket); //객체로 전달해줬으나 받는건 그 안의 요소들을 분해해서 받음

//4. 객체 구조분해할당 방식으로 전달 + shorthand property

function zzz({ banana, apple }) {
  // 자리 바꿔도 영향미치지 않음
  //const {apple, banana} = basket

  //console.log(aaa); //객체
  console.log(apple); // 3
  console.log(banana); // 10
}

const apple = 3;
const banana = 10;

// const basket = { apple, banana };
// //   const basket = {
// //     apple: apple,
// //     banana: banana,
// //   };

// zzz(basket); //객체로 전달해줬으나 받는건 그 안의 요소들을 분해해서 받음
zzz({ apple, banana }); //객체는 자리가 중요 , 배열은 키(이름)가 중요
