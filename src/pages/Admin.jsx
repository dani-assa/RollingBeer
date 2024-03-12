import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigateProducts = useNavigate()
  const navigateUsers = useNavigate()

  return (
    <>
      <Container fluid className="justify-content-center">
        <Row className="d-flex justify-content-center">
          <Col xs={10} md={7} lg={5} className="text-center">
            <Button variant="link" onClick={() => navigateProducts("/admin/productos")} className="m-5">
              <img src="https://i.postimg.cc/HjDxQTbj/menu.png" alt="Menu" className="img-fluid" style={{ filter: "invert(100%)" }} />
            </Button>
          </Col>
          <Col xs={10} md={7} lg={5} className="text-center">
            <Button variant="link" onClick={() => navigateUsers("/admin/usuarios")} className="m-5">
              <img src="https://i.postimg.cc/7YmMMcfX/user.png" alt="User" className="img-fluid" style={{ filter: "invert(100%)" }} />
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Admin;
