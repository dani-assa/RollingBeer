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
    const { tipo, sinTacc, ...rest } = burgerOptions;
    const tipoString = Array.isArray(tipo) ? tipo.join(', ') : tipo;
    const sinTaccString = sinTacc ? "Sin TACC" : "";
    const totalCantidad = burgerOptions.cantidad;
    setCartItems([...cartItems, { ...rest, tipo: tipoString, sinTACC: sinTaccString, totalCantidad }]);
  }

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
                    <p className='text-center'>Producto: {item.name}</p>
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
                    <p>Cantidad: {item.cantidad}</p>
                    {item.aclaraciones && (
                      <p>Aclaraciones: {item.aclaraciones}</p>
                    )}


                    {/*<Button onClick={handleShowEditform}>Editar pedido</Button>
                      <Modal> 
                        <Modal.Body>
                        <label>
                          Cantidad:
                          <input
                            type="number"
                            onChange={(e) => setQuantity(e.target.value)}
                            />
                        </label>
                        <label>
                          Opciones:
                          <select value={options} onChange={(e) => setOptions(e.target.value)}>
                            <option value="">Sin opciones</option>
                          </select>
                        </label>
                        <label>
                          Extras:
                          {extrasList.map((extra, index) => (
                            <div key={index}>
                              <input
                                type="text"
                                value={extras[extra] || ''}
                                onChange={(e) => {
                                  const newExtras = { ...extra };
                                  newExtras[extra] = e.target.value;
                                  setExtras(newExtras);
                                }}
                                />
                              <button type="button" onClick={() => handleRemoveExtra(index)}>
                                Eliminar extra
                              </button>
                            </div>
                          ))}
                          <button type="button" onClick={handleAddExtra}>
                            Agregar extra
                          </button>
                        </label>
                        <label>
                          Sin TACC:
                          <input
                            type="checkbox"
                            checked={tacc}
                            onChange={(e) => setTACC(e.target.checked)}
                            />
                        </label>
                        <label>
                          Aclaraciones:
                          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
                        </label>
                        <button type="submit" onClick={handleSubmit}>
                          Guardar
                              </button>
                            </Modal.Body>
                              </Modal>*/}
                  </div>
                ))
              )}
            </Modal.Body>
          </Modal.Body>
          <h6>Total de productos seleccionados: </h6>
          <Modal.Footer>
            <Button variant="warning text-ligth">
              Confirmar pedido
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
        <Col>
          <h2 className='pt-4 text-center'>Productos destacados</h2>
          <CardV1 onAddCard={handleAddCard}
            onCloseModal={handleClose} />
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