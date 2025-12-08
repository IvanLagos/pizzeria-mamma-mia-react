import React, { useEffect, useState } from "react";
import HeaderComponent from "../components/header/HeaderComponent";
import CardPizza from "../components/card/CardPizzaComponent";
import { Container, Row, Col } from "react-bootstrap";
import { getPizzas } from "../../services/api";

const HomePage = ({ onAddToCart }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const data = await getPizzas();
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

export default HomePage;
