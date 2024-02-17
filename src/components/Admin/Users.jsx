import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { passUser, emailUser, nameUser } from "../../validation/adminPanelValidations";

const Users = () => {
  const [show, setShow] = useState(false);
  const { register, handleSubmit, formState: { errors, isDirty }, watch } = useForm();

  const handleClose = () => setShow(false); 
  const handleShow = () => setShow(true); 

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const onSubmit = (data) => {
    console.log(data);
    handleClose(); 
  };

  return (
    <>
      <Button  onClick={handleShow}> Usuarios
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Gestionar Usuarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
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
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Control
                type="text"
                placeholder="Usuario"
                {...register("username", { 
                  required: "Este campo es obligatorio"
                })}
              />
              {errors.username && <span className="text-danger">{errors.username.message}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDNI">
              <Form.Control
                type="text"
                placeholder="DNI (sin puntos)"
                {...register("dni", { 
                  required: "Este campo es obligatorio"
                })}
              />
              {errors.dni && <span className="text-danger">{errors.dni.message}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
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
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control
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
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Control
                type="password"
                placeholder="Repite la contraseña"
                {...register("confirmPassword", { 
                  required: "Este campo es obligatorio",
                  validate: (value) => value === password || "Las contraseñas no coinciden"
                })}
              />
              {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="success" type="submit" onClick={handleSubmit(onSubmit)} className="ml-auto" disabled={!isDirty}>
            Listar Usuarios
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

export default Users;
