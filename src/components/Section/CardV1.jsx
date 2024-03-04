import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";

const CardV1 = ({ onAddCard, onCloseModal }) => {
  const [show, setShow] = useState(false);
  const [burgerOptions, setBurgerOptions] = useState({
    tipo: { simple: false, doble: false, triple: false },
    extras: { pepino: 0, cheddar: 0, medallon: 0, bacon: 0, salsaRolling: 0 },
    quitar: { cheddar: false, bacon: false },
    sinTacc: false,
    aclaraciones: "",
    cantidad: 1,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCheckboxChange = (category, item) => {
    
    if (category === "tipo") {
      setBurgerOptions((prevState) => ({
        ...prevState,
        tipo: {
          simple: false,
          doble: false,
          triple: false,
          [item]: !prevState.tipo[item],
        },
      }));
    } else {
      setBurgerOptions((prevState) => ({
        ...prevState,
        [category]: {
          ...prevState[category],
          [item]: !prevState[category][item],
        },
      }));
    }
  };

  const handleCantidadChange = (change) => {
    setBurgerOptions((prevState) => ({
      ...prevState,
      cantidad: Math.max(1, prevState.cantidad + change),
    }));
  };

  const handleIncrement = (category, item) => {
    setBurgerOptions((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [item]: prevState[category][item] + 1,
      },
    }));
  };

  const handleDecrement = (category, item) => {
    if (burgerOptions[category][item] > 0) {
      setBurgerOptions((prevState) => ({
        ...prevState,
        [category]: {
          ...prevState[category],
          [item]: prevState[category][item] - 1,
        },
      }));
    }
  };

  const handleAclaracionesChange = (event) => {
    setBurgerOptions((prevState) => ({
      ...prevState,
      aclaraciones: event.target.value,
    }));
  };

  const RenderOptions = ({ category, item }) => (
    <div className="d-flex justify-content-between align-items-center my-2">
      <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
      <div>
        <Button size="sm" onClick={() => handleDecrement(category, item)}>
          -
        </Button>
        <span className="mx-2">{burgerOptions[category][item]}</span>
        <Button size="sm" onClick={() => handleIncrement(category, item)}>
          +
        </Button>
      </div>
    </div>
  );
  const handleAddCard = () => {
    onAddCard(burgerOptions);
    handleClose();
  };

  return (
    <>
      <Card onClick={handleShow} style={{ cursor: "pointer", width: "18rem" }}>
        <Card.Img variant="top" src="src\assets\hamburguesa.PNG" />
        <Card.Body>
          <Card.Title>Nombre de la hamburguesa</Card.Title>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Personaliza tu hamburguesa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Opciones</h5>
          {Object.keys(burgerOptions.tipo).map((item) => (
            <Form.Check
              key={item}
              type="checkbox"
              label={item.charAt(0).toUpperCase() + item.slice(1)}
              name="tipo"
              id={`tipo-${item}`}
              checked={burgerOptions.tipo[item]}
              onChange={() => handleCheckboxChange("tipo", item)}
            />
          ))}

          <h5>Extras</h5>
          {Object.keys(burgerOptions.extras).map((item) => (
            <RenderOptions key={item} category="extras" item={item} />
          ))}

          <h5>Quitar</h5>
          {Object.keys(burgerOptions.quitar).map((item) => (
            <Form.Check
              type="checkbox"
              id={`check-${item}`}
              label={`Sin ${item}`}
              checked={burgerOptions.quitar[item]}
              onChange={() => handleCheckboxChange("quitar", item)}
              key={item}
            />
          ))}

          <h5>Celiacos</h5>
          <Form.Check
            type="checkbox"
            id="sinTacc"
            label="Sin TACC"
            checked={burgerOptions.sinTacc}
            onChange={() => handleCheckboxChange("sinTacc", "sinTacc")}
          />

          <h5>Aclaraciones</h5>
          <Form.Control
            as="textarea"
            rows={3}
            value={burgerOptions.aclaraciones}
            onChange={handleAclaracionesChange}
          />
          <h5>Cantidad</h5>
          <div className="d-flex justify-content-center align-items-center">
            <Button
              className="mx-3"
              variant="outline-secondary"
              onClick={() => handleCantidadChange(-1)}
            >
              -
            </Button>
            <span>{burgerOptions.cantidad}</span>
            <Button
              className="mx-3"
              variant="outline-secondary"
              onClick={() => handleCantidadChange(1)}
            >
              +
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddCard}>
            Agregar al carrito
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CardV1;
