import React, { useEffect } from 'react'
import AppRoutes from '../src/routes'
import Header from './views/components/Header'
import { getAllProducts } from './controllers/ProductController'

export default function App() {
  useEffect(() => {
    getAllProducts()
      .then(data => console.log('Productos cargados:', data))
      .catch(err => console.error('Error cargando productos:', err))
  }, [])

  return (
    <>
      {/*Header visible en todas las vistas */}
      <Header />

      <main style={{ padding: '1rem' }}>
        <AppRoutes />
      </main>
    </>
  )
}


