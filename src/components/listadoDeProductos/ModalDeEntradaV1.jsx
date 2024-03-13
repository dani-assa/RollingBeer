import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const ModalDeEntradaV1 = ({ onSubmit }) => {
  const [showModal, setShowModal] = useState(true);
  const [mesa, setMesa] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => {
    const newValue = event.target.value.replace(/\D/g, ''); 
    if (newValue !== '') { 
      setMesa(newValue);
      setShowAlert(false);
    } else {
      setShowAlert(true); 
    }
  };

  const handleSubmit = () => {
    if (parseInt(mesa) > 0 && parseInt(mesa) <= 50) {
      onSubmit(mesa);
      setShowModal(false);
    } else {
      setShowAlert(true); 
    }
  };

  return (
    <Modal show={showModal} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Ingrese el número de mesa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formMesa">
          <Form.Control
            type="text"
            placeholder="Número de mesa"
            value={mesa}
            onChange={handleChange}
          />
        </Form.Group>
        {showAlert && (
          <Alert variant="danger">
            {parseInt(mesa) <= 0 ? 'Por favor ingrese un número de mesa válido.' : 'No tenemos esa cantidad de mesas. Por favor, ingresa un número de mesa válido.'}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeEntradaV1;
