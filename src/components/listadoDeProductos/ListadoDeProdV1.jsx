import React, { useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import '../listadoDeProductos/listado.css'
import CardV2 from '../listadoDeProductos/CardV2'





const ListadoDeProdV1 = () => {
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  const [pedidos, setPedidos] = useState(0)

  const guardarPedido = () =>{
    pedidos(count)
  }


  return (
    <Container fluid>
      <Row>
        <div className="d-flex flex-column justify-content-center align-items-center vh-100" id="img1">
          <img src="src/assets/logoRollingBer2.-removebg-preview.png" alt="logo_RollingBeer" id='logo1' />
          <h1 className='letra1' >Nuestras cervezas</h1>
        </div>
        <h1 className='text-center pt-4'>Nuestras ofertas pensadas para vos</h1>
        <Col>
            <div className='cardV2'>
              <CardV2 setPedidos={setPedidos} />
            </div>
            <div className='cardV2'>
              <CardV2 setPedidos={setPedidos} />
            </div>
            <div className='cardV2'>
              <CardV2 setPedidos={setPedidos} />
            </div>
          </Col>

          <Col>
            <div className='cardV2'>
              <CardV2 setPedidos={setPedidos} />
            </div>
            <div className='cardV2'>
              <CardV2 setPedidos={setPedidos} />
            </div>
            <div className='cardV2'>
              <CardV2 setPedidos={setPedidos} />
            </div>
          <Button variant="warning" className="rounded-pill" onClick={guardarPedido}>🛒</Button>


        </Col>
        <Button id='boton1' onClick={handleShow}>🛒Ver mi pedido</Button>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tu pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Tu pedido es {pedidos} cervezas </p>
            <p>Tu pedido es hamburguesas</p>
            <p>Tu pedido es pizzas </p>
            <p>Tienes  promos</p>


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>










      </Row>
    </Container>
  )
}

export default ListadoDeProdV1