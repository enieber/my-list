import { split, ApolloClient } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { WebSocketLink } from "@apollo/client/link/ws";

import { feather } from "./feather";
const BASE_URL = "hagrid-startse.herokuapp.com/v1/graphql"

const httpLink = new HttpLink({
  uri: `https://${BASE_URL}`,
  fetchPolicy: "network-only",
});



const wsLink = new WebSocketLink({
  uri: `ws://${BASE_URL}`,
  options: {
    reconnect: true,
    options: {
        reconnect: true,
        connectionParams: () => feather
              .currentUser()
              .then((user) => ({ authorization: `Bearer ${user.tokens.idToken}` })),
      }
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const authLink = setContext((_, { headers }) =>
  feather
    .currentUser()
    .then((u) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${u.tokens.idToken}`,
      },
    }))
    .catch((_) => ({ headers }))
);

export const apollo = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(splitLink),
});
