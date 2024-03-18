import React, { useEffect, useState } from 'react';
import { Form, Modal, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { nameMenu, imageMenu, priceMenu, cantidadMenu, descriptionRegex } from "../../validation/adminPanelValidations";
import { useProductAuth } from "../../context/ProductContext";
import { alertCustom } from '../../utils/alertCustom/alertCustom';
import { useAuth } from '../../context/UserContext';


const Menu = ({ show, handleCloseModal }) => {
  const { signin } = useProductAuth();
  const {getAllProduct} = useAuth();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const onSubmit = async (formData) => {
    try {
      await signin(formData);
      handleCloseModal();
      setValue("name", "");
      setValue("description", "");
      setValue("category", "");
      setValue("image", "");
      setValue("visible", "");
      setValue("price", "");
      setValue("cantidad", "");

    alertCustom('Éxito', 'Producto creado exitosamente', 'success');
    } catch (error) {
      alertCustom('Upps', 'Ha ocurrido un error al crear el producto', 'error');
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
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              autoFocus
              {...register("name", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: nameMenu,
                  message: "Nombre inválido. Debe ingresar un nombre alfabetico entre 3 y 100 caracteres."
                }
              })}
            />
            {errors.name && (
              <Alert variant="danger">
                {errors.name.message}
              </Alert>
            )}
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
            {errors.description && (
              <Alert variant="danger">
                {errors.description.message}
              </Alert>
            )}
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
            {errors.category && (
              <Alert variant="danger">
                {errors.category.message}
              </Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagen URL</Form.Label>
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
            {errors.image && (
              <Alert variant="danger">
                {errors.image.message}
              </Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Precio"
              {...register("price", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: priceMenu,
                  message: "Precio inválido. Debe ser un número válido entre 1 y 100,000,000."
                }
              })}
            />
            {errors.price && (
              <Alert variant="danger">
                {errors.price.message}
              </Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Cantidad disponible"
              {...register("cantidad", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: cantidadMenu,
                  message: "Cantidad inválida. Debe ser un número válido entre 1 y 100,000,000."
                }
              })}
            />
            {errors.cantidad && (
              <Alert variant="danger">
                {errors.cantidad.message}
              </Alert>
            )}
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
