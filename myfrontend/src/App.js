// src/App.js
import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsList from './ProductsList';
import ProductDetail from './ProductDetail';
import { getCsrfToken } from './utils/csrf';

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:8000/graphql/',
});

const authLink = setContext((_, { headers }) => {
  const csrfToken = getCsrfToken();

  return {
    headers: {
      ...headers,
      'X-CSRFToken': csrfToken,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: 'include',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <h1>Product List</h1>
          <Routes>
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/" element={<ProductsList />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
