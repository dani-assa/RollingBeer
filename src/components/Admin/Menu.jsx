import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { nameMenu, imageMenu, priceMenu, cantidadMenu, descriptionRegex } from "../../validation/adminPanelValidations";
import { useProductAuth } from "../../context/ProductContext";

const Menu = ({ show, handleCloseModal }) => {
  const { signin, errors } = useProductAuth();
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (formData) => {
    try {
      await signin(formData); // Envía los datos del formulario para crear un producto
      handleCloseModal();
      // Limpia los valores del formulario después de enviar la solicitud
      setValue("name", "");
      setValue("description", "");
      setValue("category", "");
      setValue("image", "");
      setValue("visible", "");
      setValue("price", "");
      setValue("cantidad", "");
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleCloseModal} backdrop="static" keyboard={true}>
      <Modal.Header closeButton>
        <Modal.Title>Gestionar Menú</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nombre"
              autoFocus
              {...register("name", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: nameMenu,
                  message: "Nombre inválido. Debe tener entre 3 y 100 caracteres."
                }
              })}
            />
            {errors.name && <span className="text-danger">{errors.name.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingresa una descripción breve"
              maxLength={100}
              {...register("description", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: descriptionRegex,
                  message: "Descripción inválida. Debe contener solo letras, números y algunos caracteres especiales como . , ! ? - ()",
                }
              })}
            />
            {errors.description && <span className="text-danger">{errors.description.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select {...register("category", { required: "Selecciona una categoría" })}>
              <option value="">Selecciona una categoría</option>
              <option value="Hamburguesa">Hamburguesa</option>
              <option value="Sandwich">Papas Fritas</option>
              <option value="Para Picar">Para Picar</option>
              <option value="Wrap">Wrap</option>
              <option value="Bebidas">Bebidas</option>
            </Form.Select>
            {errors.category && <span className="text-danger">{errors.category.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="URL de la imagen"
              {...register("image", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: imageMenu,
                  message: "URL de imagen inválida. Debe ser una URL válida que termine en .png, .jpg, .jpeg, .gif o .bmp."
                }
              })}
            />
            {errors.image && <span className="text-danger">{errors.image.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select {...register("visible", { required: "Selecciona un estado" })}>
              <option value="">Selecciona un estado</option>
              <option value="Disponible">Disponible</option>
              <option value="No-Disponible">No disponible</option>
            </Form.Select>
            {errors.visible && <span className="text-danger">{errors.visible.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Precio"
              {...register("price", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: priceMenu,
                  message: "Precio inválido. Debe ser un número válido entre 0.01 y 100,000,000."
                }
              })}
            />
            {errors.price && <span className="text-danger">{errors.price.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Cantidad disponible"
              {...register("cantidad", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: cantidadMenu,
                  message: "Cantidad inválida. Debe ser un número válido entre 1 y 1,000,000,000."
                }
              })}
            />
            {errors.cantidad && <span className="text-danger">{errors.cantidad.message}</span>}
          </Form.Group>
          <div className="d-flex justify-content-between">
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

export default Menu;
