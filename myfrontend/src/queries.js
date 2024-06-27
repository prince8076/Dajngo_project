import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    allProducts {
      id
      name
      price
      stock
    }
  }
`;