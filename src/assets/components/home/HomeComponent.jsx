import React from 'react';
import HeaderComponent from '../header/HeaderComponent';
import CardPizza from "../card/CardPizzaComponent";
import { pizzas } from "../../data/pizzas.js";
import { Container, Row, Col } from "react-bootstrap";

const HomeComponent = ({ onAddToCart }) => {
  return (
    <>
      <HeaderComponent/>
      <Container className="py-4">
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
      </Container>
    </>
  );
};

export default HomeComponent;
