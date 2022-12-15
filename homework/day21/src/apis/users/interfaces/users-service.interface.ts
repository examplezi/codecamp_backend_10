import { UpdateUserInput } from "../dto/update-user.input";
import { User } from "../entities/user.entity";

export interface IUsersServiceCreate {
  email: string;
  hashedPassword: string;
  name: string;
  age: number;
}

export interface IUsersServiceFindOne {
  userId: string;
}

export interface IUsersServiceUpdate {
  user: User;
  updateUserInput: UpdateUserInput;
}

export interface IUsersServiceDelete {
  userId: string;
}
