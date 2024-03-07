import React, {useState} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

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
    } finally {
      handleEditClose();
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button variant='success' size='sm' className='mx-2' onClick={() => handleEdit(product)}>Editar</Button>
      <Modal show={showModalEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Apillido</Form.Label>
              <Form.Control
                type="text"
                value={selectedProduct ? selectedProduct.description : ''}
                onChange={(e) => {
                  setSelectedProduct({
                    ...selectedProduct,
                    description: e.target.value
                  })
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>email</Form.Label>
              <Form.Control
                type="email"
                value={selectedProduct ? selectedProduct.price : ''}
                onChange={(e) => {
                  setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value
                  })
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleEditClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalEditUser