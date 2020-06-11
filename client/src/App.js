import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {BrowserRouter, Route }from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login";
import Main from "./components/Main";
import {ExportCarsURL, LoadingURL, LoginURL, MainURL, RegisterURL} from "./components/consts/Links";
import IntroLoader from "./components/IntroLoader";
import Register from "./components/Register";
import ExportCars from "./components/ExportCars";

const client = new ApolloClient({
    uri: 'http://localhost:5000/main',
    onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors);
        console.log('networkError', networkError);
    },
});

function App() {
  return (
      <ApolloProvider client={client}>
          <BrowserRouter>
              <Route exact path={MainURL} component={Main}/>
              <Route exact path={LoginURL} component={Login}/>
              <Route exact path={RegisterURL} component={Register}/>
              <Route exact path={LoadingURL} component={IntroLoader}/>
              <Route exact path={ExportCarsURL} component={ExportCars}/>
          </BrowserRouter>
      </ApolloProvider>
  );
}

export default App;
