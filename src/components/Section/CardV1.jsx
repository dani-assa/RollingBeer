import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Form, Carousel, Toast, Container } from "react-bootstrap";
import Slider from "react-slick";
import axios from "../../api/axios.js"
import '../listadoDeProductos/listado.css'
const URL_BASE = import.meta.env.VITE_URL_BASE;


const CardV1 = ({ onAddCard }) => {
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
  const handleShow = (_id) => {
    setSelectedProductId(_id);
    setBurgerOptions({
      tipo: { simple: false, doble: false, triple: false },
      extras: { Pepino: 0, Cheddar: 0, Medallon: 0, Bacon: 0, SalsaRolling: 0 },
      quitar: { cheddar: false, bacon: false },
      sinTacc: false,
      aclaraciones: "",
      cantidad: 1,
    });
  };

  const handleCheckboxChange = (category, item) => {
    if (category === "tipo") {
      const updatedOptions = Object.keys(burgerOptions.tipo).reduce((acc, key) => {
        acc[key] = key === item;
        return acc;
      }, {});
      setBurgerOptions(prevState => ({
        ...prevState,
        tipo: updatedOptions
      }));

      if (Object.values(updatedOptions).filter(value => value).length > 1) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
    } else {
      if (category === "quitar" && (item === "bacon" || item === "cheddar")) {
        if (!burgerOptions.quitar[item]) {
          setBurgerOptions(prevState => ({
            ...prevState,
            extras: {
              ...prevState.extras,
              [item.charAt(0).toUpperCase() + item.slice(1)]: 0
            },
            [category]: {
              ...prevState[category],
              [item]: !prevState[category][item]
            }
          }));
        } else {
          setBurgerOptions(prevState => ({
            ...prevState,
            [category]: {
              ...prevState[category],
              [item]: !prevState[category][item]
            }
          }));
        }
      } else {
        setBurgerOptions(prevState => ({
          ...prevState,
          [category]: {
            ...prevState[category],
            [item]: !prevState[category][item]
          }
        }));
      }
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
      [category]: { ...prevState[category], [item]: prevState[category][item] + 1 },
    }));
  };

  const handleDecrement = (category, item) => {
    if (burgerOptions[category][item] > 0) {
      setBurgerOptions((prevState) => ({
        ...prevState,
        [category]: { ...prevState[category], [item]: prevState[category][item] - 1 },
      }));
    }
  };

  const handleAclaracionesChange = (event) => {
    setBurgerOptions((prevState) => ({
      ...prevState,
      aclaraciones: event.target.value,
    }));
  };

  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    let timeout;
    if (showToast) {
      timeout = setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [showToast]);

  const handleAddCard = () => {
    const selectedTipo = Object.values(burgerOptions.tipo).some(option => option === true);
    if (!selectedTipo) {
      setShowToast(true);
      return;
    }

    onAddCard(burgerOptions);
    handleClose();
  };


  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  const RenderOptions = ({ category, item, handleIncrement, handleDecrement, burgerOptions }) => (
    <div className="d-flex justify-content-between align-items-center my-2">
      <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
      <div>
        <Button size="sm" onClick={() => handleDecrement(category, item)}>-</Button>
        <span className="mx-2">{burgerOptions[category][item]}</span>
        <Button size="sm" onClick={() => handleIncrement(category, item)}>+</Button>
      </div>
    </div>
  );

  const selectedProduct = products.find((product) => product._id === selectedProductId);

  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
          {products.map((product, i) => (
            product.visible && (
              <div key={product._id} className="mx-3 card-1">
                <Card key={i} onClick={() => handleShow(product._id)} className="text-white card-1" >
                  <Card.Img variant="top" src={product.image || ""} className="card-img" />
                  <div className="titulo">
                    <Card.Title className="text-center">{product.name}</Card.Title>
                    <div className="card-footer">
                      <small>${product.price}</small>
                    </div>
                  </div>
                </Card>
              </div>
            )
          ))}
        </Slider>
      </div>

      {selectedProduct && (
        <Modal show={!!selectedProductId} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton className="modal1">
            <Modal.Title>Personaliza tu pedido - {selectedProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal1">
            <Toast show={showToast} onClose={() => setShowToast(false)} bg="danger" text="white">
              <Toast.Header>
                <strong className="mr-auto">Mensaje</strong>
              </Toast.Header>
              <Toast.Body>Por favor selecciona al menos una opción (simple, doble o triple) antes de agregar al carrito.</Toast.Body>
            </Toast>

            <h5>Opciones</h5>
            {Object.keys(burgerOptions.tipo).map((item) => (
              <div className="d-flex justify-content-between" key={item}>
                <label htmlFor={`tipo-${item}`} className="form-check-label">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </label>
                <Form.Check
                  type="checkbox"
                  id={`tipo-${item}`}
                  checked={burgerOptions.tipo[item]}
                  onChange={() => handleCheckboxChange("tipo", item)}
                  className="ms-auto"
                />
              </div>
            ))}

            <h5>Extras</h5>
            {Object.keys(burgerOptions.extras).map((item) => (
              <RenderOptions
                key={item}
                category="extras"
                item={item}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                burgerOptions={burgerOptions}
              />
            ))}

            <h5>Quitar</h5>
            {Object.keys(burgerOptions.quitar).map((item) => (
              <div className="d-flex justify-content-between align-items-center mb-2" key={item}>
                <label htmlFor={`check-${item}`} className="mb-0">{`Sin ${item}`}</label>
                <Form.Check
                  type="checkbox"
                  id={`check-${item}`}
                  checked={burgerOptions.quitar[item]}
                  onChange={() => {
                    handleCheckboxChange("quitar", item);
                  }}
                  className="ms-auto"
                />
              </div>
            ))}

            <h5>Celiacos</h5>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label htmlFor="sinTacc" className="mb-0">Sin TACC</label>
              <Form.Check
                type="checkbox"
                id="sinTacc"
                checked={burgerOptions.sinTacc}
                onChange={() => handleCheckboxChange("sinTacc", "sinTacc")}
                className="ms-auto"
              />
            </div>

            <h5>Aclaraciones</h5>
            <Form.Control
              as="textarea"
              rows={3}
              value={burgerOptions.aclaraciones}
              onChange={handleAclaracionesChange}
              className="aclaraciones"
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
          <Modal.Footer className="modal1">
            <Button variant="primary" onClick={handleAddCard}>
              Agregar al carrito
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default CardV1;
