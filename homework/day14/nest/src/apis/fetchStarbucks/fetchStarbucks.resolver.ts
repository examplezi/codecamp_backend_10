import { Query, Resolver } from '@nestjs/graphql';
import { FetchStarbucksService } from './fetchStarbucks.service';
import { typeOfStarbucks } from './entities/starbucks.entity';

@Resolver()
export class FetchStarbucksResolver {
  constructor(private readonly fetchStarbucksService: FetchStarbucksService) {}

  @Query(() => [typeOfStarbucks])
  fetchStarbucks() {
    return this.fetchStarbucksService.aaa();
  }
}
