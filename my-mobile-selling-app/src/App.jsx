import React from 'react';
import AppRoutes from '../src/routes'
import Header from './views/components/Header'

export default function App() {
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


