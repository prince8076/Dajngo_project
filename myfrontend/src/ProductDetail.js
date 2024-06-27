// src/ProductDetail.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      stock
    }
  }
`;

const ProductDetail = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PRODUCT, {
        variables: { id }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const { name, description, price, stock } = data.product;

    return (
        <div>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Price: ${price}</p>
            <p>Stock: {stock}</p>
        </div>
    );
};

export default ProductDetail;
