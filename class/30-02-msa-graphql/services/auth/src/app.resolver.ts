//import { Controller, Get } from "@nestjs/common";
import { Resolver, Mutation } from "@nestjs/graphql";
//import { AppService } from "./app.service";

@Resolver()
export class AppResolver {
  @Mutation(() => String)
  login() {
    return "accessToken";
  }
}
