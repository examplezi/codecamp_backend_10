import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import {
  IUsersServiceCreate,
  IUsersServiceFindOne,
  IUsersServiceUpdate,
} from "./interfaces/users-service.interface";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  findOne({ email }): Promise<User> {
    return this.usersRepository.findOne({ where: { email } }); //id : userId
  }

  //로그인 유저 조회 함수
  findLogin({ context }) {
    return this.usersRepository.findOne({
      where: {
        email: context.req.user.email,
      },
    });
  }

  async create({
    email,
    hashedPassword: password, //변수 설정 이름 바꿔주기(함수의 인자부분만 가능)
    name,
    age,
  }: IUsersServiceCreate): Promise<User> {
    //const qqq = hashedPassword

    const user = await this.usersRepository.findOne({ where: { email } });
    // if (user)
    //   throw new HttpException('이미 등록된 이메일입니다.', HttpStatus.CONFLICT);
    if (user) throw new ConflictException("이미 등록된 이메일입니다.");

    return this.usersRepository.save({
      email,
      password,
      name,
      age, //shorthand property
    });
  }

  // update({ id, passwo}): Promise<User> {
  //   return this.usersRepository.save({
  //     ...user, //
  //     ...updateUserPwdInput,
  //   });
  // }

  async loginUpdate({ id, password }) {
    const result = await this.usersRepository.update({ id }, { password });
    return result.affected ? true : false;
  }

  // 로그인 유저 삭제 함수
  async delete({ id }) {
    const result = await this.usersRepository.softDelete({
      id,
    });
    return result.affected ? true : false;
  }

  // async restore({ userId }) {
  //   const result = await this.usersRepository.restore({ id: userId });

  //   return result.affected ? true : false;
  // }
}
