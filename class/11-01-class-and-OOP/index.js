// class Date {
//     qqq = 3

//     getFullYear(){

//     }

//     getMonth(){

//     }

// }

const aaa = new Date();

console.log(aaa.getFullYear());
console.log(aaa.getMonth() + 1); // 0부터 시작이라 + 1

class Monster {
  power = 10;

  constructor(qqq) {
    //몬스터 생성할 때 처음 한 번만 실행해주는 함수 =>생성자
    this.power = qqq;
  }
  attack = () => {
    console.log("공격고고");
    console.log("내 공격력은" + this.power + "야"); //this 는 나 자신 의미
    this.run();
  };

  run = () => {
    console.log("도망고고");
  };
}

const mymonster1 = new Monster(20);
mymonster1.attack();
mymonster1.run();

const mymonster2 = new Monster(50);
mymonster2.attack();
mymonster2.run();
