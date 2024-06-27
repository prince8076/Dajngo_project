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
        <div>
            <div style={{ marginBottom: '16px' }}>
                <Link to="/add-product" style={styles.addButton}>Add Product</Link>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Name</th>
                        <th style={styles.tableHeader}>Price</th>
                        <th style={styles.tableHeader}>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {data.allProducts.map(({ id, name, price, stock }) => (
                        <tr key={id} style={styles.tableRow}>
                            <td style={styles.tableCell}>
                                <Link to={`/product/${id}`} style={styles.link}>{name}</Link>
                            </td>
                            <td style={styles.tableCell}>${price}</td>
                            <td style={styles.tableCell}>{stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    tableHeader: {
        backgroundColor: '#f2f2f2',
        borderBottom: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
    },
    tableCell: {
        padding: '8px',
        textAlign: 'left',
    },
    link: {
        textDecoration: 'none',
        color: 'blue',
    },
    addButton: {
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 16px',
        borderRadius: '4px',
        textDecoration: 'none',
        display: 'inline-block',
    },
};

export default ProductsList;
