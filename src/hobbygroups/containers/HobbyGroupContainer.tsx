import Heading from 'common/components/Heading';
import React from 'react';
import HobbyGroupList from '../components/HobbyGroupList';
import Intro from '../components/Intro';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';

export const link = createHttpLink({
  uri: 'https://wsqi2mae.api.sanity.io/v1/graphql/production/default',
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const HobbyGroupContainer = () => (
  <ApolloProvider client={client}>
    <section>
      <Heading title="Interessegrupper" />
      <Intro />
      <HobbyGroupList />
    </section>
  </ApolloProvider>
);

export default HobbyGroupContainer;
