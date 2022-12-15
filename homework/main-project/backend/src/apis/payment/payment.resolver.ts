import {
  ConflictException,
  UnprocessableEntityException,
  UseGuards,
} from "@nestjs/common";
import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";

import { IamportService } from "src/apis/iamport/iamport.service";

import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/types/context";
import { Payment } from "./entities/payment.entity";
import { PaymentService } from "./payment.service";

@Resolver()
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService, //
    private readonly iamportService: IamportService
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment) //Payment
  async createPayment(
    @Args("impUid") impUid: string, //
    @Args({ name: "amount", type: () => Int }) amount: number,
    @Context() context: IContext //: //Promise<Payment>
  ) {
    const user = context.req.user;
    // 검증로직들
    // 1. 아임포트에 요청해서 결제 완료 기록이 존재하는지 확안
    const token = await this.iamportService.getToken();
    console.log(token);
    await this.iamportService.checkPaid({ impUid, amount, token });

    //2. payment 테이블에는 impUid가 1번만 존재해야 함 (중복 결제를 체크)
    await this.paymentService.isSaved({ impUid });
    return this.paymentService.create({ impUid, amount, user });

    // this.iamportService.validateData({ amount, impUid });
    // const user = context.req.user;
    // return await this.paymentService.create({ impUid, amount, user });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async cancelPayment(
    @Args("impUid") impUid: string, //
    @Args({ name: "amount", type: () => Int }) amount: number, //
    @Context() context: IContext

    // @Args("access") access: string
  ) {
    // 검증로직
    const user = context.req.user;
    // 1. 이미 취소된 건인지 확인
    await this.paymentService.isRefund({ impUid });
    // 2. 취소하기에 충분한 내 포인트 잔액이 남아있는지
    await this.paymentService.checkHasCancelablePoint({
      impUid,
      user,
    });
    // 3. 살재로 아임포트에 취소 요청하기
    const token = await this.iamportService.getToken();
    const canceledAmount = await this.iamportService.cancel({ impUid, token });
    // 4.payment 테이블에 결제 취소 요청하기

    return this.paymentService.cancel({
      impUid,
      amount: canceledAmount,
      user,
    });

    //const user = context.req.user;
    // await this.iamportService.delete({ impUid, amount });
    // return await this.paymentService.update({ impUid, amount, user });
  }
}
