import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { passUser, emailUser, nameUser } from "../../validation/adminPanelValidations";

const Users = ({show, handleCloseModal }) => {
  const { register, handleSubmit, formState: { errors, isDirty }, watch, setValue} = useForm();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const onSubmit = (value) => {
    console.log(value);
    handleCloseModal();
    setValue("name", "");
    setValue("username", "");
    setValue("dni", "");
    setValue("email", "");
    setValue("password", "");
    setValue("confirmPassword", "");
  };

  return (
    <>
      <Modal show={show} onHide={handleCloseModal} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Gestionar Usuarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Control
                id="name"
                type="text"
                placeholder="Nombre y Apellido"
                autoFocus
                {...register("name", { 
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: nameUser,
                    message: "Nombre y Apellido inválido"
                  }
                })}
              />
              {errors.name && <span className="text-danger">{errors.name.message}</span>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                id="username"
                type="text"
                placeholder="Usuario"
                {...register("username", { 
                  required: "Este campo es obligatorio"
                })}
              />
              {errors.username && <span className="text-danger">{errors.username.message}</span>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                id="dni"
                type="text"
                placeholder="DNI (sin puntos)"
                {...register("dni", { 
                  required: "Este campo es obligatorio"
                })}
              />
              {errors.dni && <span className="text-danger">{errors.dni.message}</span>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                id="email"
                type="email"
                placeholder="Correo Electrónico"
                {...register("email", { 
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: emailUser,
                    message: "Correo Electrónico inválido"
                  }
                })}
              />
              {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                id="password"
                type="password"
                placeholder="Contraseña"
                {...register("password", { 
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: passUser,
                    message: "La contraseña debe tener entre 6 y 20 caracteres y al menos una mayúscula, una minúscula, un número y un carácter especial"
                  }
                })}
              />
              {errors.password && <span className="text-danger">{errors.password.message}</span>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                id="confirmPassword"
                type="password"
                placeholder="Repite la contraseña"
                {...register("confirmPassword", { 
                  required: "Este campo es obligatorio",
                  validate: (value) => value === password || "Las contraseñas no coinciden"
                })}
              />
              {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
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
    </>
  );
}

export default Users;
