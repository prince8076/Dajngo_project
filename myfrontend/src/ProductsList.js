import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_PRODUCTS = gql`
  query GetProducts {
    allProducts {
      id
      name
      price
      stock
    }
  }
`;

const ProductsList = () => {
    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {error.message}</p>;

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                </tr>
            </thead>
            <tbody>
                {data.allProducts.map(({ id, name, price, stock }) => (
                    <tr key={id}>
                        <td>
                            <Link to={`/product/${id}`}>{name}</Link>
                        </td>
                        <td>{price}</td>
                        <td>{stock}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductsList;
