import React, { useEffect } from "react";
import { Col, Container, Form, Row, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const LoginV1 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  const showPassword = () => {
    const pass = document.getElementById("password");
    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={6}>
          {signinErrors.map((error, i) => (
            <Alert key={i} variant="danger">
              {error}
            </Alert>
          ))}
          <h3>Login</h3>
          <Form onSubmit={onSubmit}>
            <Form.Group className="" controlId="formBasicEmail">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                {...register("email", { 
                  required: {
                    value: true, 
                    message: "El email es requerido"
                  } }
                  )}
              />
              {errors.email && (
                <span className="text-danger fw-bold">
                  {errors.email.message}
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label></Form.Label>
              <Form.Control
                type="password"
                id="password"
                placeholder="Contraseña"
                {...register("password", { 
                  required:{
                    value: true,
                    message: "La contraseña es requerida"
                  }  }
                  )}
              />
              {errors.password && (
                <span className="text-danger fw-bold">
                  {errors.password.message}
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                onClick={showPassword}
                type="checkbox"
                label="Mostrar contraseña"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Iniciar sesión
            </Button>
          </Form>
          <p className="mt-2 d-flex justify-content-between">
            Todavia no tienes cuenta?
            <Link to="/register" className="text-decoration-none">
              Registrate
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginV1;
