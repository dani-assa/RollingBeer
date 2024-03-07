import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';

const URL_BASE = import.meta.env.VITE_URL_BASE;

const ProductModalEdit = ({ show, handleCloseModal, product, setChangeFlag}) => {

  const [errorsMessage, setErrorsMessage] = useState(null);
  const [editableFields, setEditableFields] = useState({}); 
  const [fieldValues, setFieldValues] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category || '',
    image: product?.image || '',
    visible: product?.visible || '',
    price: product?.price || '',
    cantidad: product?.cantidad || ''
  });
  
  const [isFavorite, setIsFavorite] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  

  const onSubmit = async (product) => {
    try {
      if (!product || !product.id) {
        throw new Error("ID del producto no definido");
      }
      await axios.patch(`${URL_BASE}/product/edit/${product.id}`,editableFields );
      console.log('Datos del formulario 0:');
      handleCloseModal();
      setEditableFields({});
    } catch (error) {
      if (error.response) {
        console.log('Datos del formulario 1:', product);
        setErrorsMessage(error.response.data);
      } else {
        console.log('Datos del formulario 2:', product);
        console.log(product.id);
        console.error('Error:', error.message);
      }
    }
  };  
  
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  React.useEffect(() => {
    if (product) {
      setFieldValues({
        name: product.name || '',
        description: product.description || '',
        category: product.category || '',
        image: product.image || '',
        visible: product.visible || '',
        price: product.price || '',
        cantidad: product.cantidad || ''
      });
      setEditableFields({}); 
    }
  }, [product, setValue]);

  const handleEdit = (fieldName) => {
    setEditableFields({ ...editableFields, [fieldName]: true });
  };  

  const handleChange = (e, fieldName) => {
    setFieldValues({ ...fieldValues, [fieldName]: e.target.value });
  };
  
  const handleDelete = () => {
    console.log('Producto eliminado');
  };
  
  const handleCancelEdit = () => {
    setEditableFields({});
  };
  
  
  return (
    <Modal show={show} onHide={handleCloseModal} backdrop="static" keyboard={true}>
      <Modal.Header closeButton >
        <Modal.Title>Producto</Modal.Title>
        <div>
          {isFavorite ? (
            <FavoriteIcon onClick={handleToggleFavorite} style={{ cursor: 'pointer', color: 'red' }} />
          ) : (
            <FavoriteBorderIcon onClick={handleToggleFavorite} style={{ cursor: 'pointer' }} />
          )}
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={fieldValues.name}
                onChange={(e) => handleChange(e, 'name')}
              />
            </div>
            {errors.name && <span className="text-danger">{errors.name.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Descripción"
                value={fieldValues.description}
                onChange={(e) => handleChange(e, 'description')}
              />
              </div>
            {errors.description && <span className="text-danger">{errors.description.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Select
                {...register("category", { required: editableFields.category ? "Selecciona una categoría" : false })}
                value={fieldValues.category}
                onChange={(e) => handleChange(e, 'category')}
              >
                <option value="">Selecciona una categoría</option>
                <option value="Hamburguesa">Hamburguesa</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Para Picar">Para Picar</option>
                <option value="Wrap">Wrap</option>
                <option value="Bebidas">Bebidas</option>
              </Form.Select>
            </div>
            {errors.category && <span className="text-danger">{errors.category.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>URL de la imagen</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="text"
                placeholder="URL de la imagen"
                value={fieldValues.image}
                onChange={(e) => handleChange(e, 'image')}
              />
            </div>
            {errors.image && <span className="text-danger">{errors.image.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Select
                {...register("visible", { required: editableFields.visible ? "Selecciona un estado" : false })}
                value={fieldValues.visible}
                onChange={(e) => handleChange(e, 'visible')}
              >
                <option value="">Selecciona un estado</option>
                <option value="Disponible">Disponible</option>
                <option value="No-Disponible">No disponible</option>
              </Form.Select>
            </div>
            {errors.visible && <span className="text-danger">{errors.visible.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="text"
                placeholder="Precio"
                value={fieldValues.price}
                onChange={(e) => handleChange(e, 'price')}
              />
            </div>
            {errors.price && <span className="text-danger">{errors.price.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cantidad disponible</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="text"
                placeholder="Cantidad disponible"
                value={fieldValues.cantidad}
                onChange={(e) => handleChange(e, 'cantidad')}
              />
            </div>
            {errors.cantidad && <span className="text-danger">{errors.cantidad.message}</span>}
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModalEdit;




