import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { nameMenu, imageMenu, priceMenu, cantidadMenu, descriptionRegex } from "../../validation/adminPanelValidations";

const Menu = () => {
  const [show, setShow] = useState(false);
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (data) => {
    console.log(data);
    handleClose();
  };

  return (
    <>
      <Button onClick={handleShow}>Menu</Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Gestionar Menú</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formNombre">
              <Form.Control
                type="text"
                placeholder="Nombre"
                autoFocus
                {...register("nombre", {
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: nameMenu,
                    message: "Nombre inválido. Debe tener entre 3 y 100 caracteres."
                  }
                })}
              />
              {errors.nombre && <span className="text-danger">{errors.nombre.message}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingresa una descripción breve"
                maxLength={100}
                {...register("descripcion", { 
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: descriptionRegex,
                    message: "Descripción inválida. Debe contener solo letras, números y algunos caracteres especiales como . , ! ? - ()",
                  }
                })}
              />
              {errors.descripcion && <span className="text-danger">{errors.descripcion.message}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Select {...register("categoria", { required: "Selecciona una categoría" })} className="form-select">
                <option value="">Selecciona una categoría</option>
                <option value="hamburguesa">Hamburguesa</option>
                <option value="papas-fritas">Papas Fritas</option>
                <option value="bebida">Bebida</option>
              </Form.Select>
              {errors.categoria && <span className="text-danger">{errors.categoria.message}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImagen">
              <Form.Control
                type="text"
                placeholder="URL de la imagen"
                {...register("imagen", {
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: imageMenu,
                    message: "URL de imagen inválida. Debe ser una URL válida que termine en .png, .jpg, .jpeg, .gif o .bmp."
                  }
                })}
              />
              {errors.imagen && <span className="text-danger">{errors.imagen.message}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Select {...register("estado", { required: "Selecciona un estado" })} className="form-select">
                <option value="">Selecciona un estado</option>
                <option value="disponible">Disponible</option>
                <option value="no-disponible">No disponible</option>
              </Form.Select>
              {errors.estado && <span className="text-danger">{errors.estado.message}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPrecio">
              <Form.Control
                type="text"
                placeholder="Precio"
                {...register("precio", {
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: priceMenu,
                    message: "Precio inválido. Debe ser un número válido entre 0.01 y 100,000,000."
                  }
                })}
              />
              {errors.precio && <span className="text-danger">{errors.precio.message}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCantidad">
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
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="success" type="submit" onClick={handleSubmit(onSubmit)} className="ml-auto" disabled={!isDirty}>
            Listar Menu
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)} disabled={!isDirty}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Menu;
