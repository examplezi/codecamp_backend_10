import { Controller, Get, Inject, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { ClientProxy } from "@nestjs/microservices";
@Controller()
export class AppController {
  constructor(
    @Inject("AUTH_SERVICE")
    private readonly clientAuthService: ClientProxy,
    @Inject("RESOURCE_SERVICE")
    private readonly clientResourceService: ClientProxy
  ) {}

  @Post("/auth/login")
  login() {
    // auth-service로 트래픽 넘겨줌
    return this.clientAuthService.send(
      { qqq: "이름" },
      { email: "a@a.com", password: "1234" }
    );
  }

  @Get("/boards")
  fetchBoard() {
    //resource-service로 트래픽 넘겨줌
    return this.clientResourceService.send({ cmd: "fetchBoards" }, {});
  }
}
