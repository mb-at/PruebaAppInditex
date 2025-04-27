import { addToCart as apiAddToCart } from '../services/ApiService';
const CART_COUNT_KEY = 'cart_count';

export async function addToCart({ id, colorCode, storageCode }) {

  const res = await apiAddToCart({ id, colorCode, storageCode });
  // 2) Recupera el anterior contador
  const prev = Number(localStorage.getItem(CART_COUNT_KEY)) || 0;

  // 3) Decide el nuevo contador:
  //    - Si la API te devolvió un count mayor al anterior
  //    - En caso contrario (p.ej. siempre 1), incremento manualmente
  const count = (typeof res.count === 'number' && res.count > prev)
    ? res.count
    : prev + 1;

  // 4) Guarda en localStorage y dispara el evento
  localStorage.setItem(CART_COUNT_KEY, count);
  window.dispatchEvent(new CustomEvent('cartChanged', { detail: { count } }));

  return { count };
}

export function getCartCount() {
  return Number(localStorage.getItem(CART_COUNT_KEY)) || 0;
}
