import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


const Aboutme = () => {
  const equipo = [
    { nombre: 'Facundo', imagen: 'https://i.postimg.cc/bN6Zxmx5/Whats-App-Image-2024-03-18-at-14-10-41.jpg' },
    { nombre: 'Juan Pablo', imagen: 'https://i.postimg.cc/9zHmTMJC/Whats-App-Image-2024-03-18-at-12-58-54.jpg' },
    { nombre: 'Daniel', imagen: 'https://i.postimg.cc/L8z8LkzZ/dani.jpg' },
    { nombre: 'Nahun', imagen: 'https://i.postimg.cc/xdnTRkRp/nahun.jpg' },
  ];

  return (
    <Container fluid className='mt-2'>
      <h2 className="text-center fs-5">Nuestro Equipo</h2>
      <p className="text-center fs-5">"Juntos hacemos la magia suceder en cada plato."</p>
      <Row className="justify-content-center mt-5">
        {equipo.map((miembro, index) => (
          <Col xs={3} md={4} lg={2} key={index} className="mb-1">
            <div className="text-center">
              <img src={miembro.imagen} alt={miembro.nombre} className="img-fluid rounded-circle" />
              <p>{miembro.nombre}</p>
            </div>
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} className="text-center mt-5">
          <p className="fs-5">
            <b>En una vibrante metrópolis, Juan Pablo, Facundo, Nahún y Dani, cuatro programadores apasionados por la cerveza artesanal, se unieron para transformar la experiencia de disfrutar cervezas únicas de Rolling Beer, un restaurante ambulante. Inspirados por la dificultad de acceder a estas cervezas sin saber dónde se ubicaría el restaurante, decidieron crear una aplicación que permitiera a los clientes pedir su selección de cervezas artesanales desde cualquier lugar dentro del área de servicio. </b>
          </p>
          <p className="fs-5"> <b>Facundo lideró el diseño, inspirándose en el ambiente acogedor de Rolling Beer, mientras Nahún se encargó de esbozar una experiencia de usuario fluida y agradable. Dani y Juan Pablo tomaron las riendas de la programación, con Dani enfocándose en un backend robusto y Juan Pablo desarrollando un frontend reactivo con React. Tras meses de desarrollo, la aplicación se lanzó, revolucionando la forma en que los clientes interactúan con Rolling Beer y demostrando el poder de combinar la pasión por la tecnología y la cerveza.</b></p>
        </Col>
      </Row>
    </Container>

  );
};
export default Aboutme