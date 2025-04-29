import React, { useState, useEffect } from 'react';
import { Link, useLocation }         from 'react-router-dom';
import { getCartCount }              from '../../controllers/CartController';
import './Header.css';

export default function Header() {
  const [count, setCount] = useState(getCartCount());
  const { pathname }      = useLocation();
  const isDetail          = pathname.startsWith('/product/');

  useEffect(() => {
    const onCartChanged = e => setCount(e.detail.count);
    window.addEventListener('cartChanged', onCartChanged);
    return () => window.removeEventListener('cartChanged', onCartChanged);
  }, []);

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">MoviMarket</Link>
        <div className="header__cart" aria-label={`Carrito (${count})`}>
          🛒 <strong>{count}</strong>
        </div>
      </div>

      {isDetail && (
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb__link">Tienda</Link>
          <span className="breadcrumb__sep">›</span>
          <span className="breadcrumb__current">Información del producto</span>
        </nav>
      )}
    </header>
  );
}
