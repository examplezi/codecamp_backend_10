import { BooleanSchemaDefinition } from "mongoose";

// 1. 문자/숫자/불린 기본타입
const getPrimitive = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  return [arg3, arg2, arg1];
};

const result1 = getPrimitive("철수", 123, true);

// 2. any타입(그냥 자스같음)
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  console.log(arg1 + 100); //any는 아무거나 다 됌
  return [arg3, arg2, arg1];
};

const result2 = getAny("철수", 123, true);

// 3. unknown타입
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  if (typeof arg1 === "number") console.log(arg1 + 100); //any는 아무거나 다 됌
  return [arg3, arg2, arg1];
};

const result3 = getUnknown("철수", 123, true);

// 4. generic타입(타입 유추 가능한 any)
function getGeneric<Mytype1, Mytype2, Mytype3>(arg1: Mytype1, arg2: Mytype2, arg3: Mytype3): [Mytype3, Mytype2, Mytype1] {
  return [arg3, arg2, arg1];
}

const result4 = getGeneric<string, number, boolean>("철수", 123, true);

// 5. generic타입----2(타입 유추 가능한 any)
function getGeneric2<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
  return [arg3, arg2, arg1];
}

const result5 = getGeneric2<string, number, boolean>("철수", 123, true);

// 5. generic타입----3(타입 유추 가능한 any)
function getGeneric3<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
    return [arg3, arg2, arg1];
  }
  
  const result6 = getGeneric3<string, number, boolean>("철수", 123, true);



// 5. generic타입----4(타입 유추 가능한 any)
const getGeneric4 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
    return [arg3, arg2, arg1];
  }
  
  const result7 = getGeneric4<string, number, boolean>("철수", 123, true);