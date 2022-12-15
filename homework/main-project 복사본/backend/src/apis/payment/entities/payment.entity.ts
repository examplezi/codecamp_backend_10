import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { User } from "src/apis/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum POINT_TRANSACTION_STATUS_ENUM {
  PAYMENT = "PAYMENT",
  CANCEL = "CANCEL",
}

registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  name: "POINT_TRANSACTION_STATUS_ENUM",
});
@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column({ type: "enum", enum: POINT_TRANSACTION_STATUS_ENUM })
  @Field(() => POINT_TRANSACTION_STATUS_ENUM)
  status: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column()
  @Field(() => String)
  impUid: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @CreateDateColumn()
  @Field(() => Date)
  cratedAt: Date;
}
