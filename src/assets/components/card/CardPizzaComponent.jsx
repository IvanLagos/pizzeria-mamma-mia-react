import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formatCLP } from "../../utils/formatCLP";
import { useUser } from "../../../contexts/UserContext";
import { capitalize } from "../../utils/capitalize";

const CardPizzaComponent = ({ pizza, onAddToCart }) => {
  const navigate = useNavigate();
  const { token } = useUser();

  const handleAdd = () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (typeof onAddToCart === "function") {
      onAddToCart(pizza);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={pizza.img}
        alt={pizza.name}
        style={{ height: 220, objectFit: "cover" }}
      />

      <Card.Body className="d-flex flex-column">
        {/* ✅ Título en Title Case */}
        <Card.Title className="fw-bold mb-2">
          {capitalize(pizza.name)}
        </Card.Title>

        <hr />

        {/* ❌ Sin descripción */}

        <div className="mb-2">
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

        <div className="mt-auto">
          <div className="fw-bold mb-3">
            Precio: {formatCLP(pizza.price)}
          </div>

          <div className="d-flex justify-content-between gap-2">
            <Button
              variant="outline-dark"
              className="w-50"
              onClick={() => navigate(`/pizza/${pizza.id}`)}
            >
              Ver más
            </Button>

            <Button
              variant="dark"
              className="w-50"
              onClick={handleAdd}
            >
              Añadir
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardPizzaComponent;
