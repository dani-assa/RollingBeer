import React from "react";
import { useAuth } from "../../context/UserContext";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { alertAdd } from "../../utils/alertCustom/alertCustom";
import "./cardProduct.css"

const CardProduct = ({ data }) => {
  const { addToCart } = useAuth();

  const handleAddToCart = (product) => {
    addToCart(product);
    alertAdd("top-end", "success", "Su pedido fue agregado al carrito");
  };

  return (
    <Container>
      <Row>
        {(data ? data : products).map((product, i) => 
          product.visible && (
            <Col key={product._id} xs={12} sm={6} md={6} lg={4} xl={3}>
              <Card className="cardProduct mb-4 ">
                <Card.Img className="imgCard" variant="top" src={product.image} alt={product.image} />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <div className="d-flex flex-column">
                    <Card.Title className="text-end">$ {product.price}</Card.Title>
                    <Button
                      className="btnAddCart"
                      variant="primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Agregar al carrito
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )
        )}
      </Row>
    </Container>
  );
};

export default CardProduct;
