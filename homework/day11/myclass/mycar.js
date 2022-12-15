// 1. `mycar.js` 파일에 나만의 자동차 클래스를 만들어 주세요.
//     1. 최소한 3개의 변수**(기종, 마력, 색깔)**이 포함되어야 합니다.
//     2. 최소한 2개의 메소드**(출발하기, 정지하기)**가 포함되어야 합니다.

class Mycar {
  model = "kia";
  power = 200;
  color = "purple";

  start = () => {
    console.log("출발하세요.");
  };

  stop = () => {
    console.log("멈추세요.");
  };
}

// const mycar1 = new Mycar(20);
// mycar1.start();
// mycar1.stop();
