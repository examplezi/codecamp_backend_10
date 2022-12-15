// public, private, protected, readonly

// class Aaa1 {
//   power;

//   constructor(protected mypower: any) {
//     //this.power = mypower; // public, private, protected, readonly 중 하나라도 있으면 자동 생성됨
//   }

//   ggg() {
//     console.log("나의 공격력은" + this.mypower); // 안에서 접근 가능
//     this.mypower = 10; // 안에서 수정 가능
//   }
// }

// class Aaa2 extends Aaa1 {
//   // constructor(qqq)
//   kkk() {
//     console.log("나의 공격력은" + this.mypower); // 자식이 접근 가능
//     this.mypower = 10; //자식이 수정 가능
//   }
// }

// /////////밖에서 불가!!!!!!!
// const qqq = new Aaa2(50);
// qqq.ggg();
// qqq.kkk();
// console.log(qqq.mypower); //밖에서 접근 블가능
// qqq.mypower = 10; // 밖에서 수정 불가능
