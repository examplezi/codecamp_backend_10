import { UpdateUserPwdInput } from "../dto/update-user.input";
import { User } from "../entities/user.entity";

export interface IUsersServiceCreate {
  email: string;
  hashedPassword: string;
  name: string;
  age: number;
}

export interface IUsersServiceFindOne {
  id: string;
  email: string;
}

export interface IUsersServiceUpdate {
  user: User;
  updateUserPwdInput: UpdateUserPwdInput;
}

export interface IUsersServiceDelete {
  userId: string;
}
