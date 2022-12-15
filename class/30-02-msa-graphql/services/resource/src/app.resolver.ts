//import { Controller, Get } from "@nestjs/common";
import { Resolver, Query } from "@nestjs/graphql";
//import { AppService } from "./app.service";

@Resolver()
export class AppResolver {
  @Query(() => String)
  fetchBoards() {
    return "게시글 데이터 보내기";
  }
}
