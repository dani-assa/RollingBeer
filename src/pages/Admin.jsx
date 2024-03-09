import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigateProducts = useNavigate()

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4} className="text-center">
            <Button variant="link" onClick={() => navigateProducts("/admin/productos")} className="m-2">
              <img src="https://i.postimg.cc/HjDxQTbj/menu.png" alt="Menu" className="img-fluid" style={{ maxWidth: "100%" , filter: "invert(100%)" }} />
            </Button>
          </Col>
          <Col xs={12} md={6} lg={4} className="text-center">
            <Button variant="link" className="m-2">
              <img src="https://i.postimg.cc/7YmMMcfX/user.png" alt="User" className="img-fluid" style={{ maxWidth: "100%" , filter: "invert(100%)" }} />
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Admin;
