import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IamportService } from "src/apis/iamport/iamport.service";
import { User } from "src/apis/users/entities/user.entity";

import { Payment } from "./entities/payment.entity";
import { PaymentResolver } from "./payment.resolver";
import { PaymentService } from "./payment.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
      Payment,
    ]),
  ],
  providers: [
    PaymentResolver, //
    PaymentService,
    IamportService,
  ],
})
export class PaymentModule {}
