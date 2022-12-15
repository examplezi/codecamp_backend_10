import { Query, Resolver } from '@nestjs/graphql';
import { FetchStarbucksService } from './fetchStarbucks.service';
import { typeOfStarbucks } from './models/fetchStarbucks.model';

@Resolver()
export class FetchStarbucksResolver {
  constructor(private readonly fetchStarbucksService: FetchStarbucksService) {}

  @Query(() => [typeOfStarbucks])
  fetchStarbucks() {
    return this.fetchStarbucksService.aaa();
  }
}
