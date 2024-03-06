import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAuth } from "../../context/UserContext";
const URL_BASE = import.meta.env.VITE_URL_BASE;
import "./profileV1.css"

const ModalEditUser = ({user1, setIsLoading, setChangeFlag }) => {
  const { user } = useAuth();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(user);

  const handleEdit = () => {
    setShowModalEdit(true);
  };

  const handleEditClose = () => {
    setShowModalEdit(false);
  };

  const handleSaveEdit = async () => {
    try {
      setIsLoading(true);
      await axios.patch(
        `${URL_BASE}/user/editById/${selectedUser.id}`,
        selectedUser
      );
      console.log(selectedUser);
      setChangeFlag((prev) => !prev);
    } catch (error) {
      console.log(error);
    } finally {
      handleEditClose();
      setIsLoading(false);
    }
  };

  

  return (
    <>
      <Button
        variant="success"
        size="sm"
        className="mx-2 mb-3 btnEditar"
        onClick={() => handleEdit(user)}
      >
        Editar
      </Button>
      <Modal show={showModalEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar datos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser ? selectedUser.name : ""}
                onChange={(e) => {
                  setSelectedUser({
                    ...selectedUser,
                    name: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Cerrar
          </Button>
          <Button className="btnCerrarSesion" onClick={handleSaveEdit}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
