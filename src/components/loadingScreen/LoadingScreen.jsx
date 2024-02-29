import React from "react";
import { Container, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const LoadingScreen = () => {
  return (
    <Container>
      <Row className="justify-content-center aling-items-center">
        <Spinner animation="border" variant="info" />
      </Row>
    </Container>
  );
};

export default LoadingScreen;
