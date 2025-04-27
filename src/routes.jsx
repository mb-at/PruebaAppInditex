import { Routes, Route } from 'react-router-dom'
import ProductList from './views/pages/ProductList'
import ProductDetail from './views/pages/ProductDetail'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  )
}