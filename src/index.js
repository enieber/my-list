import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { FeatherProvider } from "feather-client-react";
import { feather } from "./feather";
import { ApolloProvider } from "@apollo/client";
import { apollo } from "./apollo";

ReactDOM.render(
  <React.StrictMode>
    <FeatherProvider client={feather}>
      <ApolloProvider client={apollo}>
        <App />
      </ApolloProvider>
    </FeatherProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
