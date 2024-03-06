import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


const ProductModalEdit = ({ show, handleCloseModal, product }) => {
  const [editableFields, setEditableFields] = useState({}); 
  const [fieldValues, setFieldValues] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const onSubmit = (data) => {
    console.log('Datos del formulario:', data);
    handleCloseModal();
  };
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  React.useEffect(() => {
    if (product) {
      setFieldValues({
        name: product.name,
        description: product.description,
        category: product.category,
        image: product.image,
        visible: product.visible,
        price: product.price,
        cantidad: product.cantidad
      });
      setEditableFields({}); 
    }
  }, [product]);

  const handleEdit = (fieldName) => {
    setEditableFields({ ...editableFields, [fieldName]: true });
  };

  const handleChange = (e, fieldName) => {
    setFieldValues({ ...fieldValues, [fieldName]: e.target.value });
  };
  const handleDelete = () => {
    
    console.log('Producto eliminado');
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
                readOnly={!editableFields.name}
              />
              {!editableFields.name && <EditIcon onClick={() => handleEdit('name')} style={{ cursor: 'pointer', marginLeft: '5px' }} />}
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
                readOnly={!editableFields.description}
              />
              {!editableFields.description && <EditIcon onClick={() => handleEdit('description')} style={{ cursor: 'pointer', marginLeft: '5px' }} />}
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
                readOnly={!editableFields.category}
              >
                <option value="">Selecciona una categoría</option>
                <option value="Hamburguesa">Hamburguesa</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Para Picar">Para Picar</option>
                <option value="Wrap">Wrap</option>
                <option value="Bebidas">Bebidas</option>
              </Form.Select>
              {!editableFields.category && <EditIcon onClick={() => handleEdit('category')} style={{ cursor: 'pointer', marginLeft: '5px' }} />}
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
                readOnly={!editableFields.image}
              />
              {!editableFields.image && <EditIcon onClick={() => handleEdit('image')} style={{ cursor: 'pointer', marginLeft: '5px' }} />}
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
                readOnly={!editableFields.visible}
              >
                <option value="">Selecciona un estado</option>
                <option value="Disponible">Disponible</option>
                <option value="No-Disponible">No disponible</option>
              </Form.Select>
              {!editableFields.visible && <EditIcon onClick={() => handleEdit('visible')} style={{ cursor: 'pointer', marginLeft: '5px' }} />}
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
                readOnly={!editableFields.price}
              />
              {!editableFields.price && <EditIcon onClick={() => handleEdit('price')} style={{ cursor: 'pointer', marginLeft: '5px' }} />}
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
                readOnly={!editableFields.cantidad}
              />
              {!editableFields.cantidad && <EditIcon onClick={() => handleEdit('cantidad')} style={{ cursor: 'pointer', marginLeft: '5px' }} />}
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
            <Button variant="primary" type="submit" disabled={!Object.values(editableFields).includes(true)}>
              Guardar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModalEdit;


