import React, {useState, useEffect} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from '../../api/axios';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { alertCustom } from '../../utils/alertCustom/alertCustom';


const EditProductModal = ({product, setIsLoading, setChangeFlag}) => {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(product);
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    category: '',
    image: '',
    price: '',
    cantidad: ''
  });
  

  const handleEdit = () => {
    setShowModalEdit(true);
  };

  const handleEditClose = () => {
    setShowModalEdit(false);
  };

  const handleSaveEdit = async () => {
    try {
      if (
        errors.name ||
        errors.description ||
        errors.category ||
        errors.image ||
        errors.price ||
        errors.cantidad
      ) {
        return;
      }
      setIsLoading(true);
      await axios.patch(`/product/edit/${selectedProduct._id}`, selectedProduct);
      setChangeFlag(prev => !prev);
    } catch (error) {
      alertCustom('Upps', 'Ha ocurrido un error al editar el producto.', 'error');
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
      <Button variant='success' size='sm' className='mx-1 mb-1' onClick={() => handleEdit(product)}><ModeEditIcon fontSize='small'/></Button>
      <Modal show={showModalEdit} onHide={handleEditClose} backdrop="static" keyboard={true}>
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
                const newName = e.target.value;
                const namePattern = /^[a-zA-Z\s]{3,100}$/;
                
                if (!namePattern.test(newName)) {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    name: "Nombre inválido. Debe ingresar un nombre alfabético entre 3 y 100 caracteres."
                  }));
                } else {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    name: ''
                  }));
                }
                setSelectedProduct(prevProduct => ({
                  ...prevProduct,
                  name: newName
                }));
              }}
            />
              {errors.name && (
                <span style={{ color: 'red' }}>{errors.name}</span>
              )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              value={selectedProduct ? selectedProduct.description : ''}
              onChange={(e) => {
                const newDescription = e.target.value;
                const descriptionPattern = /^[a-zA-Z0-9.,!?() -]{3,}$/;
                
                if (!descriptionPattern.test(newDescription)) {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    description: "Descripción inválida. Debe contener solo letras, números y algunos caracteres especiales como . , ! ? - ()"
                  }));
                } else {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    description: ''
                  }));
                }
                setSelectedProduct(prevProduct => ({
                  ...prevProduct,
                  description: newDescription
                }));
              }}
            />
              {errors.description && (
                <span style={{ color: 'red' }}>{errors.description}</span>
              )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select 
              value={selectedProduct ? selectedProduct.category : ''}
              onChange={(e) => {
                const newCategory = e.target.value;
                if (!newCategory) {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    category: "Selecciona una categoría"
                  }));
                } else {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    category: ''
                  }));
                }
                setSelectedProduct(prevProduct => ({
                  ...prevProduct,
                  category: newCategory
                }));
              }}
            >
              <option value="">Selecciona una categoría</option>
              <option value="Hamburguesa">Hamburguesa</option>
              <option value="Sandwich">Papas Fritas</option>
              <option value="Para Picar">Para Picar</option>
              <option value="Wrap">Wrap</option>
              <option value="Bebidas">Bebidas</option>
            </Form.Select>
              {errors.category && (
                <span style={{ color: 'red' }}>{errors.category}</span>
              )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL de la imagen"
              value={selectedProduct ? selectedProduct.image : ''}
              onChange={(e) => {
                const newImage = e.target.value;
                const imagePattern = /\.(png|jpg|jpeg|gif|bmp)$/i;
                
                if (!imagePattern.test(newImage)) {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    image: "URL de imagen inválida. Debe ser una URL válida que termine en .png, .jpg, .jpeg, .gif o .bmp."
                  }));
                } else {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    image: ''
                  }));
                }
                setSelectedProduct(prevProduct => ({
                  ...prevProduct,
                  image: newImage
                }));
              }}
            />
            {errors.image && (
              <span style={{ color: 'red' }}>{errors.image}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              value={selectedProduct ? selectedProduct.price : ''}
              onChange={(e) => {
                const newPrice = e.target.value;
                if (isNaN(newPrice) || newPrice < 1 || newPrice > 100000000) {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    price: "Precio inválido. Debe ser un número válido entre 1 y 100,000,000."
                  }));
                } else {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    price: ''
                  }));
                }
                setSelectedProduct(prevProduct => ({
                  ...prevProduct,
                  price: newPrice
                }));
              }}
            />
              {errors.price && (
                <span style={{ color: 'red' }}>{errors.price}</span>
              )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Cantidad disponible"
              value={selectedProduct ? selectedProduct.cantidad : ''}
              onChange={(e) => {
                const newCantidad = e.target.value;
                if (isNaN(newCantidad) || newCantidad < 1 || newCantidad > 100000000) {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    cantidad: "Cantidad inválida. Debe ser un número válido entre 1 y 100,000,000."
                  }));
                } else {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    cantidad: ''
                  }));
                }
                setSelectedProduct(prevProduct => ({
                  ...prevProduct,
                  cantidad: newCantidad
                }));
              }}
            />
              {errors.cantidad && (
                <span style={{ color: 'red' }}>{errors.cantidad}</span>
              )}
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

export default EditProductModal;