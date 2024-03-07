import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Menu from "../components/Admin/Menu";
import Users from "../components/Admin/Users";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [formData, setFormData] = useState({});

  const handleShowMenuModal = () => {
    setShowMenuModal(true);
  };

  const handleCloseMenuModal = () => {
    setShowMenuModal(false);
  };

  const handleShowUsersModal = () => {
    setShowUsersModal(true);
  };

  const handleCloseUsersModal = () => {
    setShowUsersModal(false);
  };

  const navigateProducts = useNavigate()

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4} className="text-center">
            <Button variant="link" onClick={() => navigateProducts("./adminv2")} className="m-2">
              <img src="https://i.postimg.cc/HjDxQTbj/menu.png" alt="Menu" className="img-fluid" style={{ maxWidth: "100%" , filter: "invert(100%)" }} />
            </Button>
          </Col>
          <Col xs={12} md={6} lg={4} className="text-center">
            <Button variant="link" onClick={handleShowUsersModal} className="m-2">
              <img src="https://i.postimg.cc/7YmMMcfX/user.png" alt="User" className="img-fluid" style={{ maxWidth: "100%" , filter: "invert(100%)" }} />
            </Button>
          </Col>
        </Row>
      </Container>

      <Menu show={showMenuModal} handleCloseModal={handleCloseMenuModal} />
      <Users show={showUsersModal} handleCloseModal={handleCloseUsersModal} />
    </>
  );
};

export default Admin;
