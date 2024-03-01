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
//import { formbg, btnRegister } from "./RegisterUser.module.css";
//import { replace } from "formik";

const RegisterUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
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
    <Container>
      <Row className="formRegister">
        <Col sm={6} className="imgFondo rounded">
          {registerErrors.map((error, i) => (
            <Alert key={i} variant="danger">
              {error}
            </Alert>
          ))}
          <h3 className="text-white mt-3 pt-3">Formulario de Registro</h3>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label htmlFor="name"></Form.Label>
              <Form.Control
                type="text"
                id="name"
                placeholder="Nombre y Apellido"
                className={errors.name?.message ? "is-invalid" : ""}
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
                    message: "El nombre no puede tener más de 40 caracteres",
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="userName"></Form.Label>
              <Form.Control
                id="userName"
                type="text"
                placeholder="Nombre de usuario"
                className={errors.userName?.message ? "is-invalid" : ""}
                {...register("userName", {
                  required: {
                    value: true,
                    message: "El nombre de usuario es requerido",
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.userName?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="email"></Form.Label>
              <Form.Control
                id="email"
                type="email"
                placeholder="Correo"
                className={errors.email?.message ? "is-invalid" : ""}
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
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
              <Form.Label htmlFor="dni"></Form.Label>
              <Form.Control
                id="dni"
                type="text"
                placeholder="DNI (sin puntos)"
                className={errors.dni?.message ? "is-invalid" : ""}
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
              <Form.Control.Feedback type="invalid">
                {errors.dni?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
              <Form.Label htmlFor="password"></Form.Label>
              <Form.Control
                id="password"
                type="password"
                placeholder="Contraseña"
                className={errors.password?.message ? "is-invalid" : ""}
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
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="passwordCheck"></Form.Label>
              <Form.Control
                id="passwordCheck"
                type="password"
                placeholder="Repite la Contraseña"
                className={errors.passwordCheck?.message ? "is-invalid" : ""}
                {...register("passwordCheck", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                  validate: (value) => {
                    if (value == watch("password")) {
                      return true;
                    }
                    return "Las contraseñas no coinciden";
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.passwordCheck?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                className="text-white mt-3"
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
            <Button variant="primary" type="submit" className="btnRegister mt-3">
              Registrarse
            </Button>
          </Form>
          <p className="mt-2 d-flex justify-content-between text-white mt-5">
            Ya tienes una cuenta?
            <Link to="/login" className="text-decoration-none iniciarSesion">
              Iniciar sesión
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterUser;
