import React, { useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import '../listadoDeProductos/listado.css'
import CardV2 from '../listadoDeProductos/CardV2'



const ListadoDeProdV1 = () => {
  const [count, setCount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)
  return (
    <Container fluid>
      <Row>
        <div className="d-flex flex-column justify-content-center align-items-center vh-100" id="img1">
          <img src="src/assets/logoRollingBer2.-removebg-preview.png" alt="logo_RollingBeer" id='logo1' />
          <h1 className='letra1' >Nuestras cervezas</h1>
        </div>
        <Col>
          <Button id='boton1' onClick={handleShow}>🛒Ver mi pedido</Button>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Tu pedido</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Tu pedido es {count} cervezas </p>
              <p>Tu pedido es {count} hamburguesas</p>
              <p>Tu pedido es {count} pizzas </p>
              <p>Tienes {count} promos</p>
              

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
          <div className='cardV2'>
            <CardV2 />
          </div>
          <div className='cardV2'>
            <CardV2 />
          </div>
          <div className='cardV2'>
            <CardV2 />
          </div>
        </Col>










      </Row>
    </Container>
  )
}

export default ListadoDeProdV1