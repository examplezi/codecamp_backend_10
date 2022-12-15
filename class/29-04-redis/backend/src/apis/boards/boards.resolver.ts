import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/create-board.input';
import { Board } from './entities/board.entity';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => String, { nullable: true })
  async fetchBoards(): Promise<string> {
    // 1.캐시에서 조회하는 연습
    const mycache = await this.cacheManager.get('aaa');
    // 2. 조회완료 메시지 전달
    console.log(mycache);
    return '캐시에서 조회 완료!!';

    /////////////////////////////////////////////
    //레디스 연습을 위해 잠시 주석 처리
    //return this.boardsService.findAll();
  }

  @Mutation(() => String)
  async createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args({ name: 'contents', nullable: true }) contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): Promise<string> {
    // 1. 캐시에 등록하는 연습
    await this.cacheManager.set('aaa', createBoardInput, 0); //무제한 ttl : 0
    // 2. 등록완료 메시지 전달
    return '케시에 등록 완료!! ';
    //레디스 연습을 위해 잠시 주석 처리
    //return this.boardsService.create({ createBoardInput });
  }
}

// 타입이 자동으로 만들어짐
// Query: {
//     fetchBoards: String
// }
