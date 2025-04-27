import { describe, it, expect, beforeEach, vi } from 'vitest'
import { addToCart, getCartCount } from '../CartController'
import * as ApiService from '../../services/ApiService'

beforeEach(() => {
  localStorage.clear()
})

describe('CartController', () => {
  it('suma correctamente el contador cuando la API devuelve siempre count=1', async () => {
    vi.spyOn(ApiService, 'addToCart').mockResolvedValue({ count: 1 })

    // Primer addToCart: parte de 0 → debe devolver 1
    let res = await addToCart({ id: '001', colorCode: 1, storageCode: 2 })
    expect(res.count).toBe(1)
    expect(getCartCount()).toBe(1)

    // Segundo addToCart: API sigue devolviendo 1, pero fallback lo convierte en 2
    res = await addToCart({ id: '002', colorCode: 14, storageCode: 26 })
    expect(res.count).toBe(2)
    expect(getCartCount()).toBe(2)
  })
})
