import React, { useState} from 'react';
import { Button, Col, Container, Modal, Row, Offcanvas } from 'react-bootstrap';
import '../listadoDeProductos/listado.css';
import axios from 'axios';
import CardV1 from '../Section/CardV1';
import CardV2 from './CardV2';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
const URL_BASE = import.meta.env.VITE_URL_BASE;

const ListadoDeProdV1 = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [cartItems, setCartItems] = useState([]);
  const [quitar, setQuitar] = useState({ cheddar: false, bacon: false });
  const [products, setProducts] = useState([]);
  const [tableNumber, setTableNumber] = useState(null);
  const [selectedProductInfo, setSelectedProductInfo] = useState(null);
  const [smShow, setSmShow] = useState(false);

  {/*useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${URL_BASE}/product/getAll`);
        setProducts(response.data);
      } catch (error) {
        console.error('Hubo un error al cargar los productos:', error);
      }
    };

    fetchProducts();
  }, []);*/}


  const handleAddCard = (burgerOptions) => {
    const { tipo, sinTacc, ...rest } = burgerOptions;
    const tipoString = Array.isArray(tipo) ? tipo.join(', ') : tipo;
    const sinTaccString = sinTacc ? "Sin TACC" : "";
    const totalCantidad = burgerOptions.cantidad;
    setCartItems([...cartItems, { ...rest, tipo: tipoString, sinTACC: sinTaccString, totalCantidad }]);
  }
console.log(cartItems);
  const handleQuitarChange = (item) => {
    setQuitar((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const handleDeleteItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  return (
    <Container fluid>
      <Row>
        <h1 className='text-center pt-4'>¡Descubre Nuestro Delicioso Menú!</h1>
        <Button id='boton1' onClick={handleShow} > <ShoppingBagIcon/> </Button>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton className='modal1'>
            <Modal.Title>Tu pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal1'>
            <h5 className='text-end m-2'>Mesa {tableNumber}</h5>
            {cartItems.length === 0 ? (
              <p className='text-center'>No se ha realizado ningún pedido</p>
            ) : (
              cartItems.map((item, index, product) => (
                <div key={index}>
                  <h5 className='text-center'>Producto: {product.name}</h5>
                  {Object.keys(item.tipo).length > 0 ? (
                    <>
                      <p>Opción: {Object.keys(item.tipo).find(key => item.tipo[key]) || 'Ninguna'}</p>
                    </>
                  ) : (
                    <span>No seleccionó ninguna opción</span>
                  )}


                  {Object.keys(item.extras).length > 0 && Object.values(item.extras).some(count => count > 0) && (
                    <>
                      <p>Extras:</p>
                      <ul>
                        {Object.keys(item.extras).map((extra, index) => (
                          item.extras[extra] > 0 && (
                            <li key={index}>{extra}: {item.extras[extra]}</li>
                          )
                        ))}
                      </ul>
                      <p>Total de extras: {Object.values(item.extras).reduce((total, count) => total + count, 0)}</p>
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
                  <Button className='boton2' onClick={() => handleDeleteItem(index)}>Eliminar</Button>
                </div>
              ))
            )}
            {selectedProductInfo && (
              <div>
                <h5 className='text-center'>Producto: {selectedProductInfo.name}</h5>
                <p>Precio: ${selectedProductInfo.price}</p>
              </div>
            )}
          </Modal.Body>
          {/*<h6>Total de productos seleccionados: </h6>*/}
          <Modal.Footer className='modal1'>
            {cartItems.length > 0 && (<Button variant="text-ligth" className='boton3' onClick={setSmShow}> Confirmar pedido </Button>)}
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
        <>
        <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Detalle del pedido
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='text-start'>Hamburguesa {}</p>
        </Modal.Body>
      </Modal>
        </>
        <Col>
          <h2 className='pt-4 text-center'>Productos destacados</h2>
          <CardV1
            onAddCard={handleAddCard}
            quitar={quitar}
            setQuitar={handleQuitarChange}
            onCloseModal={handleClose}
            setSelectedProductInfo={setSelectedProductInfo}
          />
        </Col>
        <div>
          <h2 className='pt-4 text-center'>Productos</h2>
          <CardV2 onAddCard={handleAddCard}
            quitar={quitar}
            setQuitar={handleQuitarChange}
            onCloseModal={handleClose}
            setSelectedProductInfo={setSelectedProductInfo}
          />
        </div>









      </Row >
    </Container >
  )
}


export default ListadoDeProdV1