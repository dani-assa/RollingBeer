import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

const NavigationBar = () => {
  return (
    <Container fluid className="navigationBar">
      <Link to="./" >
        <SettingsIcon fontSize="large" baseClassName="icono"/>
      </Link>
      <Link to="./">
        <HomeIcon fontSize="large"/>
      </Link>
      <Link to="./login">
        <PersonIcon fontSize="large"/>
      </Link>
    </Container>
  );
};

export default NavigationBar;
