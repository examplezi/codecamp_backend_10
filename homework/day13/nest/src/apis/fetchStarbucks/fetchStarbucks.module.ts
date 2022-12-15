import { Module } from '@nestjs/common';
import { FetchStarbucksResolver } from './fetchStarbucks.resolver';
import { FetchStarbucksService } from './fetchStarbucks.service';

@Module({
  // imports: [],
  // controllers: [],
  providers: [FetchStarbucksResolver, FetchStarbucksService],
})
export class FetchStarbucksModule {}
