interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// 1. partial 타입
type aaa = Partial<IProfile>;

// 2. Required type
type bbb = Required<IProfile>;

// 3. Pick type

type ccc = Pick<IProfile, "name" | "age">;

// 4. Omit type

type ddd = Omit<IProfile, "school">;

// 5. Record type
type eee = "철수" | "영희" | "훈이"; //Union type => 셋 중에 하나만 선택됨
let child: eee;
child = "철수";

type fff = Record<eee, IProfile>; //Record type

type ggg = keyof IProfile; //"name" | "age" | "school" | "hobby" 형태의 Union type
let myprofile: ggg;
myprofile = "hobby";

// ========= (type vs interface) 차이 : 선언병합 ==========
interface IProfile {
  candy: number;
}

let profile: Partial<IProfile> = {
  candy: 100,
};
