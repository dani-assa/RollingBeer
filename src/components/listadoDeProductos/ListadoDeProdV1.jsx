import React, { useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import '../listadoDeProductos/listado.css'
import CardV1 from '../Section/CardV1'





const ListadoDeProdV1 = () => {
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)
  const [burgerOrder, setBurgerOrder] = useState({});
  const [cartItems, setCartItems] = useState([]);
  
  const handleAddCard = (burgerOptions) => {
    setCartItems([...cartItems, burgerOptions])
  }

  const handleAddToCart = (product) => {
    const index = cartItems.findIndex((item) => item.nombre === product.nombre);
    if (index === -1) {
      // Si el producto no existe en el carrito, agregarlo
      setCartItems([...cartItems, product]);
    } else {
      // Si el producto ya existe en el carrito, actualizar la cantidad
      setCartItems(
        cartItems.map((item) =>
          item.nombre === product.nombre
            ? { ...item, cantidad: product.cantidad }
            : item
        )
      );
    }
  };


  return (
    <Container fluid>
      <Row>
        <div className="d-flex flex-column justify-content-center align-items-center vh-100" id="img1">
          <img src="src/assets/logoRollingBer2.-removebg-preview.png" alt="logo_RollingBeer" id='logo1' />
          <h1 className='letra1' >Nuestras cervezas</h1>
        </div>
        <h1 className='text-center pt-4'>Nuestras ofertas pensadas para vos</h1>
        <Button id='boton1' onClick={handleShow}>🛒Ver mi pedido</Button>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tu pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {cartItems.map((item, index) => (
              <p key={index}>

                <p>Producto: {item.nombre}</p>
                <p>Extras:
                  {item.extras.length > 0 ? (
                    <ul>
                      {item.extras.map((extra, index) => (
                        <li key={index}>{extra}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>Sin extras</span>
                  )}
                </p>
                <p>Cantidad: {item.cantidad}</p>

              </p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
        <Col>

          <CardV1 onAddCard={handleAddCard} onCloseModal={handleClose} />
        </Col>
        <Col>

          <CardV1 onAddCard={handleAddToCart} onCloseModal={handleClose} />
        </Col>



















      </Row>
    </Container>
  )
}

export default ListadoDeProdV1