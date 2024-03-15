import React, { useContext } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { passRegex, emailRegex, nameRegex } from "../../validation/registerValidation";
import { useAuth } from "../../context/UserContext";
import { alertCustom } from '../../utils/alertCustom/alertCustom';


const UserModal = ({ show, onHide }) => {
  const { signup, errorSignup } = useAuth();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = async (userData) => {
    try {
      await signup(userData);
      onHide(); 
      console.log(userData);
    } catch (error) {
      alertCustom('Upps', 'Ha ocurrido un error al registrar el usuario', 'error');
    }
  };


  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Formulario de Registro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Nombre y Apellido</Form.Label>
            <Form.Control
              type="text"
              id="name"
              placeholder="Nombre y Apellido"
              {...register("name", {
                required: "El nombre y apellido es requerido",
                pattern: {
                  value: nameRegex,
                  message: "El nombre es inválido",
                },
                maxLength: {
                  value: 40,
                  message: "El nombre no puede tener más de 40 caracteres",
                },
              })}
            />
            {errors.name && <span className="text-danger">{errors.name.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="userName">Nombre de Usuario</Form.Label>
            <Form.Control
              id="userName"
              type="text"
              placeholder="Nombre de Usuario"
              {...register("userName", {
                required: "El nombre de usuario es requerido",
              })}
            />
            {errors.userName && <span className="text-danger">{errors.userName.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Correo Electrónico</Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="Correo Electrónico"
              {...register("email", {
                required: "El correo es requerido",
                pattern: {
                  value: emailRegex,
                  message: "El correo no es válido",
                },
              })}
            />
            {errors.email && <span className="text-danger">{errors.email.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="dni">DNI (sin puntos)</Form.Label>
            <Form.Control
              id="dni"
              type="text"
              placeholder="DNI"
              {...register("dni", {
                required: "El DNI es requerido",
              })}
            />
            {errors.dni && <span className="text-danger">{errors.dni.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Contraseña</Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Contraseña"
              {...register("password", {
                required: "La contraseña es requerida",
                pattern: {
                  value: passRegex,
                  message: "La contraseña debe contener al menos una letra mayúscula, una minúscula y un carácter especial. Debe tener entre 6 y 20 caracteres.",
                },
              })}
            />
            {errors.password && <span className="text-danger">{errors.password.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="passwordCheck">Repetir Contraseña</Form.Label>
            <Form.Control
              id="passwordCheck"
              type="password"
              placeholder="Repetir Contraseña"
              {...register("passwordCheck", {
                required: "La contraseña es requerida",
                validate: (value) => value === watch("password") || "Las contraseñas no coinciden",
              })}
            />
            {errors.passwordCheck && <span className="text-danger">{errors.passwordCheck.message}</span>}
          </Form.Group>
          <Button variant="primary" type="submit">
            Registrar
          </Button>
          <Button variant='secondary' onClick={onHide}>
          Cerrar
        </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
