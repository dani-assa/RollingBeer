import React, { useState } from "react";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/Section.css";

const FormRegisterV1 = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDateTime, setSelectedDateTime] = useState();
  const [numComensales, setNumComensales] = useState(1);
  const [telefono, setTelefono] = useState("");

  const isPastDate = (date) => {
    return new Date(date).getTime() < new Date().getTime();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isPastDate(startDate)) {
      setSelectedDateTime(startDate);
      // Para enviar a la base de datos
      console.log(startDate);
    } else {
      alert("Por favor, elige una fecha y hora futuras.");
    }
  };

  if (numComensales < 1) {
    alert("El número de comensales no puede ser menor que 1.");
    return;
  }

  const formData = {
    fechaHora: startDate,
    numComensales: numComensales,
    telefono: telefono,
  };

  console.log(formData);
  return (
    <Container>
      <Row className="box1">
        <Col
          md={6}
          className="text-center text-md-start p-sm-2 d-none d-lg-block"
        >
          <div className="text-white p-4">
            <div>
              <p>
                <b>Localización</b>
              </p>
              <h2>Te esperamos</h2>
              <p>
                Horario <br />
                <b>De Martes a Domingo, de 8:00h a 23:00h.</b>
                <br />
                <a href="https://www.argentina.gob.ar/interior/feriados-nacionales-2024">
                  Ver calendarios festivos
                </a>
              </p>
            </div>
            <div>
              <p>
                <b>
                  Dirección <br /> Gral. Paz 576, T4000 San Miguel de Tucumán,
                  Tucumán <br /> teléfono <br /> 0381 578-3030 <br /> Email{" "}
                  <br /> academy@rollingcodeschool.com <br /> Redes Sociales{" "}
                  <br />{" "}
                  <a href="https://www.instagram.com/rollingcodeschool/">
                    Instagram
                  </a>{" "}
                </b>
              </p>
            </div>
          </div>
        </Col>
        <Col xs={12} lg={6} className="text-center p-sm-2">
          <div className="text-white p-4 p-sm-2">
            <h1>Haz una reserva</h1>
            <p>
              <b>También puedes reservar por teléfono si lo prefieres.</b>
            </p>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicFecha">
                <Form.Label className="mx-3 text-white">
                  Fecha y Hora
                </Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="form-control"
                  minDate={new Date()}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formNumComensales">
                <Form.Label>Número de Comensales</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese el número de comensales"
                  value={numComensales}
                  onChange={(e) =>
                    setNumComensales(Math.max(1, e.target.value))
                  }
                  min="1"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Ingrese un teléfono de contacto"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  pattern="[0-9]{10}"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Reservar
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FormRegisterV1;
