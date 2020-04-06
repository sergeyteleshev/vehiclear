import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Launches from "./components/Launches";
import {BrowserRouter, Route }from "react-router-dom";

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql'
});

function App() {
  return (
      <ApolloProvider client={client}>
          <BrowserRouter>
              <Route exact path="/" component={Launches}/>
          </BrowserRouter>
      </ApolloProvider>
  );
}

export default App;
