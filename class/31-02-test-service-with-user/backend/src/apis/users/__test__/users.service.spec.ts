import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

//나만의 미니 TypeORM 만들기
class MockUsersRepository {
  mydb = [
    { email: 'a@A.com', passoword: '0000', name: '철수' },
    { email: 'b@b.com', passoword: '1234', name: '미희' },
  ];

  findOne({ where }) {
    const users = this.mydb.filter((el) => el.email === where.email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}
describe('UsersService', () => {
  let usersService: UsersService;
  beforeEach(async () => {
    const usersModule = await Test.createTestingModule({
      //imports: [TypeORMModule...]
      // controllers:[]
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();
    usersService = usersModule.get<UsersService>(UsersService);
  });

  //이렇게하면, 진자 db가서 찾아와서 비교함
  //   describe('findOne', () => {
  //    const result =  usersService.findOne({email: "a@a.com"})
  //    expect(result).toStrictEqual({
  //     email: "a@a.com",
  //     name :"철수"

  //    })
  //   });

  describe('create', () => {
    it('이미 존재하는 이메일 검증하기', async () => {
      const myData = {
        email: 'a@A.com',
        hashedPassword: '1234',
        namee: '철수',
        age: 13,
      };

      try {
        await usersService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf;
      }
    });

    it('회원 등록 잘 됐는지 검증', async () => {
      const myData = {
        email: 'a@A.com',
        hashedPassword: '1234',
        namee: '철수',
        age: 13,
      };

      const result = await usersService.create({ ...myData });
      expect(result).toStrictEqual({
        email: 'a@A.com',
        hashedPassword: '1234',
        namee: '철수',
        age: 13,
      });
    });

    //TDD => 테스트를 먼저 만들자
    // it('이메일 길이가 초과됐을 때 검증', () => {
    //   const myData = {
    //     email: 'dfjkljhjdkhgghhlh',
    //   };

    //   try {
    //     usersService.create({ ...myData });
    //   } catch (error) {
    //     expect(error).toBeInstanceOf();
    //   }
    //});
  });
});
