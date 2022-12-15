import { User } from 'src/apis/users/entities/user.entity';
import { IAuthUserItem } from 'src/commons/types/context';
import { Response } from 'express';
export interface IAuthServiceGetAccessToken {
  user: User | IAuthUserItem;
}
export interface IAuthServiceSetRefreshToken {
  user: User;
  res: Response;
}
