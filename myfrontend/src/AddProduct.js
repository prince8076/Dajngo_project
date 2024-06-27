import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const ADD_PRODUCT = gql`
  mutation CreateProduct($name: String!, $price: Float!, $stock: Int!, $description: String!) {
    createProduct(name: $name, price: $price, stock: $stock, description: $description) {
      product {
        id
        name
        price
        stock
        description
      }
    }
  }
`;

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');

  const [createProduct, { loading, error }] = useMutation(ADD_PRODUCT, {
    onCompleted: () => {
      navigate('/');
      window.location.reload();
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createProduct({
      variables: {
        name,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        description,
      }
    });
  };

  if (loading) return <p style={styles.message}>Submitting...</p>;
  if (error) return <p style={{ ...styles.message, ...styles.error }}>Error: {error.message}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add Product</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} required />
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Price:
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={styles.input} required />
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Stock:
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} style={styles.input} required />
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={styles.textarea} required />
          </label>
        </div>
        <button type="submit" style={styles.button}>Add Product</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#666',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    height: '100px',
    resize: 'vertical',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  message: {
    textAlign: 'center',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
  },
};

export default AddProduct;