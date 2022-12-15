export interface IUsersServiceCreate {
  email: string;
  hashedPassword: string;
  name: string;
  age: number;
}

export interface IUsersServiceFindOne {
  email: string;
}
