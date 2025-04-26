import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductList from './views/pages/ProductList'
import ProductDetail from './views/pages/ProductDetail'

export default function AppRoutes() {
    return (
        <BrowserRouter>
          <Routes>
            {/*Ruta Listado de productos */}
            <Route path="/" element={<ProductList />} />
    
            {/* Ruta detalle del producto */}
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </BrowserRouter>
    );
}