import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Form, CardGroup  } from "react-bootstrap";
import axios from "../../api/axios.js"
const URL_BASE = import.meta.env.VITE_URL_BASE;

const CardV2 = ({ onAddCard }) => {
  const [products, setProducts] = useState([]); 
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [burgerOptions, setBurgerOptions] = useState({
    tipo: { simple: false, doble: false, triple: false },
    extras: { Pepino: 0, Cheddar: 0, Medallon: 0, Bacon: 0, SalsaRolling: 0 },
    quitar: { cheddar: false, bacon: false },
    sinTacc: false,
    aclaraciones: "",
    cantidad: 1,
  });


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${URL_BASE}/product/getAll`);
        setProducts(response.data);
        
      } catch (error) {
        console.error('Hubo un error al cargar los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleClose = () => setSelectedProductId(null);
  const handleShow = (productId) => setSelectedProductId(productId);


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
        <Button size="sm" onClick={() => handleDecrement(category, item)}>-</Button>
        <span className="mx-2">{burgerOptions[category][item]}</span>
        <Button size="sm" onClick={() => handleIncrement(category, item)}>+</Button>
      </div>
    </div>
  );

  const handleAddCard = () => {
    onAddCard(burgerOptions);
    handleClose();
  };

  const selectedProduct = products.find(product => product.id === selectedProductId);

  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };
  
 
  const productGroups = chunkArray(products, 3);


  return (
    <>
      <CardGroup>
        {products.map((product, i) => (
          <Card className="cardv2" key={i} onClick={() => handleShow(product.id)} >
            <Card.Img  className="imgCard" variant="top" src={product.image || ""} />
            {/*<Card.Body className="cardBody">
              <Card.Title>{product.name}</Card.Title>
        </Card.Body>*/}
          </Card>
        ))}
      </CardGroup>

      {selectedProduct && (
        <Modal
          show={!!selectedProductId}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          >
          <Modal.Header closeButton>
            <Modal.Title>Personaliza tu hamburguesa - {selectedProduct.name}</Modal.Title>
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
      )}
    </>
  );
};

export default CardV2;
