import React, { useEffect } from "react";
import { Col, Container, Form, Row, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import {
  passRegex,
  emailRegex,
  nameRegex,
} from "../../validation/registerValidation";
import { imgFondo, formbg } from "./RegisterUser.module.css";

const RegisterUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <Container className="mt-4" id={imgFondo}>
      <Row className="justify-content-center">
        <Col sm={6} className={formbg}>
          {registerErrors.map((error, i) => (
            <Alert key={i} variant="danger">
              {error}
            </Alert>
          ))}
          <h3>Formulario de Registro</h3>
          <Form onSubmit={onSubmit}>
            <Form.Group className="" controlId="formBasicName">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre y Apellido"
                {...register("name", {
                  required: {
                    value: true,
                    message: "El nombre y apellido es requerido",
                  },
                  pattern: {
                    value: nameRegex,
                    message: "El nombre es invalido",
                  },
                  maxLenght: {
                    value: 40,
                    message: 'El nombre no puede tener más de 40 caracteres'
                  }
                })}
              />
              {errors.name && (
                <span className="text-danger">{errors.name.message}</span>
              )}
            </Form.Group>
            <Form.Group className="" controlId="formBasicUserName">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de usuario"
                {...register("userName", {
                  required: {
                    value: true,
                    message: "El nombre de usuario es requerido",
                  },
                })}
              />
              {errors.userName && (
                <span className="text-danger">{errors.userName.message}</span>
              )}
            </Form.Group>
            <Form.Group className="" controlId="formBasicEmail">
              <Form.Label></Form.Label>
              <Form.Control
                type="email"
                placeholder="Correo"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El correo es requerido",
                  },
                  pattern: {
                    value: emailRegex,
                    message: "El correo no es valido",
                  },
                })}
              />
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </Form.Group>
            <Form.Group className="" controlId="formBasicDni">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="DNI (sin puntos)"
                {...register("dni", {
                  required: {
                    value: true,
                    message: "El DNI es requerido",
                  },
                  // pattern: {
                  //   value: emailRegex,
                  //   message: "El correo no es valido",
                  // },
                })}
              />
              {errors.dni && (
                <span className="text-danger">{errors.dni.message}</span>
              )}
            </Form.Group>
            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label></Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                  pattern: {
                    value: passRegex,
                    message:
                      "La contraseña debe tener por lo menos una letra mayuscula, una minúscula, un caracter especial (ej:! - $). Debe tener una longitud entre 6 y 20 caracteres",
                  },
                })}
              />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordCheck">
              <Form.Label></Form.Label>
              <Form.Control
                type="password"
                placeholder="Repite la Contraseña"
                {...register("passwordCheck", {
                  required: {
                    value: true,
                    message: "Debe repetir la contraseña",
                  },
                })}
              />
              {errors.passwordCheck && (
                <span className="text-danger">
                  {errors.passwordCheck.message}
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Acepto los términos y codiciones"
                {...register("checkbox", {
                  required: {
                    value: true,
                    message: "Debe aceptar los términos y condiciones",
                  },
                })}
              />
              {errors.checkbox && (
                <span className="text-danger">{errors.checkbox.message}</span>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Registrarse
            </Button>
          </Form>
          <p className="mt-2 d-flex justify-content-between">
            Ya tienes una cuenta?
            <Link to="/login" className="text-decoration-none">
              Iniciar sesión
            </Link>
          </p>
        </Col>
        {/* <Col>
          <img
            className={img}
            src="https://cdn.pixabay.com/photo/2017/04/07/01/01/bar-2209813_1280.jpg"
            alt=""
          />
        </Col> */}
      </Row>
    </Container>
  );
};

export default RegisterUser;
