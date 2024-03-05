import React, { useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import '../listadoDeProductos/listado.css'
import CardV1 from '../Section/CardV1'
import CardV2 from './CardV2'

const ListadoDeProdV1 = () => {
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)
  const [cartItems, setCartItems] = useState([]);
  
  const handleAddCard = (burgerOptions) => {
    setCartItems([...cartItems, burgerOptions])
  }

  const handleAddToCart = (product) => {
    const index = cartItems.findIndex((item) => item.nombre === product.nombre);
    if (index === -1) {
      setCartItems([...cartItems, product]);
    } else {
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
        {/*
        <div className="d-flex flex-column justify-content-center align-items-center vh-100" id="img1">
          <img src="src/assets/logoRollingBer2.-removebg-preview.png" alt="logo_RollingBeer" id='logo1' />
          <h1 className='letra1' >Nuestras cervezas</h1>
  </div>*/}
        <h1 className='text-center pt-4'>¡Descubre Nuestro Delicioso Menú!</h1>
        <Button id='boton1' onClick={handleShow}>🛒Ver mi pedido</Button>
        <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tu pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {cartItems.map((item, index) => (
              <div key={index}>
                <p>Producto: {product.name}</p>
                <p>Opciones: 
                  {Object.keys(item.tipo).length > 0 ? (
                  <ul>
                    {Object.keys(item.tipo).map((tipo, index) => (
                      <li key={index}>{tipo}: </li>
                    ))}
                  </ul>
                ) : (
                  <span>Sin extras</span>
                )} </p>
                {Object.keys(item.extras).length > 0 ? (
                <>
                <p>Extras:</p>
                  <ul>
                    {Object.keys(item.extras).map((extra, index) => (
                      <li key={index}>{extra}: {item.extras[extra]}</li>
                    ))}
                  </ul>

                </>
                ) : (
                  <span>Sin extras</span>
                )}
                <p>Cantidad: {item.cantidad}</p>
              </div>
            ))}
        </Modal.Body>
          <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
        <Col>
        <h2 className='pt-4 text-center'>Productos destacados</h2>
          <CardV1 onAddCard={handleAddCard} onCloseModal={handleClose} />
        </Col>
        <div>
        <h2 className='pt-4 text-center'>Productos</h2>
        <CardV2 />
        </div>


        


      </Row>
    </Container>
  )
}

export default ListadoDeProdV1