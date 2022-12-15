import { Args, Int, Mutation, Resolver, Query, ID } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import * as bcrypt from "bcrypt";
import { UpdateUserInput } from "./dto/update-user.input";
//import { Query } from "@nestjs/common";

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService //
  ) {}

  //조회
  @Query(() => [User])
  fetchUsers() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  fetchUser(
    @Args("userId") userId: string //
  ): Promise<User> {
    return this.usersService.findOne({ userId });
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
  @Mutation(() => User)
  async updateUser(
    @Args("userId") userId: string,
    @Args("updateUserInput") updateUserInput: UpdateUserInput
  ): Promise<User> {
    const user = await this.usersService.findOne({ userId });

    // if(product.isSoldout)
    // this.productService.checkSoldout({ product });
    return this.usersService.update({ user, updateUserInput });
  }

  //삭제
  @Mutation(() => Boolean)
  deleteUser(@Args("userId", { type: () => ID }) userId: string) {
    return this.usersService.delete({ userId });
  }

  @Mutation(() => Boolean)
  restoreUser(@Args("userId", { type: () => ID }) userId: string) {
    return this.usersService.restore({ userId });
  }
}
