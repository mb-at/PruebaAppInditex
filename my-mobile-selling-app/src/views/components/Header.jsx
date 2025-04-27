import React, { useState, useEffect } from 'react';
import { getCartCount } from '../../controllers/CartController';
import { Link } from 'react-router-dom';

export default function Header() {
  const [count, setCount] = useState(getCartCount());

  useEffect(() => {
    function onCartChanged(e) {
      setCount(e.detail.count);
    }

    window.addEventListener('cartChanged', onCartChanged);
    return () => {
      window.removeEventListener('cartChanged', onCartChanged);
    };
  }, []);

  return (
    <header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '1rem 0',
      borderBottom: '1px solid #444'
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1>Mi Tienda de Móviles</h1> 
      </Link>
      <div>
        🛒 <strong>{count}</strong>
      </div>
    </header>
  );
}
