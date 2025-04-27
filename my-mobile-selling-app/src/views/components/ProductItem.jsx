import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatters';

export default function ProductItem({ product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      style={{
        cursor: 'pointer',
        border: '1px solid #ddd',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <img
        src={product.imgUrl}
        alt={`${product.brand} ${product.model}`}
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      <div style={{ padding: '0.5rem' }}>
        <h3 style={{ margin: '0 0 0.5rem' }}>
          {product.brand} {product.model}
        </h3>
        <p style={{ margin: 0, fontWeight: 'bold' }}>
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
}