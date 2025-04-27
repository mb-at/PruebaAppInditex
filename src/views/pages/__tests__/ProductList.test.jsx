import { describe, it, expect, vi} from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import ProductList from '../ProductList'
import * as Controller from '../../../controllers/ProductController'

vi.mock('../../components/ProductItem', () => ({
  default: ({ product }) => <div data-testid="item">{product.id}</div>
}))

describe('<ProductList />', () => {
  const fake = [
    { id: '1', brand: 'Apple', model: 'X', price: 0 },
    { id: '2', brand: 'Samsung', model: 'S', price: 0 },
    { id: '3', brand: 'Google', model: 'Pixel', price: 0 },
  ]

  it('renderiza todos los productos y filtra por texto', async () => {
    vi.spyOn(Controller, 'getAllProducts').mockResolvedValue(fake)
    render(<ProductList />)

    // espera a que carguen
    await waitFor(() => screen.getAllByTestId('item'))
    expect(screen.getAllByTestId('item')).toHaveLength(3)

    // filtrar por "App" (Apple)
    const input = screen.getByPlaceholderText(/Search for brand or model/)
    fireEvent.change(input, { target: { value: 'app' } })

    await waitFor(() => {
      expect(screen.getAllByTestId('item')).toHaveLength(1)
      expect(screen.getByTestId('item')).toHaveTextContent('1')
    })
  })
})