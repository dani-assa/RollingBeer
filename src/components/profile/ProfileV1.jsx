import React from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

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
          <h3>Bienvenid@ {user.name}</h3>
          <Button onClick={cerrarSesion}>Cerrar sesion</Button>
        </>
      ) : (
        <>
          <Button
            size="sm"
            onClick={() => navigate("/login")}
            className=""
          >
            Iniciar sesión
          </Button>
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
