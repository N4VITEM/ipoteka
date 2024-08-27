import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLConfig } from './GraphQL.config';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>(GraphQLConfig)],
  controllers: [],
  providers: [],
})
export class GraphQLConfigurationModule {}
