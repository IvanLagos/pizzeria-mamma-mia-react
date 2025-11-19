import React, { useEffect, useState } from "react";
import HeaderComponent from "../header/HeaderComponent";
import CardPizza from "../card/CardPizzaComponent";
import { Container, Row, Col } from "react-bootstrap";

const API_URL = "http://localhost:5000/api/pizzas";

const HomeComponent = ({ onAddToCart }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error("Error al obtener las pizzas");
        }

        const data = await res.json();
        setPizzas(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar las pizzas");
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <>
      <HeaderComponent />

      <Container className="py-4">

        {loading && <p className="text-center">Cargando pizzas...</p>}

        {error && (
          <p className="text-center text-danger" style={{ fontWeight: 600 }}>
            {error}
          </p>
        )}

        {!loading && !error && (
          <Row xs={1} md={2} lg={3} className="g-4 mb-4">
            {pizzas.map((p) => (
              <Col key={p.id}>
                <CardPizza
                  name={p.name}
                  price={p.price}
                  ingredients={p.ingredients}
                  img={p.img}
                  desc={p.desc}
                  onAdd={() => onAddToCart(p)}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default HomeComponent;
