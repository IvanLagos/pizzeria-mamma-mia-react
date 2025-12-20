import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Badge,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { getPizzaById } from "../../services/api";
import { formatCLP } from "../utils/formatCLP";
import { capitalize } from "../utils/capitalize";
import { useUser } from "../../contexts/UserContext";

const Pizza = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useUser();

  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPizza = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getPizzaById(id);
        setPizza(data);
      } catch (err) {
        setError(err?.message || "Error al cargar la pizza");
      } finally {
        setLoading(false);
      }
    };

    loadPizza();
  }, [id]);

  const handleAdd = () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (typeof onAddToCart === "function") {
      onAddToCart(pizza);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!pizza) return null;

  return (
    <Container className="mt-5 mb-5">
      <Row className="g-4">
        <Col md={6}>
          <img
            src={pizza.img}
            alt={pizza.name}
            className="img-fluid rounded"
            style={{ width: "100%", objectFit: "cover" }}
          />
        </Col>

        <Col md={6}>

          <h2 className="fw-bold mb-3">{capitalize(pizza.name)}</h2>

          <p className="text-muted">{pizza.desc}</p>

          <div className="mb-3">
            <div className="fw-semibold mb-2">Ingredientes:</div>

            <div className="d-flex flex-wrap gap-2">
              {(pizza.ingredients || []).map((ing, i) => (
                <Badge
                  key={`${ing}-${i}`}
                  pill
                  bg="secondary"
                  className="fw-normal"
                  style={{ textTransform: "lowercase" }}
                >
                  {ing}
                </Badge>
              ))}
            </div>
          </div>

          <h4 className="fw-bold mb-4">
            Precio: {formatCLP(pizza.price)}
          </h4>

          <div className="d-flex gap-3">
            <Button variant="dark" onClick={handleAdd}>
              Añadir al carrito
            </Button>

            <Button
              variant="outline-secondary"
              onClick={() => navigate("/")}
            >
              ← Volver a la tienda
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Pizza;
