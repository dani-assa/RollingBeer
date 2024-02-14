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
                placeholder="Nombre y Apellido"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-danger">El nombre y apellido es requerido</p>
                // <Alert key="danger" variant="danger" size="sm">
                //   El nombre y apellido es requerido.
                // </Alert>
              )}
            </Form.Group>
            <Form.Group className="" controlId="formBasicUserName">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de usuario"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <p className="text-danger">El nombre de usuario es requerido</p>
                // <Alert key="danger" variant="danger" size="sm">
                //   El nombre de usuario es requerido.
                // </Alert>
              )}
            </Form.Group>
            <Form.Group className="" controlId="formBasicEmail">
              <Form.Label></Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                {...register(
                  "email",
                  { required: true },
                  { pattern: emailRegex }
                )}
              />
              {errors.email && (
                <p className="text-danger">El email es requerido</p>

                // <Alert key="danger" variant="danger" size="sm">
                //   El email es requerido.
                // </Alert>
              )}
            </Form.Group>

            <Form.Group className="" controlId="formBasicPassword">
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
                <p className="text-danger">La contraseña es requerida</p>
                // <Alert key="danger" variant="danger" size="sm">
                //   La contraseña es requerida.
                // </Alert>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordCheck">
              <Form.Label></Form.Label>
              <Form.Control
                type="password"
                placeholder="Repite la Contraseña"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-danger">La contraseña es requerida</p>
                // <Alert key="danger" variant="danger" size="sm">
                //   La contraseña es requerida.
                // </Alert>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Acepto los términos y codiciones"
                {...register("checkbox", { required: true })}
              />
              {errors.checkbox && (
                <p className="text-danger">Debe aceptar los terminos y condiciones</p>
                // <Alert key="danger" variant="danger" size="sm">
                //   Debe acetar los términos y condiciones.
                // </Alert>
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
