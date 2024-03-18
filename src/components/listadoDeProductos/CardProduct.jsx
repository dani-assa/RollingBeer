import React, { useState } from "react";
import { useAuth } from "../../context/UserContext";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { alertAdd } from "../../utils/alertCustom/alertCustom";

const CardProduct = ({ data }) => {
  const { products, addToCart } = useAuth();

  const handleAddToCart = (product) => {
    addToCart(product);
    alertAdd("top-end", "success", "Su pedido fue agregado al carrito");
  };

  return (
    <Container>
      <Row>
        {data ? (
          <>
            {data.map(
              (product, i) =>
                product.visible && (
                  <div key={product._id}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={product.image}
                        alt={product.image}
                      />
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>{product.description}</Card.Text>
                        <Card.Title>$ {product.price}</Card.Title>
                        <Button
                          variant="primary"
                          onClick={() => handleAddToCart(product)}
                        >
                          Agregar al carrito
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                )
            )}
          </>
        ) : (
          <Col>
            {products.map(
              (product, i) =>
                product.visible && (
                  <div key={product._id}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={product.image}
                        alt={product.image}
                      />
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>{product.description}</Card.Text>
                        <Card.Title>$ {product.price}</Card.Title>
                        <Button
                          variant="primary"
                          onClick={() => handleAddToCart(product)}
                        >
                          Agregar al carrito
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                )
            )}
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CardProduct;
