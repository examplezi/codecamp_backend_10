import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/apis/users/entities/user.entity";
import {
  DataSource,
  QueryRunnerAlreadyReleasedError,
  Repository,
} from "typeorm";
import axios from "axios";
import {
  Payment,
  POINT_TRANSACTION_STATUS_ENUM,
} from "./entities/payment.entity";
import { IPaymentServiceCreate } from "./interfaces/payment-service.interface";
import { query } from "express";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>, //

    private readonly dataSource: DataSource, //

    @InjectRepository(User)
    private readonly userRepository: Repository<User> //
  ) {}
  //
  async isSaved({ impUid }) {
    //중복된 아이디 걸러주는 함수
    console.log(impUid);
    const result = await this.paymentRepository.findOne({ where: { impUid } });
    if (result) throw new ConflictException("이미 결제된 아이디입니다.");
  }

  async isRefund({ impUid }) {
    const refund = await this.paymentRepository.findOne({
      where: { impUid, status: POINT_TRANSACTION_STATUS_ENUM.CANCEL },
    });

    if (refund) {
      throw new ConflictException("이미 취소된 결제 아이디입니다.");
    }
  }

  async checkHasCancelablePoint({ impUid, user }) {
    const payment = await this.paymentRepository.findOne({
      where: {
        impUid,
        user: { id: user.id },
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      },
    });
    if (!payment)
      throw new UnprocessableEntityException("결제 기록이 존재하지 않습니다.");

    const _user = await this.userRepository.findOne({ where: { id: user.id } });
    if (_user.point < payment.amount)
      throw new UnprocessableEntityException("포인트가 부족합니다.");
  }

  async cancel({ impUid, amount, user }) {
    // const queryRunner = await this.dataSource.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction("SERIALIZABLE");

    const payment = await this.create({
      impUid,
      amount: -amount,
      user,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
    //await queryRunner.commitTransaction();
    return payment;
  }

  async create({
    impUid,
    amount,
    user: _user,
    status = POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
  }): Promise<Payment> {
    console.log(impUid, amount, _user);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction("SERIALIZABLE");

    try {
      const payment = this.paymentRepository.create({
        impUid,
        amount,
        user: _user,
        status,
      });

      await queryRunner.manager.save(payment);

      const user = await queryRunner.manager.findOne(User, {
        where: {
          id: _user.id,
        },
      });

      await queryRunner.manager.update(
        User,
        { id: user.id },
        { point: user.point + amount }
      );
      await queryRunner.commitTransaction();
      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}

//클라이언트에서 받은 imp_uid와 아임포트에서 받아온 토큰을 이용해, 유효한 imp_uid인지 아임포트에서 확인

//유효하지 않다면 UnprocessableEntityException
// if (!impUid) throw new UnprocessableEntityException("결제가 없습니다.");

// 이미 결제 테이블에 추가된 결제건이라면 ConflictException
// const isSaved =
// if(!isSaved) throw new ConflictException("이미 결제되었습니다.");

//   async update({ impUid, amount, user: _user }) {
//     const payment = this.paymentRepository.save({
//       impUid,
//       amount: -amount,
//       user: _user,
//       status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
//     });
//     const user = await this.userRepository.findOne({
//       where: {
//         id: _user.id,
//       },
//     });
//     await this.userRepository.update(
//       { id: user.id },
//       { point: user.point - amount }
//     );
//   }
// }

// try {
//   await this.save(user);
// } catch (error) {
//   if (error.code === '23505') {
//       throw new ConflictException('Existing username')
//   } else {
//       throw new InternalServerErrorException();
//   }
// }
