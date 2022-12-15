import {
  Args,
  Context,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
} from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import * as bcrypt from "bcrypt";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { IContext } from "src/commons/types/context";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { UpdateUserPwdInput } from "./dto/update-user.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  @UseGuards(GqlAuthAccessGuard) //방어막
  @Query(() => String)
  fetchUser(
    @Context() context: IContext //graphql
  ): string {
    // 유저 정보 꺼내오기
    console.log("================");
    console.log(context.req.user);
    console.log("================");
    return "인가에 성공하였습니다.";
  }

  @Mutation(() => User)
  async createUser(
    @Args("email") email: string,
    @Args("password") password: string,
    @Args("name") name: string,
    @Args({ name: "age", type: () => Int }) age: number // 정수값만 받기
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({ email, hashedPassword, name, age });
  }

  //수정
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async updateUser(
    @Context() context: IContext,
    @Args("password") password: string
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.loginUpdate({
      password: hashedPassword,
      id: context.req.user.id,
    });
  }
  //삭제
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteUser(@Context() context: IContext): Promise<boolean> {
    return this.usersService.delete({
      id: context.req.user.id,
    });
  }

  //로그인 유저 조회
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  fetchLoginUser(@Context() context: IContext) {
    console.log(context.req.user.email);
    return this.usersService.findLogin({ context });
  }
}
