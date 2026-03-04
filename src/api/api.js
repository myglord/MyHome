const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed: ${res.status}`);
  return data;
}

export const api = {
  health: () => request('/health'),
  dbCheck: () => request('/db-check'),
  getProperties: () => request('/properties'),
  getProperty: (id) => request(`/properties/${id}`),
  createProperty: (body) => request('/properties', { method: 'POST', body: JSON.stringify(body) }),
  contact: (body) => request('/contact', { method: 'POST', body: JSON.stringify(body) }),
  register: (body) => request('/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/login', { method: 'POST', body: JSON.stringify(body) }),
  getBlog: () => request('/blog'),
  getBlogBySlug: (slug) => request(`/blog/${slug}`),
  getTestimonials: () => request('/testimonials'),
  getFavorites: (userId) => request(`/favorites/${userId}`),
  addFavorite: (userId, propertyId) => request('/favorites', { method: 'POST', body: JSON.stringify({ user_id: userId, property_id: propertyId }) }),
  removeFavorite: (userId, propertyId) => request(`/favorites/${userId}/${propertyId}`, { method: 'DELETE' }),
};
