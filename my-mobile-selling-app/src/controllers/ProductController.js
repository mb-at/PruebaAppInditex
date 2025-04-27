import {
    fetchProducts,
    fetchProductById
  } from '../services/ApiService';
  import {
    getCache,
    setCache
  } from '../services/CacheService';
  
  const PRODUCTS_CACHE_KEY = 'products_list';
  const CACHE_TTL = 1000 * 60 * 60; // 1 hora en ms
  
  /**
   * Listado de productos, usando cache localStorage
   * con expiración de 1 hora.
   */
  export async function getAllProducts() {
    const cached = getCache(PRODUCTS_CACHE_KEY);
    if (cached) {
      return cached;
    }
  
    const products = await fetchProducts();
  
    setCache(PRODUCTS_CACHE_KEY, products, CACHE_TTL);
    return products;
  }
  
  /**
   * Devuelve un producto concreto por su id.
   * Por simplicidad, aquí siempre va a la API (sin cache individual).
   */
  export async function getProduct(id) {
    return fetchProductById(id);
  }
  