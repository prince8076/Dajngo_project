import { gql } from '@apollo/client';

export const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $price: Float!, $stock: Int!) {
    createProduct(input: { name: $name, price: $price, stock: $stock }) {
      product {
        id
        name
        price
        stock
      }
    }
  }
`;