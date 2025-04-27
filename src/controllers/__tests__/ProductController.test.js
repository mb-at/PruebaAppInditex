import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as Api from '../../services/ApiService'
import * as Cache from '../../services/CacheService'
import { getAllProducts, getProduct } from '../ProductController'

describe('ProductController', () => {
  const fakeList = [{ id: '1' }, { id: '2' }]
  const fakeOne = { id: '42', foo: 'bar' }

  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('getAllProducts: Llama a fetchProducts y luego cachea', async () => {
    const spyFetch = vi.spyOn(Api, 'fetchProducts').mockResolvedValue(fakeList)
    const spySet = vi.spyOn(Cache, 'setCache')
    // 1ª vez: resuelve con la API
    const list1 = await getAllProducts()
    expect(spyFetch).toHaveBeenCalled()
    expect(list1).toEqual(fakeList)
    expect(spySet).toHaveBeenCalledWith('products_all', fakeList)

    // 2ª vez: hay caché => no vuelve a llamar a la API
    spyFetch.mockClear()
    const list2 = await getAllProducts()
    expect(list2).toEqual(fakeList)
    expect(spyFetch).not.toHaveBeenCalled()
  })

  it('getProduct: Llama a fetchProductById y cachea por id', async () => {
    const spyFetchOne = vi
      .spyOn(Api, 'fetchProductById')
      .mockResolvedValue(fakeOne)
    const spySet = vi.spyOn(Cache, 'setCache')
    // primera llamada
    const p1 = await getProduct('42')
    expect(spyFetchOne).toHaveBeenCalledWith('42')
    expect(p1).toEqual(fakeOne)
    expect(spySet).toHaveBeenCalledWith('product_42', fakeOne)

    // segunda llamada => usa caché
    spyFetchOne.mockClear()
    const p2 = await getProduct('42')
    expect(p2).toEqual(fakeOne)
    expect(spyFetchOne).not.toHaveBeenCalled()
  })
})