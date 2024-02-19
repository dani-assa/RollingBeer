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
  bgNav
} from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";

const NavbarV1 = () => {
  const navigate = useNavigate();
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
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Button
              size="sm"
              onClick={() => navigate("/history")}
              className={btnNav}
            >
              Historia
            </Button>
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
          </Nav>
          {/* <Nav>
            <Admin />
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarV1;
