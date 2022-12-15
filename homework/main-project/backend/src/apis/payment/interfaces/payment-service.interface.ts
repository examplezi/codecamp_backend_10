import { IAuthUser } from "src/commons/types/context";
export interface IPaymentServiceCreate {
  impUid: string;
  amount: number;
  user: IAuthUser["user"];
}
