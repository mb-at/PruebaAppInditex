import {
    fetchProducts,
    fetchProductById
  } from '../services/ApiService';
  import {
    getCache,
    setCache
  } from '../services/CacheService';
  
const ALL_KEY = 'products_all';
const ONE_KEY  = id => `product_${id}`;

export async function getAllProducts() {
  const cached = getCache(ALL_KEY);
  if (cached) return cached;

  const products = await fetchProducts();
  setCache(ALL_KEY, products);
  return products;
}

export async function getProduct(id) {
  const key = ONE_KEY(id);
  const cached = getCache(key);
  if (cached) return cached;

  const product = await fetchProductById(id);
  setCache(key, product);
  return product;
}