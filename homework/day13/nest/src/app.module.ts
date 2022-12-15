import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FetchStarbucksModule } from './apis/fetchStarbucks/fetchStarbucks.module';

@Module({
  imports: [
    FetchStarbucksModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
