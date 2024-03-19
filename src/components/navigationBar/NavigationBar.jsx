import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const NavigationBar = () => {
  return (
    <Container fluid className="navigationBar">
      <Link to="./informacion">
        <InfoIcon fontSize="large" />
      </Link>
      <Link to="./contacto">
        <CallIcon fontSize="large" />
      </Link>
      <Link to="./" className="fondoIconoHome">
        <svg
          className="iconoHome"
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          fill="currentColor"
          // class="bi bi-house-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
          <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
        </svg>
      </Link>
      <Link to="./listado">
        <RestaurantIcon fontSize="large" />
      </Link>
      <Link to="./profile">
        <PersonIcon fontSize="large" />
      </Link>
    </Container>
  );
};

export default NavigationBar;
