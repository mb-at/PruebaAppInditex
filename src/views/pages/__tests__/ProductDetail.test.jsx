import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProductDetail from '../ProductDetail'
import * as Api from '../../../services/ApiService'
import * as CartCtrl from '../../../controllers/CartController'

describe('<ProductDetail />', () => {
  const fakeProduct = {
    id: '42',
    brand: 'Foo',
    model: 'Bar',
    price: 99,
    cpu: 'x',
    ram: 'y',
    os: 'z',
    displayResolution: 'r',
    battery: 'b',
    primaryCamera: 'c',
    dimentions: 'd',
    weight: 'w',
    options: {
      colors: [{ code: 1, name: 'Red' }],
      storages: [{ code: 2, name: '64GB' }]
    },
    imgUrl: 'url'
  }

  beforeEach(() => {
    vi.spyOn(Api, 'fetchProductById').mockResolvedValue(fakeProduct)
  })

  it('muestra datos y permite añadir al carrito', async () => {
    const spyAdd = vi.spyOn(CartCtrl, 'addToCart').mockResolvedValue({ count: 5 })
    render(
      <MemoryRouter initialEntries={['/product/42']}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    )

    // Espera a que cargue
    await waitFor(() => screen.getByText('Foo Bar'))
    expect(screen.getByText('99,00 €')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /añadir al carrito/i })).toBeEnabled()

    fireEvent.click(screen.getByRole('button', { name: /añadir al carrito/i }))
    expect(spyAdd).toHaveBeenCalledWith({ id: '42', colorCode: 1, storageCode: 2 })
  })
})