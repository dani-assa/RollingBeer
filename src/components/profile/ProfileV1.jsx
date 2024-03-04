import React, { useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useAuth } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import LoginV1 from "../login/LoginV1";
import "./profileV1.css";
import ModalEditUser from "./ModalEditUser";

const ProfileV1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [changeFlag, setChangeFlag] = useState(false);

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
                <Card className="mt-4 mb-5 fondoProfile list-unstyled">
                  <Card.Body>
                    <Card.Title>Nombre: {user.name}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <li className="ps-3">
                      <span className="fw-bold">Nombre de usuario: </span>
                      {user.userName}
                    </li>
                    <li className="ps-3">
                      <span className="fw-bold">Correo: </span>
                      {user.email}
                    </li>
                  </ListGroup>
                  <ModalEditUser />
                </Card>
              </Col>
            </Row>
          </Container>
          <Button className="ms-3" onClick={cerrarSesion}>
            Cerrar sesion
          </Button>
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
