const API_BASE = "https://pizzeria-api-zfys.onrender.com";
const API_URL = `${API_BASE}/api/pizzas`;

export const getPizzas = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error(`Error al cargar pizzas (HTTP ${res.status})`);
  }

  return res.json();
};

export const getPizzaById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    throw new Error(`Pizza no encontrada (HTTP ${res.status})`);
  }

  return res.json();
};
