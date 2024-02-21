import React from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Button,
  Image,
} from "react-bootstrap";
import Admin from "../../pages/Admin";
import {
  imgLogo,
  colorLogo,
  bgColorLogo,
  linkNav,
  btnNav,
  bgNav,
  navbarToggler
} from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext";

const NavbarV1 = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className={bgNav}>
      <Container fluid>
        <Navbar.Brand className={bgColorLogo}>
          <Link to="/" className="text-decoration-none">
            <Image
              className={imgLogo}
              src="https://i.ibb.co/QJ7DRyp/Logo-Rolling-Beer.png"
            />
            <span className={colorLogo}> Rolling Beer</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"
        className={navbarToggler} />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="me-auto">
            <Button
              size="sm"
              onClick={() => navigate("/history")}
              className={btnNav}
            >
              Historia
            </Button>

            {/* <Nav>
            <Admin />
          </Nav> */}
            {user ? (
              <>
                <li className="nav-item mt-2 ms-lg-5">
                  <b className="mb-3">Bienvenid@ {user.name}</b>
                </li>
                <li className="nav-item">
                  <Button
                    variant="info"
                    size="sm"
                    className="mt-1 ms-lg-3 text-ligth fw-semibold"
                    onClick={cerrarSesion}
                  >
                    Cerrar sesión
                  </Button>
                </li>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  onClick={() => navigate("/login")}
                  className={btnNav}
                >
                  Iniciar sesión
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate("/register")}
                  className={btnNav}
                >
                  Registrate
                </Button>
              </>
            )}
            {user?.role === "admin" ? (
              <li className="nav-item">
                <Button
                  variant="dark"
                  size="sm"
                  className="mt-1 ms-3 text-ligth fw-semibold"
                  onClick={() => navigate("/admin")}
                >
                  Panel Admin
                </Button>
              </li>
            ) : (
              ""
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarV1;
