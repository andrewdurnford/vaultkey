import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./components/App";
import { AuthProvider } from "./hooks/useAuth";
import { GlobalStyle, theme } from "./utils/theme";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      ...(token && { authorization: `Bearer ${token}` }),
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <React.StrictMode>
          <GlobalStyle />
          <App />
        </React.StrictMode>
      </ThemeProvider>
    </AuthProvider>
  </ApolloProvider>
);
