const API_BASE = import.meta.env.VITE_BACKEND_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    credentials: "include",   // 🔥 REQUIRED for cookies
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
};
