import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../../controllers/ProductController'
import Search from '../components/Search'
import ProductItem from '../components/ProductItem'
import './ProductList.css'

export default function ProductList() {
  const [all, setAll] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    getAllProducts()
      .then(data => setAll(data.slice(0, 10)))
      .catch(console.error)
  }, [])

  const filtered = all.filter(p =>
    p.brand.toLowerCase().includes(filter.toLowerCase()) ||
    p.model.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <section className="product-section">
      <div className="search-container">
        <Search value={filter} onChange={setFilter} />
      </div>
      <div className="product-grid">
        {filtered.map(p => (
          <ProductItem key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
