const API_URL = "http://localhost:5000";

export async function getPizzas() {
  const res = await fetch(`${API_URL}/api/pizzas`);

  if (!res.ok) {
    throw new Error("Error al obtener las pizzas");
  }

  const data = await res.json();
  return data;
}