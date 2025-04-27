const DEFAULT_TTL = 1000 * 60 * 60; // 1 hora en ms

export function setCache(key, data, ttl = DEFAULT_TTL) {
  const record = { timestamp: Date.now(), ttl, data };
  localStorage.setItem(key, JSON.stringify(record));
}

export function getCache(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    const { timestamp, ttl, data } = JSON.parse(raw);
    if (Date.now() - timestamp > ttl) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}