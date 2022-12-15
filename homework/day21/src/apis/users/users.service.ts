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
    private readonly userRepository: Repository<User>
  ) {}
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne({ userId }: IUsersServiceFindOne): Promise<User> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async create({
    email,
    hashedPassword: password, //변수 설정 이름 바꿔주기(함수의 인자부분만 가능)
    name,
    age,
  }: IUsersServiceCreate): Promise<User> {
    //const qqq = hashedPassword

    const user = await this.userRepository.findOne({
      where: { email },
    });
    // if (user)
    //   throw new HttpException('이미 등록된 이메일입니다.', HttpStatus.CONFLICT);
    if (user) throw new ConflictException("이미 등록된 회원입니다.");

    return this.userRepository.save({
      email,
      password,
      name,
      age, //shorthand property
    });
  }

  update({ user, updateUserInput }: IUsersServiceUpdate): Promise<User> {
    return this.userRepository.save({
      ...user, //
      ...updateUserInput,
    });
  }

  async delete({ userId }) {
    const result = await this.userRepository.softDelete({ id: userId });

    return result.affected ? true : false;
  }

  async restore({ userId }) {
    const result = await this.userRepository.restore({ id: userId });

    return result.affected ? true : false;
  }
}
