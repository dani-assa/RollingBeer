import React from "react";
import { NavDropdown } from "react-bootstrap";
import Users from "../components/Admin/Users";
import Menu from "../components/Admin/Menu";
import Orders from "../components/Admin/Orders";

const Admin = () => {
  return (
    <NavDropdown title="Administracion">
      <NavDropdown.Item href="#usuarios"><Users/></NavDropdown.Item>
      <NavDropdown.Item href="#menu"><Menu/></NavDropdown.Item>
      <NavDropdown.Item href="#ver-pedidos"><Orders/>Pedidos</NavDropdown.Item>
    </NavDropdown>
  );
};

export default Admin;