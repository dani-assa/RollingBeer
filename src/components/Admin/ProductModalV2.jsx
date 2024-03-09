import React, {useState, useEffect} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { alertCustom } from '../../utils/alertCustom/alertCustom';


const URL_BASE = import.meta.env.VITE_URL_BASE;

const ModalEditUser = ({product, setIsLoading, setChangeFlag}) => {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(product);


  const handleEdit = () => {
    setShowModalEdit(true);
  };

  const handleEditClose = () => {
    setShowModalEdit(false);
  };

  const handleSaveEdit = async() => {
    try {
      setIsLoading(true);
      await axios.patch(`${URL_BASE}/product/edit/${selectedProduct._id}`, selectedProduct);
      setChangeFlag(prev => !prev);
    } catch (error) {
      alertCustom('Upps', 'Ha ocurrido un error al editar el producto', 'error');
    } finally {
      handleEditClose();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSelectedProduct(product);
  }, [product]);

  return (
    <>
      <Button variant='success' size='sm' className='mx-2' onClick={() => handleEdit(product)}><ModeEditIcon fontSize='small'/></Button>
      <Modal show={showModalEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={selectedProduct ? selectedProduct.name : ''}
                onChange={(e) => {
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value
                  })
                }}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="text"
                value={selectedProduct ? selectedProduct.description : ''}
                onChange={(e) => {
                  setSelectedProduct({
                    ...selectedProduct,
                    description: e.target.value
                  })
                }}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select 
                value={selectedProduct ? selectedProduct.category : ''}
                  onChange={(e) => {
                    setSelectedProduct({
                      ...selectedProduct,
                      category: e.target.value
                    })
                  }}>
                <option value="">Selecciona una categoría</option>
                <option value="Hamburguesa">Hamburguesa</option>
                <option value="Sandwich">Papas Fritas</option>
                <option value="Para Picar">Para Picar</option>
                <option value="Wrap">Wrap</option>
                <option value="Bebidas">Bebidas</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Imagen URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="URL de la imagen"
                value={selectedProduct ? selectedProduct.image : ''}
                  onChange={(e) => {
                    setSelectedProduct({
                      ...selectedProduct,
                      image: e.target.value
                    })
                  }}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="email"
                value={selectedProduct ? selectedProduct.price : ''}
                onChange={(e) => {
                  setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value
                  })
                }}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Cantidad disponible"
                value={selectedProduct ? selectedProduct.cantidad : ''}
                  onChange={(e) => {
                    setSelectedProduct({
                      ...selectedProduct,
                      cantidad: e.target.value
                    })
                  }}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleEditClose}>
            Cerrar
          </Button>
          <Button variant='primary' onClick={handleSaveEdit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalEditUser