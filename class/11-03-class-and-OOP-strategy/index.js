class 공중부품 {
  run = () => {
    console.log("날아서고고");
  };
}

class 지상부품 {
  run = () => {
    console.log("걸어서고고");
  };
}

class Monster {
  power = 10;
  qqq;
  constructor(부품) {
    this.qqq = 부품;
  }

  attack = () => {
    console.log("공격고고");
    console.log("내 공격력은" + this.power + "야"); //this 는 나 자신 의미
    this.run();
  };

  run = () => {
    this.qqq.run();
  };
}

const mymonster1 = new Monster(new 공중부품());
mymonster1.attack();
mymonster1.run();

const mymonster2 = new Monster(new 지상부품());
mymonster2.attack();
mymonster2.run();
