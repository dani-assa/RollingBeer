import React, { useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import '../listadoDeProductos/listado.css';
import CardV1 from '../Section/CardV1';
import CardV2 from './CardV2';

const ListadoDeProdV1 = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [cartItems, setCartItems] = useState([]);
  const [quitar, setQuitar] = useState({ cheddar: false, bacon: false });

  const handleAddCard = (burgerOptions) => {
    const { tipo, sinTacc, ...rest } = burgerOptions;
    const tipoString = Array.isArray(tipo) ? tipo.join(', ') : tipo;
    const sinTaccString = sinTacc ? "Sin TACC" : "";
    const totalCantidad = burgerOptions.cantidad;
    setCartItems([...cartItems, { ...rest, tipo: tipoString, sinTACC: sinTaccString, totalCantidad }]);
  }

  const handleQuitarChange = (item) => {
    setQuitar((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const handleCloseForm = () => {
    setShowEditForm(false);
  }




  return (
    <Container fluid>
      <Row>
        <h1 className='text-center pt-4'>¡Descubre Nuestro Delicioso Menú!</h1>
        <Button id='boton1' onClick={handleShow} >🛒Ver mi pedido</Button>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tu pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Modal.Body>
              {cartItems.length === 0 ? (
                <p className='text-center'>No se ha realizado ningún pedido</p>
              ) : (
                cartItems.map((item, index) => (
                  <div key={index}>
                    <h5 className='text-center'>Producto: {item.name}</h5>
                    {Object.keys(item.tipo).length > 0 ? (
                      <>
                        <p>Opción: {Object.keys(item.tipo).find(key => item.tipo[key]) || 'Ninguna'}</p>
                      </>
                    ) : (
                      <span>No seleccionó ninguna opción</span>
                    )}


                    {Object.keys(item.extras).length > 0 && Object.values(item.extras).some(count => count > 0) && (
                      <>
                        <p>Extras seleccionados:</p>
                        <ul>
                          {Object.keys(item.extras).map((extra, index) => (
                            item.extras[extra] > 0 && (
                              <li key={index}>{extra}: {item.extras[extra]}</li>
                            )
                          ))}
                        </ul>
                        <p>Total de extras seleccionados: {Object.values(item.extras).reduce((total, count) => total + count, 0)}</p>
                      </>
                    )}


                    {item.sinTACC && <p>{item.sinTACC}</p>}
                    {Object.entries(item.quitar).map(([ingrediente, seleccionado]) => (
                      seleccionado && <p key={ingrediente}>{`Quitar: ${ingrediente}`}</p>
                    ))}

                    {item.aclaraciones && (
                      <p>Aclaraciones: {item.aclaraciones}</p>
                      )}
                      <p>Cantidad: {item.cantidad}</p>
                      <p>Precio: ${item.price}</p>
                  </div>
                ))
              )}
            </Modal.Body>
          </Modal.Body>
          <h6>Total de productos seleccionados: </h6>
          <Modal.Footer>
            {cartItems.length > 0 && (<Button variant="warning text-ligth"> Confirmar pedido </Button>)}
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
        <Col>
          <h2 className='pt-4 text-center'>Productos destacados</h2>
          <CardV1
            onAddCard={handleAddCard}
            quitar={quitar}
            setQuitar={handleQuitarChange}
            onCloseModal={handleClose}
          />
        </Col>
        <div>
          <h2 className='pt-4 text-center'>Productos</h2>
          <CardV2 />
        </div>








      </Row >
    </Container >
  )
}


export default ListadoDeProdV1