import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formatCLP } from "../../utils/formatCLP";

const CardPizzaComponent = ({
  name,
  price,
  ingredients,
  img,
  desc,
  onAdd,
  isLoggedIn,
}) => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para añadir productos al carrito");
      navigate("/login");
      return;
    }

    if (onAdd) onAdd();
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={img} alt={name} />

      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-2 text-capitalize">{name}</Card.Title>

        {desc && (
          <Card.Text className="small text-muted" style={{ lineHeight: 1.25 }}>
            {desc}
          </Card.Text>
        )}

        <hr className="mb-2" style={{ margin: "2px 0" }} />

        <Card.Text className="mb-2 fw-semibold">Ingredientes:</Card.Text>

        <div
          className="mb-2"
          style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
        >
          {ingredients.map((ing, i) => (
            <Badge key={i} bg="secondary">
              {ing}
            </Badge>
          ))}
        </div>

        <Card.Text className="mt-auto">
          <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>
            Precio: {formatCLP(price)}
          </span>
        </Card.Text>

        <div className="d-flex gap-2">
          <Button
            className="ms-auto"
            variant="dark"
            onClick={handleAddClick}
          >
            {isLoggedIn ? "Añadir" : "Inicia sesión para comprar"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

CardPizzaComponent.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
  desc: PropTypes.string,
  onAdd: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};

export default CardPizzaComponent;
