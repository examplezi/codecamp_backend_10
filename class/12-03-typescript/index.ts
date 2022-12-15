// 타입추론

let aaa = "안녕하세여";
aaa = 3;

//타입명시
let bbb: string = "반갑습니다";
bbb = 10;

//타입명시가 필요한 상황
let ccc: number | string = 1000;
ccc = "1000원";

//숫자타입
let ddd: number = 10;
ddd = "철수";

//불린타입
let eee: boolean = true;
eee = false;
eee = "false"; // 트루로 작동
// 문자열 안에 뭐가 있으면 트루
// 숫자 0 거짓
//빈문자열 거짓

//배열타입
let fff: number[] = [1, 2, 3, 4, 5, "안녕하세요"];
let ggg: string[] = ["철수", "영희", "훈이", 10];
let hhh: (string | number)[] = ["철수", "영희", "훈이", 10]; //타입을 추론해서 어떤 타입을 사용하는지 알아보기

//객체타입
interface Iprofile {
  name: string;
  age: number | string;
  school: string;
  hobby?: string; // ?는 비필수 , 물음표가 없는 것은 필수 !
}
const profile: Iprofile = {
  name: "철수",
  age: 8,
  school: "다람쥐초등학교",
  //   hobby: "둥산"
};

profile.name = "훈이";
profile.age = "8살";
profile.hobby = "수영";

//함수타입 => 어디서 몇번이든 호출 가능하므로, 타입 추론 할 수 없음(반드시 타입명시 필요)
function add(num1: number, num2: number, unit: string): string {
  //리턴타입 명시
  return num1 + num2 + unit;
}
const result = add(1000, 2000, "원"); //결과의 리턴 타입도 예측 가능!!!

//화살표 함수
const add2 = (num1: number, num2: number, unit: string): string => {
  return num1 + num2 + unit;
};
const result2 = add(1000, 2000, "원"); //결과의 리턴 타입도 예측 가능!!!

//any타입 (타입스크립트 -> 자바스크립트로 )
let qqq: any = "철수"; // 자바스크립트와 동일
qqq = 123;
qqq = true;

//ts node index.ts:
