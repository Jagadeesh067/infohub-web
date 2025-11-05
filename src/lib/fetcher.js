const BASE = import.meta.env.VITE_API_BASE || '';

export async function apiGET(path) {
  try {
    const res = await fetch(BASE + path);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }
    return await res.json();
  } catch (e) {
    throw new Error(e.message || 'Network error');
  }
}
