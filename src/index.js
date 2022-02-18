import React from 'react';
import { render } from 'react-dom';
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider, split } from '@apollo/client';
import PlanetSearch from './components/PlanetSearch';
import Planet from './components/Planet';
import Logo from './components/shared/Logo'
import "./index.css";


console.log('this is INDEX lELVEr')

const GRAPHQL_ENDPOINT = "yelp-hasura-eliot.hasura.app/v1/graphql"

const httpLink = new HttpLink({
  uri: `https://${GRAPHQL_ENDPOINT}`,
  credentials: 'same-origin',
  headers: {
    "x-hasura-admin-secret": "1BhEBjeRHJpszgHqWgzqVg1kXW3VuN15mu7cdmVOAUKCPJMVZp0XXIG76M4o8OTj"
  }
})

const wsLink = new WebSocketLink({
  uri: `ws://${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(({ query }) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === "OperationDefinition" &&
    definition.operation === "subscription"
  )
},
  wsLink, httpLink
)


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Logo />
      <Switch>
        <Route path="/planet/:id" component={Planet} />
        <Route path="/" component={PlanetSearch} />
      </Switch>
    </ApolloProvider>
  </BrowserRouter>
)

render(<App />, document.getElementById('root'))