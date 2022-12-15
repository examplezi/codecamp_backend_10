import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IUsersServiceCreate } from './interfaces/users-service.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async create({
    email,
    hashedPassword: password, //변수 설정 이름 바꿔주기(함수의 인자부분만 가능)
    name,
    age,
  }: IUsersServiceCreate): Promise<User> {
    //const qqq = hashedPassword

    const user = await this.usersRepository.findOne({
      where: { email },
    });
    // if (user)
    //   throw new HttpException('이미 등록된 이메일입니다.', HttpStatus.CONFLICT);
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');

    return this.usersRepository.save({
      email,
      password,
      name,
      age, //shorthand property
    });
  }
}
