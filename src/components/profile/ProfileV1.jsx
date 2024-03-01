import React from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useAuth } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import LoginV1 from "../login/LoginV1";

const ProfileV1 = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="mt-5">
      {user ? (
        <>
          <h3 className="ms-3">Bienvenid@ {user.name}</h3>
          <Container>
            <Row>
              <Col>
                <Card className="mt-4 mb-5">
                  <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      Nombre de usuario: {user.userName}
                    </ListGroup.Item>
                    <ListGroup.Item>Correo: {user.email}</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link href="#">Editar nombre</Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <Button className="ms-3" onClick={cerrarSesion}>Cerrar sesion</Button>
        </>
      ) : (
        <>
          <LoginV1 />
        </>
      )}
      {user?.role === "admin" ? (
        <Button
          variant="dark"
          size="sm"
          className="mt-1 text-ligth fw-semibold"
          onClick={() => navigate("/admin")}
        >
          Panel Admin
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileV1;
