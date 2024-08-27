import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

export const GraphQLConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: true,
  installSubscriptionHandlers: true,
  subscriptions: {
    'graphql-ws': true,
  },
};
