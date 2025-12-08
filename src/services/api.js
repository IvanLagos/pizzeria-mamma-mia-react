const API_BASE_URL = "https://pizzeria-api-zfys.onrender.com";

export async function getPizzas() {
  const res = await fetch(`${API_BASE_URL}/api/pizzas`);

  if (!res.ok) {
    throw new Error("Error al obtener las pizzas");
  }

  const data = await res.json();
  return data;
}
