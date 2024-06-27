import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';

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
  const { id } = useParams(); // Extracts the `id` parameter from the URL
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Destructure product data from the query response
  const { name, description, price, stock } = data.product;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{name}</h2>
      <p style={styles.description}>{description}</p>
      <p style={styles.info}>Price: ${price}</p>
      <p style={styles.info}>Stock: {stock}</p>

      {/* Button to navigate back to the product list */}
      <Link to="/" style={styles.button}>
        Back to Product List
      </Link>
    </div>
  );
};


const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  description: {
    marginBottom: '15px',
  },
  info: {
    marginBottom: '8px',
  },
  button: {
    display: 'inline-block',
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: 'blue',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ProductDetail;
