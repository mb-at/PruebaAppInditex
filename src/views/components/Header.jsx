import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCartCount } from '../../controllers/CartController';

export default function Header() {
  const [count, setCount] = useState(getCartCount());
  const { pathname } = useLocation();

  useEffect(() => {
    function onCartChanged(e) {
      setCount(e.detail.count);
    }
    window.addEventListener('cartChanged', onCartChanged);
    return () => window.removeEventListener('cartChanged', onCartChanged);
  }, []);

  const isDetail = pathname.startsWith('/product/');

  return (
    <header style={{
      padding: '2rem 0',
      borderBottom: '1px solid #444',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 style={{ margin: 0 }}>MoviMarket</h1>
        </Link>
        <div style={{ fontSize: '2rem' }}>
          🛒 <strong>{count}</strong>
        </div>
      </div>
      {isDetail && (
        <nav style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
          <Link to="/" style={{ color: '#aaa', textDecoration: 'none' }}>
            Tienda 
          </Link>
          {' '}›{' '}
          <span style={{ color: '#fff' }}>Información del producto</span>
        </nav>
      )}
    </header>
  );
}
