
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { 
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split
} from '@apollo/client' 
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws';

require('dotenv').config()

const queryEndpoint = process.env.QUERY_ENDPOINT || 'https://wottankpickserver.herokuapp.com/graphql' || 'http://localhost:4000/graphql'
const subscriptionEndpoint = process.env.SUBSCRIPTION_ENDPOINT || 'ws://wottankpickserver.herokuapp.com/subscriptions'||'ws://localhost:4000/subscriptions'
const httpLink = new HttpLink({
  uri: queryEndpoint
});

const wsLink = new WebSocketLink({
  uri: subscriptionEndpoint,
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)