import { Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //
  ) {}

  @Query(() => String, { nullable: true }) //머가 대문자고 머가 소문자라고?
  fetchBoards(): string {
    return this.boardsService.qqq();
  }
}
