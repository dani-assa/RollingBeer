import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useAuth } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import LoginV1 from "../login/LoginV1";
import "./profileUser.css";
import ModalEditUser from "./ModalEditUser";
import LoadingScreen from "../../loadingScreen/LoadingScreen";

const ProfileUser = () => {
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
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {user ? (
            <>
              <h3 className="ms-3 text-white">Bienvenid@ {user.name}</h3>
              <Container>
                <Row>
                  <Col className="cardProfile">
                    <Card className="mt-4 mb-5 fondoProfile list-unstyled text-white">
                      <Card.Body className="">
                        <Card.Title className="mt-3">
                          Nombre: {user.name}
                        </Card.Title>
                        <li className="ps-3">
                          <span className="fw-bold">Nombre de usuario: </span>
                          {user.userName}
                        </li>
                        <li className="ps-3">
                          <span className="fw-bold">Correo: </span>
                          {user.email}
                        </li>
                      </Card.Body>
                      <ModalEditUser
                        user={user}
                        setIsLoading={setIsLoading}
                        setChangeFlag={setChangeFlag}
                      />
                    </Card>
                  </Col>
                </Row>
              </Container>
              <Button
                size=""
                className="ms-3 me-3 btnCerrarSesion"
                onClick={cerrarSesion}
              >
                Cerrar sesion
              </Button>
            </>
          ) : (
            <>
              <LoginV1 />
            </>
          )}
        </>
      )}

      {user?.role === "admin" ? (
        <Button
          variant="secondary"
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

export default ProfileUser;
