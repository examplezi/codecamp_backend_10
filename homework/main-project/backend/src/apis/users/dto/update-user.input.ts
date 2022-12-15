import { InputType, PartialType } from "@nestjs/graphql";
import { CreateUserInput } from "./createUser.input";

@InputType()
export class UpdateUserPwdInput extends PartialType(CreateUserInput) {
  //   name: string;
  //   description: string;
  //   price: number;
}

//PickType(CreateProductInput, ['name', 'price']) => 고르기
//OmitType(CreateProductInput, ['name', 'price']) => 빼기
//PartialType(CreateProductInput) => 았/없 가능
