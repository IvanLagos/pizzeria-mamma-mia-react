import { useEffect, useState } from "react";
import HeaderComponent from "../components/header/HeaderComponent";
import CardPizza from "../components/card/CardPizzaComponent";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { getPizzas } from "../../services/api";

const HomePage = ({ onAddToCart }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getPizzas();

        // ✅ Soporta ambos formatos: array directo o { pizzas: [] }
        const list = Array.isArray(data) ? data : data?.pizzas || [];
        setPizzas(list);
      } catch (err) {
        setError(err?.message || "Error al cargar pizzas");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <>
      <HeaderComponent />

      <Container className="mt-4 mb-5">
        {loading && (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" role="status" />
          </div>
        )}

        {!loading && error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <Row className="g-4">
            {pizzas.map((pizza) => (
              <Col key={pizza.id} xs={12} sm={6} lg={4}>
                <CardPizza pizza={pizza} onAddToCart={onAddToCart} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default HomePage;
