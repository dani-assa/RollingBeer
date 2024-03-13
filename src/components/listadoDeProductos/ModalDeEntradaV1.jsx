import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalDeEntradaV1 = ({ onSubmit }) => {
  const [tableNumber, setTableNumber] = useState('');

  const handleSubmit = () => {
    if (tableNumber.trim() !== '') {
      onSubmit(tableNumber);
    } else {
      // falta agregar un tope de mesas
    }
  };

  return (
    <Modal show={true} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Ingresa el número de mesa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Número de mesa:</Form.Label>
          <Form.Control
            type="text"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Enviar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeEntradaV1;
