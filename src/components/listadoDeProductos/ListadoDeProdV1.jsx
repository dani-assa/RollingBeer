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

  const EditOrderForm = ({ item, onEditCart }) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const [extras, setExtras] = useState(item.extras || {});
    const [extrasList, setExtrasList] = useState(Object.keys(extras));
    const [options, setOptions] = useState(item.tipo || {});
    const [tacc, setTACC] = useState(item.sinTACC || false);
    const [notes, setNotes] = useState(item.aclaraciones || '');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onEditCart(item.index, {
      ...item,
      quantity,
      extras,
      options,
      sinTACC: tacc,
      aclaraciones: notes,
    });
  }

  const handleAddExtra = () => {
    setExtrasList([...extrasList, `extra${extrasList.length + 1}`]);
  };

  const handleRemoveExtra = (index) => {
    const newExtrasList = newExtrasList.filter((_, i) => i !== index);
    newExtrasList(newExtrasList);
    const newExtras = { ...extras };
    delete newExtras[newExtrasList[index]];
    setExtras(newExtras);
  };
  const [showEditForm, setShowEditForm] = useState(false)
  const handleShowEditform = () => {
    setShowEditForm(!showEditForm)
  }
  const handleEditCart = (index, updatedItem) => {
    setCartItems(prevCartItems => {
      const updatedCartItems = [...prevCartItems];
      updatedCartItems[index] = updatedItem;
      return updatedCartItems;
    });
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setShowEditForm(false);
  }


    return (
      <Container fluid>
        <Row>
          <h1 className='text-center pt-4'>¡Descubre Nuestro Delicioso Menú!</h1>
          <Button id='boton1' onClick={handleShow} {...showEditForm && <EditOrderForm
            show={showEditForm}
            onEditCart={handleEditCart}
            onCloseForm={handleShowEditForm}
            item={selectedProduct}
          />}>🛒Ver mi pedido</Button>
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
                      <p>Producto: {selectedProduct.name}</p>
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
                      <p>Sin TACC{item.sinTACC ? "✅" : ""}</p>
                      <p>Cantidad: {item.cantidad}</p>
                      <p>Aclaraciones: {item.aclaraciones}</p>
                      <Button onClick={handleShowEditform}>Editar pedido</Button>
                      <Modal> 
                        <Modal.Body>
                        <label>
                          Cantidad:
                          <input
                            type="number"
                            value={quantity}
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
                            </Modal>
                      <EditOrderForm
                        show={showEditForm}
                        onEditCart={handleEditCart}
                        onCloseForm={handleShowEditform}
                        item={selectedProduct}
                      />
                    </div>
                  ))
                )}
              </Modal.Body>
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