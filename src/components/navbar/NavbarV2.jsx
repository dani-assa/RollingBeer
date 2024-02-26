import React from "react";
import {
  Button,
  Container,
  Form,
  Image,
  Nav,
  NavDropdown,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import {
  imgLogo,
  colorLogo,
  bgColorLogo,
  linkNav,
  btnNav,
  bgNav,
  navbarToggler,
  btnCerrarSesion,
} from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext";

const NavbarV2 = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const cerrarSesion = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      {["lg"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
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
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              className={navbarToggler}
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  RollingBeer
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link to="./" className="text-decoration-none">
                    Home
                  </Link>

                  <Link to="./" className="text-decoration-none">
                    About me
                  </Link>

                  <Link to="./" className="text-decoration-none">
                    Contact
                  </Link>

                  <Link to="./listado" className="text-decoration-none">
                    Listado de productos
                  </Link>

                  {user ? (
                    <>
                      <li className="nav-item mt-2 ms-lg-5">
                        <b className="mb-3 fw-semibold">
                          Bienvenid@ {user.name}
                        </b>
                      </li>
                      <li className="nav-item">
                        <Button
                          id={btnCerrarSesion}
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
                        className="mt-1 text-ligth fw-semibold"
                        onClick={() => navigate("/admin")}
                      >
                        Panel Admin
                      </Button>
                    </li>
                  ) : (
                    ""
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default NavbarV2;
