import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, Repository, TableInheritance } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';
import { IPointsTransactionsServiceCreate } from './interfaces/points-transactions-service.interface';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}
  async create({
    impUid,
    amount,
    user: _user,
  }: IPointsTransactionsServiceCreate): Promise<any> {
    //_user는 메인이 아님
    // this.pointsTransactionsRepository.create(); //등록을 위한 빈 객체 만들기
    // this.pointsTransactionsRepository.insert(); // 결과는 못 받는 등록 방법
    // this.pointsTransactionsRepository.update(); // 결과는 못 받는 수정 방법
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      // 1. PointTransaction 테이블에 거래기록 1줄 생성
      const pointTransaction = this.pointsTransactionsRepository.create({
        impUid: impUid,
        amount: amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      await queryRunner.manager.save(pointTransaction); //queryRunner를 통해서 저장해야만 트랜잭션 먹힘

      //await this.pointsTransactionsRepository.save(pointTransaction); //db에 가기 때문에 await
      //함수에 마우스를 올려놓고 리턴 타입이 promise 가 나오면 db에 접속하기 때문에 await을 사용함

      throw new Error('강제로 에러 발생!!!');
      // 2. 유저의 돈 찾아오기
      // const user = await this.usersRepository.findOne({
      //   where: { id: _user.id },
      // });
      //console.log(user);

      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id },
      });

      // 3. 유저의 돈 업데이트
      // await this.usersRepository.update(
      //   { id: _user.id },
      //   { point: user.point + amount },
      // );
      const updatedUser = this.usersRepository.create({
        ...user,
        point: user.point + amount,
      });

      await queryRunner.manager.save(updatedUser);

      await queryRunner.commitTransaction();

      // 4. 최종결과 브라우저에 돌려주기

      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      //await queryRunner.release();
    }
  }
}
