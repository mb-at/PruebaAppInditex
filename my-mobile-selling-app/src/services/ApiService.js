const BASE_URL = 'https://itx-frontend-test.onrender.com';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) throw new Error(`API error ${res.status} at ${path}`);
  return res.json();
}

export function fetchProducts() {
  return request('/api/product');
}

export function fetchProductById(id) {
  return request(`/api/product/${id}`);
}

export function addToCart({ id, colorCode, storageCode }) {
  return request('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, colorCode, storageCode }),
  });
}