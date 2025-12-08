const API_URL = "https://pizzeria-api-zfys.onrender.com";

export async function getPizzas() {
  try {
    const res = await fetch(`${API_URL}/api/pizzas`);

    if (!res.ok) {
      throw new Error("Error al obtener las pizzas");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error en getPizzas:", error);
    throw error;
  }
}
