import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../../controllers/ProductController';
import { addToCart } from '../../controllers/CartController';
import './ProductDetail.css';  

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError]     = useState(null);

  const [color, setColor]     = useState(null);
  const [storage, setStorage] = useState(null);

  useEffect(() => {
    getProduct(id)
      .then(prod => {
        setProduct(prod);
        // Inicializar selecciones con la primera opción disponible
        setColor(prod.options.colors[0].code);
        setStorage(prod.options.storages[0].code);
      })
      .catch(err => setError(err.message));
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Cargando producto…</p>;

  const handleAdd = async () => {
    try {
      const { count } = await addToCart({ id, colorCode: color, storageCode: storage });
      alert(`Añadido al carrito. Total items: ${count}`);
    } catch (e) {
      console.error(e);
      alert('Error añadiendo al carrito');
    }
  };

  return (
    <section className="pdp-section">
      <div className="pdp-container">
        {/* Columna imagen */}
        <div className="pdp-image">
          <img src={product.imgUrl} alt={`${product.brand} ${product.model}`} />
        </div>

        {/* Columna detalles y acciones */}
        <div className="pdp-details">
          <h2>{product.brand} {product.model}</h2>
          <p className="pdp-price">{new Intl.NumberFormat('es-ES', {
            style: 'currency', currency: 'EUR'
          }).format(product.price)}</p>

          <ul className="pdp-specs">
            <li><strong>CPU:</strong> {product.cpu}</li>
            <li><strong>RAM:</strong> {product.ram}</li>
            <li><strong>SO:</strong> {product.os}</li>
            <li><strong>Pantalla:</strong> {product.displayResolution}</li>
            <li><strong>Batería:</strong> {product.battery}</li>
            <li><strong>Cámaras:</strong> {product.primaryCamera}</li>
            <li><strong>Dimensiones:</strong> {product.dimentions}</li>
            <li><strong>Peso:</strong> {product.weight}</li>
          </ul>

          <div className="pdp-actions">
            <div>
              <label>Color:</label>
              <select value={color} onChange={e => setColor(Number(e.target.value))}>
                {product.options.colors.map(c => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Almacenamiento:</label>
              <select value={storage} onChange={e => setStorage(Number(e.target.value))}>
                {product.options.storages.map(s => (
                  <option key={s.code} value={s.code}>{s.name}</option>
                ))}
              </select>
            </div>

            <button onClick={handleAdd}>Añadir al carrito</button>
          </div>
        </div>
      </div>
    </section>
  );
}
