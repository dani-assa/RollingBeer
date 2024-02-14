import React, { useEffect } from "react";
import { Col, Container, Form, Row, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext";

const RegisterUser = () => {
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{6,20}$/;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={6}>
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
                placeholder="Nombre"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <Alert key="danger" variant="danger" size="sm">
                  El nombre es requerido.
                </Alert>
              )}
            </Form.Group>
            <Form.Group className="" controlId="formBasicLastName">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellido"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <Alert key="danger" variant="danger" size="sm">
                  El apellido es requerido.
                </Alert>
              )}
            </Form.Group>
            <Form.Group className="" controlId="formBasicEmail">
              <Form.Label></Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <Alert key="danger" variant="danger" size="sm">
                  El email es requerido.
                </Alert>
              )}
            </Form.Group>
            <Form.Group className="" controlId="formBasicDni">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="DNI (sin puntos)"
                {...register("dni", { required: true })}
              />
              {errors.dni && (
                <Alert key="danger" variant="danger" size="sm">
                  El DNI es requerido.
                </Alert>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label></Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                {...register(
                  "password",
                  { required: true },
                  { pattern: passRegex }
                )}
              />
              {errors.password && (
                <Alert key="danger" variant="danger" size="sm">
                  La contraseña es requerida.
                </Alert>
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
      </Row>
    </Container>
  );
};

export default RegisterUser;
