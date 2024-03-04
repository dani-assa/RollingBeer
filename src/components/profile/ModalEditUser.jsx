import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAuth } from "../../context/UserContext";
const URL_BASE = import.meta.env.VITE_URL_BASE;

const ModalEditUser = ({ setIsLoading, setChangeFlag }) => {
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
    }
  };

  return (
    <>
      <Button
        variant="success"
        size="sm"
        className="mx-2"
        onClick={() => handleEdit(user)}
      >
        Editar
      </Button>
      <Modal show={showModalEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
