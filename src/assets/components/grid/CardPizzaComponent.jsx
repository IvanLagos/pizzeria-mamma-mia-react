import React from 'react'
import PropTypes from "prop-types";
import { Card, Button, Badge } from "react-bootstrap";

const formatCLP = (n) => n.toLocaleString("es-CL");

const CardPizzaComponent = ({ name, price, ingredients, img }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={img} alt={name} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-2">{name}</Card.Title>

        <hr className='mb-2' style={{ margin: "2px 0" }} />

        <Card.Text className="mb-2">
          Ingredientes:
        </Card.Text>

        <div className="mb-1" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {ingredients.map((ing, i) => (  
            <Badge key={i} bg="secondary">{ing}</Badge>
          ))}
        </div>

        <Card.Text className="mt-auto">
          <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>
            Precio: ${formatCLP(price)}
          </span>
        </Card.Text>

        <div className="d-flex gap-2">
          <Button variant="outline-dark">Ver más</Button>
          <Button className='ms-auto' variant="dark">Añadir</Button>
        </div>
      </Card.Body>
    </Card>
  )
}

CardPizzaComponent.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
}

export default CardPizzaComponent