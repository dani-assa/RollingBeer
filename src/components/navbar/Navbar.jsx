import React from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import Admin from "../../pages/Admin";

const NavbarV1 = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Rolling Beer</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Acerca de</Nav.Link>
            <Nav.Link href="#pricing">Menu</Nav.Link>
          </Nav>
          <Nav>
            <Admin/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarV1;
